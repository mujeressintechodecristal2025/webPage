variable "aws_region" {
  description = "Región de AWS"
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Nombre del proyecto (usado en tags y nombres de recursos)"
  type        = string
  default     = "mstc"
}

variable "db_username" {
  description = "Usuario de la base de datos PostgreSQL"
  type        = string
  default     = "mstc_user"
}

variable "db_password" {
  description = "Contraseña de la base de datos PostgreSQL"
  type        = string
  sensitive   = true
}

variable "db_name" {
  description = "Nombre de la base de datos"
  type        = string
  default     = "mstc_db"
}

variable "ssh_public_key_path" {
  description = "Ruta al archivo de clave pública SSH para acceso al EC2"
  type        = string
  default     = "~/.ssh/id_rsa.pub"
}

variable "allowed_ssh_cidr" {
  description = "CIDR permitido para SSH (tu IP pública + /32 para máxima seguridad)"
  type        = string
  default     = "0.0.0.0/0"
}

variable "domain_name" {
  description = "Dominio del backend API (para referencia en outputs)"
  type        = string
  default     = "api.fundacionmujeressintechodecristal.org"
}
