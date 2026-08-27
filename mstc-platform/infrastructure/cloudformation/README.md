# Infraestructura MSTC — AWS CloudFormation

Crea toda la infraestructura con un clic desde la consola de AWS.

## Qué crea

| Recurso | Tipo | Free Tier |
|---|---|---|
| EC2 | t2.micro (Ubuntu 22.04, Java 21, Nginx) | 750 hrs/mes × 12 meses |
| RDS PostgreSQL 16 | db.t3.micro (20GB) | 750 hrs/mes × 12 meses |
| S3 Bucket | Imágenes del blog (público) | 5GB × 12 meses |
| Elastic IP | IP fija para DNS | Gratis (asociada al EC2) |
| Security Groups | Backend + Database | Gratis |
| Lambda | Auxiliar para obtener subnets | Gratis (se ejecuta 1 vez) |

## Paso a paso

### 1. Crear Key Pair (si no tienes uno)

- AWS Console → EC2 → Key Pairs → **Create key pair**
- Name: `mstc-key`
- Type: RSA
- Format: `.pem`
- Descarga y guarda el archivo — no se puede recuperar

### 2. Crear el Stack

- AWS Console → **CloudFormation** → **Create stack** → With new resources
- **Template source**: Upload a template file
- Subir: `mstc-stack.yml`
- Clic **Next**

### 3. Llenar parámetros

| Parámetro | Qué poner |
|---|---|
| Stack name | `mstc-platform` |
| ProjectName | `mstc` |
| DBPassword | Un password seguro (mínimo 12 chars) |
| DBUsername | `mstc_user` |
| DBName | `mstc_db` |
| SSHKeyName | `mstc-key` (el que creaste en paso 1) |
| AllowedSSHCidr | Tu IP + `/32` o `0.0.0.0/0` |
| DomainName | `api.fundacionmujeressintechodecristal.org` |

### 4. Opciones del stack

- **Permissions**: marcar "I acknowledge that AWS CloudFormation might create IAM resources with custom names."
- Clic **Next** → **Next** → **Submit**

### 5. Esperar

El stack tarda **5-10 minutos** en completar. Cuando el estado sea `CREATE_COMPLETE`:
- Ve a la pestaña **Outputs**
- Copia `ServerIP`, `DatabaseEndpoint`, etc.

### 6. Después del stack

```bash
# Esperar 3-5 min más (EC2 instala Java, Nginx, genera claves)
# Verificar: SSH al servidor y revisar el log
ssh -i mstc-key.pem ubuntu@<ServerIP>
tail -f /var/log/user-data.log
# Debe terminar con "=== MSTC: Configuracion completada ==="

# Compilar el JAR (desde tu PC o CloudShell)
cd mstc-platform/backend
./gradlew bootJar -x test

# Subir al servidor
scp -i mstc-key.pem build/libs/mstc-platform-1.0.0-SNAPSHOT.jar ubuntu@<ServerIP>:/opt/mstc/app/mstc-platform.jar

# Arrancar
ssh -i mstc-key.pem ubuntu@<ServerIP>
sudo systemctl start mstc-backend
sleep 30
curl http://localhost:8080/api/v1/health

# HTTPS
sudo certbot --nginx -d api.fundacionmujeressintechodecristal.org
```

### 7. DNS (Cloudflare)

| Tipo | Nombre | Contenido |
|---|---|---|
| A | `api` | `<ServerIP del output>` |

### 8. Crear admin en producción

```bash
psql -h <DatabaseEndpoint> -U mstc_user -d mstc_db
# Genera hash en https://bcrypt-generator.com/ (rounds=12)
INSERT INTO admin_user (username, email, password_hash, active, created_at, updated_at)
VALUES ('admin', 'tu@email.real', '$2a$12$HASH', true, NOW(), NOW());
```

## Eliminar todo

AWS Console → CloudFormation → seleccionar `mstc-platform` → **Delete**

Elimina todos los recursos en 5 minutos.
