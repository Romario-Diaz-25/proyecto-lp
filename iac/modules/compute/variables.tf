variable "nombre_cluster" {
  type = string
  description = "Nombre del clúster ECS donde se desplegará la tarea"
}

variable "familia_tarea" {
  type = string
  description = "Nombre de la familia de tareas ECS"
}

variable "rol_lab_arn" {
  type = string
  description = "ARN del rol IAM que la tarea ECS utilizará"
}

variable "id_cuenta_aws" {
  type = string
}

variable "region_aws" {
  type = string
}

variable "nombre_repo_ecr" {
  type = string
  description = "Nombre del repositorio ECR donde se almacenará la imagen del contenedor"
}


variable "DB_MYSQL_HOST" {
    description = "value de la URL de la base de datos para la aplicación"
    type        = string
}

variable "DB_MYSQL_PORT" {
    description = "puerto de la base de datos"
    type        = string
}

variable "DB_MYSQL_USER" {
    description = "value del usuario de la base de datos para la aplicación"
    type        = string
}

variable "DB_MYSQL_PASS" {
    description = "value de la contraseña de la base de datos para la aplicación"
    type        = string
}

variable "DB_MYSQL_NAME" {
    description = "Nombre de la base de datos"
    type        = string
}

variable "DB_MYSQL_TIME" {
    description = "Zona Horaria"
    type        = string
}

variable "DB_MYSQL_DIALECT" {
    description = "Motor utilizado"
    type        = string
}

variable "DB_MYSQL_POOL_MAX" {
    description = "Maximo pooling"
    type        = string
}

variable "DB_MYSQL_POOL_MIN" {
    description = "Minimo pooling"
    type        = string
}

variable "STAGE" {
    description = "entorno en el que esta desplegado"
    type        = string
}

variable "DOCKER_NETWORK" {
    description = "red de docker en el que esta desplegado"
    type        = string
}

variable "APP_NAME" {
    description = "Nombre de la aplicacion"
    type        = string
}

variable "APP_PORT" {
    description = "Puerto de la aplicacion"
    type        = string
}

variable "nombre_servicio_ecs" {
  type = string
  description = "Nombre del servicio ECS donde se desplegará la tarea"
}