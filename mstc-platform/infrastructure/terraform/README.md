# Infraestructura — MSTC Platform

Infraestructura como código con Terraform para AWS Free Tier.

## Qué crea

| Recurso | Tipo | Free Tier |
|---|---|---|
| EC2 | t2.micro (1 vCPU, 1GB RAM) | 750 hrs/mes × 12 meses |
| RDS PostgreSQL 16 | db.t3.micro (20GB SSD) | 750 hrs/mes × 12 meses |
| S3 Bucket | Imágenes del blog (público) | 5GB × 12 meses |
| Elastic IP | IP fija para DNS | Gratis mientras esté asociada a EC2 |
| Security Groups | Backend + Database | Gratis |

## Requisitos previos

1. [Terraform CLI](https://developer.hashicorp.com/terraform/install) instalado
2. [AWS CLI](https://aws.amazon.com/cli/) configurado con tus credenciales:
   ```bash
   aws configure
   # AWS Access Key ID: tu_access_key
   # AWS Secret Access Key: tu_secret_key
   # Default region: us-east-1
   ```
3. Par de claves SSH (`~/.ssh/id_rsa.pub` debe existir)

## Uso

```bash
cd mstc-platform/infrastructure/terraform

# 1. Copiar variables y editarlas
cp terraform.tfvars.example terraform.tfvars
# Editar terraform.tfvars con tu password de DB y ruta SSH

# 2. Inicializar Terraform (descarga providers)
terraform init

# 3. Ver qué va a crear (plan)
terraform plan

# 4. Crear toda la infraestructura
terraform apply
# Escribe "yes" cuando pregunte

# 5. Ver los outputs (IP, endpoints, etc.)
terraform output
```

## Después del `terraform apply`

1. **Esperar 2-3 minutos** a que el user_data del EC2 termine de instalar todo
2. **Configurar DNS** en Cloudflare: `A record → api → IP del output`
3. **SSH al servidor** y crear el archivo `.env`:
   ```bash
   ssh ubuntu@<IP_DEL_OUTPUT>
   cat > /opt/mstc/app/.env << EOF
   APP_ENV=prod
   DATABASE_URL=jdbc:postgresql://<RDS_ENDPOINT>/mstc_db
   DATABASE_USERNAME=mstc_user
   DATABASE_PASSWORD=tu_password
   JWT_PRIVATE_KEY_PATH=/opt/mstc/keys/private_key.pem
   JWT_PUBLIC_KEY_PATH=/opt/mstc/keys/public_key.pem
   ENCRYPTION_MASTER_KEY=$(cat /opt/mstc/keys/encryption_key.txt)
   EOF
   ```
4. **Subir JAR** y arrancar:
   ```bash
   # Desde tu PC
   cd mstc-platform/backend
   ./gradlew.bat bootJar -x test
   scp build/libs/*.jar ubuntu@<IP>:/opt/mstc/app/mstc-platform.jar

   # En el servidor
   sudo systemctl start mstc-backend
   curl http://localhost:8080/api/v1/health
   ```
5. **HTTPS** con Let's Encrypt:
   ```bash
   sudo certbot --nginx -d api.fundacionmujeressintechodecristal.org
   ```

## Destruir infraestructura

```bash
terraform destroy
# Escribe "yes" — elimina TODO (EC2, RDS, S3, EIP)
```

## Costos

- **Primeros 12 meses**: $0/mes (Free Tier)
- **Después de 12 meses**: ~$21/mes (EC2 $8.50 + RDS $12.50)
