# ══════════════════════════════════════════════════════════════════════════════
# Outputs — Información que necesitas después del terraform apply
# ══════════════════════════════════════════════════════════════════════════════

output "ec2_public_ip" {
  description = "IP pública del servidor backend (usar en DNS y GitHub Secrets)"
  value       = aws_eip.backend.public_ip
}

output "ec2_instance_id" {
  description = "ID de la instancia EC2"
  value       = aws_instance.backend.id
}

output "rds_endpoint" {
  description = "Endpoint del RDS PostgreSQL (usar en DATABASE_URL)"
  value       = aws_db_instance.postgres.endpoint
}

output "rds_database_url" {
  description = "JDBC URL completa para el backend"
  value       = "jdbc:postgresql://${aws_db_instance.postgres.endpoint}/${var.db_name}"
}

output "s3_bucket_name" {
  description = "Nombre del bucket S3 para imágenes"
  value       = aws_s3_bucket.images.bucket
}

output "s3_bucket_url" {
  description = "URL base para acceder a las imágenes públicamente"
  value       = "https://${aws_s3_bucket.images.bucket}.s3.${var.aws_region}.amazonaws.com"
}

output "ssh_command" {
  description = "Comando para conectarte al servidor"
  value       = "ssh -i tu_clave_privada.pem ubuntu@${aws_eip.backend.public_ip}"
}

output "next_steps" {
  description = "Pasos pendientes después del terraform apply"
  value       = <<-EOT

    ╔══════════════════════════════════════════════════════════════╗
    ║           INFRAESTRUCTURA CREADA EXITOSAMENTE               ║
    ╠══════════════════════════════════════════════════════════════╣
    ║                                                              ║
    ║  1. Configurar DNS en Cloudflare:                            ║
    ║     A record: api → ${aws_eip.backend.public_ip}                        ║
    ║                                                              ║
    ║  2. SSH al servidor y crear .env:                            ║
    ║     ssh ubuntu@${aws_eip.backend.public_ip}                             ║
    ║                                                              ║
    ║     cat > /opt/mstc/app/.env << 'EOF'                        ║
    ║     APP_ENV=prod                                             ║
    ║     DATABASE_URL=${aws_db_instance.postgres.endpoint}        ║
    ║     DATABASE_USERNAME=${var.db_username}                      ║
    ║     DATABASE_PASSWORD=<tu_password>                           ║
    ║     JWT_PRIVATE_KEY_PATH=/opt/mstc/keys/private_key.pem      ║
    ║     JWT_PUBLIC_KEY_PATH=/opt/mstc/keys/public_key.pem        ║
    ║     ENCRYPTION_MASTER_KEY=$(cat /opt/mstc/keys/encryption_key.txt)  ║
    ║     EOF                                                      ║
    ║                                                              ║
    ║  3. Subir JAR y arrancar:                                    ║
    ║     scp mstc-platform.jar ubuntu@IP:/opt/mstc/app/           ║
    ║     sudo systemctl start mstc-backend                        ║
    ║                                                              ║
    ║  4. Configurar HTTPS:                                        ║
    ║     sudo certbot --nginx -d ${var.domain_name}               ║
    ║                                                              ║
    ║  5. GitHub Secrets:                                           ║
    ║     ORACLE_SSH_HOST = ${aws_eip.backend.public_ip}           ║
    ║     ORACLE_SSH_USER = ubuntu                                 ║
    ║     ORACLE_SSH_KEY  = contenido de tu clave privada          ║
    ║                                                              ║
    ╚══════════════════════════════════════════════════════════════╝
  EOT
}
