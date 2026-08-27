# ══════════════════════════════════════════════════════════════════════════════
# Security Groups
# ══════════════════════════════════════════════════════════════════════════════

# ── Security Group del EC2 (backend) ──────────────────────────────────────────

resource "aws_security_group" "backend" {
  name        = "${var.project_name}-backend-sg"
  description = "Permite SSH, HTTP y HTTPS al servidor backend"
  vpc_id      = data.aws_vpc.default.id

  # SSH
  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = [var.allowed_ssh_cidr]
  }

  # HTTP (para redirect a HTTPS y Let's Encrypt)
  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # HTTPS
  ingress {
    description = "HTTPS"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Egress — permitir todo saliente
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.project_name}-backend-sg"
  }
}

# ── Security Group del RDS ────────────────────────────────────────────────────

resource "aws_security_group" "database" {
  name        = "${var.project_name}-database-sg"
  description = "Permite acceso PostgreSQL solo desde el backend EC2"
  vpc_id      = data.aws_vpc.default.id

  # Solo permite tráfico desde el Security Group del backend
  ingress {
    description     = "PostgreSQL desde backend"
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.backend.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.project_name}-database-sg"
  }
}
