# ══════════════════════════════════════════════════════════════════════════════
# RDS PostgreSQL — Base de datos gestionada
# db.t3.micro (Free Tier: 750 hrs/mes durante 12 meses)
# ══════════════════════════════════════════════════════════════════════════════

# ── Subnet Group (usa las subnets por defecto) ────────────────────────────────

resource "aws_db_subnet_group" "main" {
  name       = "${var.project_name}-db-subnet-group"
  subnet_ids = data.aws_subnets.default.ids

  tags = {
    Name = "${var.project_name}-db-subnet-group"
  }
}

# ── RDS Instance ──────────────────────────────────────────────────────────────

resource "aws_db_instance" "postgres" {
  identifier = "${var.project_name}-db"

  # Motor
  engine         = "postgres"
  engine_version = "16.3"

  # Tamaño (Free Tier)
  instance_class    = "db.t3.micro"
  allocated_storage = 20
  storage_type      = "gp2"

  # Credenciales
  db_name  = var.db_name
  username = var.db_username
  password = var.db_password

  # Red
  db_subnet_group_name   = aws_db_subnet_group.main.name
  vpc_security_group_ids = [aws_security_group.database.id]
  publicly_accessible    = false  # Solo accesible desde EC2

  # Backup y mantenimiento
  backup_retention_period   = 7
  backup_window             = "03:00-04:00"
  maintenance_window        = "Mon:04:00-Mon:05:00"
  auto_minor_version_upgrade = true

  # Performance Insights (gratis en Free Tier)
  performance_insights_enabled = true

  # Protección contra eliminación accidental
  deletion_protection = false  # true en producción real
  skip_final_snapshot = true   # Para Free Tier — en prod poner false

  # Parámetros
  parameter_group_name = aws_db_parameter_group.postgres.name

  tags = {
    Name = "${var.project_name}-database"
  }
}

# ── Parameter Group (configuración PostgreSQL) ────────────────────────────────

resource "aws_db_parameter_group" "postgres" {
  name   = "${var.project_name}-pg16-params"
  family = "postgres16"

  # UTF-8 para soporte completo de español
  parameter {
    name  = "client_encoding"
    value = "UTF8"
  }

  # Timezone Colombia
  parameter {
    name  = "timezone"
    value = "America/Bogota"
  }

  tags = {
    Name = "${var.project_name}-pg16-params"
  }
}
