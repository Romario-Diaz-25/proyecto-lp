variable "region" {
  description = "Region en la que se desplegarán los recursos de AWS"
  default     = "us-east-1"
}

variable "id_cuenta_aws" {
  description = "ID de la cuenta de AWS donde se desplegarán los recursos"
  type        = string
  default     = "151115447934" 
}

variable "rol_lab_arn" {
  description = "ARN del rol del laboratorio en AWS academy"
  type        = string
default     = "arn:aws:iam::151115447934:role/LabRole"
}

variable "url_base_servicio" {
  description = "URL base del servicio al que la función Lambda se conectará"
  type        = string
  default     = "https://api.example.com"
}

variable "nombre_cluster_ecs" {
    description = "Nombre del clúster ECS donde se desplegará la tarea"
    type        = string
    default     = "proyecto-lp-cluster-1"
}
variable "familia_tarea_ecs" {
    description = "value de la familia de tareas ECS"
    type        = string
    default     = "proyecto-lp-tarea"
}

variable "nombre_repo_ecr" {
    description = "value del repositorio ECR donde se almacenará la imagen del contenedor"
    type        = string
    default     = "proyecto-lp"
}

variable "DB_MYSQL_HOST" {
    description = "value de la URL de la base de datos para la aplicación"
    type        = string
    default     = "tienda-virtual.cxk0zzvbzubk.us-east-1.rds.amazonaws.com"
}

variable "DB_MYSQL_PORT" {
    description = "puerto de la base de datos"
    type        = string
    default     = 3306
}

variable "DB_MYSQL_USER" {
    description = "value del usuario de la base de datos para la aplicación"
    type        = string
    default     = "admin"
}

variable "DB_MYSQL_PASS" {
    description = "value de la contraseña de la base de datos para la aplicación"
    type        = string
    default     = "inf13lp20251"
}

variable "DB_MYSQL_NAME" {
    description = "Nombre de la base de datos"
    type        = string
    default     = "ProyectoDB"
}

variable "DB_MYSQL_TIME" {
    description = "Zona Horaria"
    type        = string
    default     = "America/Lima"
}

variable "DB_MYSQL_DIALECT" {
    description = "Motor utilizado"
    type        = string
    default     = "mysql"
}

variable "DB_MYSQL_POOL_MAX" {
    description = "Maximo pooling"
    type        = string
    default     = 10
}

variable "DB_MYSQL_POOL_MIN" {
    description = "Minimo pooling"
    type        = string
    default     = 5
}

variable "STAGE" {
    description = "entorno en el que esta desplegado"
    type        = string
    default     = "DEV"
}

variable "DOCKER_NETWORK" {
    description = "red de docker en el que esta desplegado"
    type        = string
    default     = "labs"
}

variable "APP_NAME" {
    description = "Nombre de la aplicacion"
    type        = string
    default     = "MS-EDUCATION-LABS"
}

variable "APP_PORT" {
    description = "Puerto de la aplicacion"
    type        = string
    default     = 3000
}

variable "nombre_servicio_ecs" {
    description = "Nombre del servicio ECS donde se desplegará la tarea"
    type        = string
    default     = "proyecto-lp-servicio"

}