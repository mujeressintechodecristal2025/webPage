# ══════════════════════════════════════════════════════════════════════════════
# EC2 Instance — Backend Server
# t2.micro (Free Tier: 750 hrs/mes durante 12 meses)
# ══════════════════════════════════════════════════════════════════════════════

# ── Key Pair para SSH ─────────────────────────────────────────────────────────

resource "aws_key_pair" "backend" {
  key_name   = "${var.project_name}-key"
  public_key = file(var.ssh_public_key_path)

  tags = {
    Name = "${var.project_name}-key"
  }
}

# ── Elastic IP (IP fija para el DNS) ──────────────────────────────────────────

resource "aws_eip" "backend" {
  instance = aws_instance.backend.id
  domain   = "vpc"

  tags = {
    Name = "${var.project_name}-backend-eip"
  }
}

# ── EC2 Instance ──────────────────────────────────────────────────────────────

resource "aws_instance" "backend" {
  ami                    = data.aws_ami.ubuntu.id
  instance_type          = "t2.micro"
  key_name               = aws_key_pair.backend.key_name
  vpc_security_group_ids = [aws_security_group.backend.id]

  # Disco de 20GB (Free Tier incluye hasta 30GB)
  root_block_device {
    volume_size           = 20
    volume_type           = "gp3"
    delete_on_termination = true

    tags = {
      Name = "${var.project_name}-backend-volume"
    }
  }

  # Script de inicialización — instala Java, Nginx, genera claves
  user_data = <<-EOF
    #!/bin/bash
    set -e

    # Logging
    exec > /var/log/user-data.log 2>&1
    echo "=== Iniciando configuración del servidor MSTC ==="

    # Actualizar sistema
    apt-get update -y
    apt-get upgrade -y

    # Instalar Java 21
    apt-get install -y openjdk-21-jre-headless

    # Instalar Nginx
    apt-get install -y nginx certbot python3-certbot-nginx

    # Instalar psql client (para conectar a RDS)
    apt-get install -y postgresql-client

    # Crear directorios de la aplicación
    mkdir -p /opt/mstc/app /opt/mstc/keys /var/log/mstc
    chown -R ubuntu:ubuntu /opt/mstc /var/log/mstc

    # Generar claves JWT RSA-2048
    openssl genrsa -out /opt/mstc/keys/private_key.pem 2048
    openssl rsa -in /opt/mstc/keys/private_key.pem -pubout -out /opt/mstc/keys/public_key.pem
    chown ubuntu:ubuntu /opt/mstc/keys/*.pem
    chmod 600 /opt/mstc/keys/private_key.pem

    # Generar master key para cifrado AES-256
    openssl rand -base64 32 > /opt/mstc/keys/encryption_key.txt
    chown ubuntu:ubuntu /opt/mstc/keys/encryption_key.txt
    chmod 600 /opt/mstc/keys/encryption_key.txt

    # Configurar Nginx como reverse proxy
    cat > /etc/nginx/sites-available/mstc-api << 'NGINX'
    server {
        listen 80;
        server_name ${var.domain_name};

        location / {
            proxy_pass http://localhost:8080;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_read_timeout 60s;
            proxy_connect_timeout 10s;
        }
    }
    NGINX

    ln -sf /etc/nginx/sites-available/mstc-api /etc/nginx/sites-enabled/
    rm -f /etc/nginx/sites-enabled/default
    nginx -t && systemctl reload nginx

    # Crear servicio systemd (sin variables de entorno — se configuran después)
    cat > /etc/systemd/system/mstc-backend.service << 'SYSTEMD'
    [Unit]
    Description=MSTC Platform Backend
    After=network.target

    [Service]
    User=ubuntu
    WorkingDirectory=/opt/mstc/app
    ExecStart=/usr/bin/java -jar -Xmx768m /opt/mstc/app/mstc-platform.jar
    Restart=always
    RestartSec=10
    EnvironmentFile=/opt/mstc/app/.env

    [Install]
    WantedBy=multi-user.target
    SYSTEMD

    systemctl daemon-reload
    systemctl enable mstc-backend

    echo "=== Configuración completada ==="
    echo "Falta: crear /opt/mstc/app/.env con las variables de entorno"
    echo "Falta: subir el JAR a /opt/mstc/app/mstc-platform.jar"
    echo "Falta: ejecutar certbot para HTTPS"
  EOF

  tags = {
    Name = "${var.project_name}-backend"
  }
}
