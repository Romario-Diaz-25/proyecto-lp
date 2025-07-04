provider "aws" {
  region = var.region
}

provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"
}

module "serverless" {
    source = "./modules/serverless"
    rol_lambda_arn = var.rol_lab_arn
    url_base_servicio = var.url_base_servicio
}

module "compute" {
    source = "./modules/compute"
    nombre_cluster = var.nombre_cluster_ecs
    familia_tarea = var.familia_tarea_ecs
    rol_lab_arn = var.rol_lab_arn
    id_cuenta_aws = var.id_cuenta_aws
    region_aws = var.region
    nombre_repo_ecr = var.nombre_repo_ecr
    # servidor_base_datos = var.servidor_base_datos
    # usuario_base_datos = var.usuario_base_datos
    # contrasenha_base_datos = var.contrasenha_base_datos
    nombre_servicio_ecs = var.nombre_servicio_ecs
    DB_MYSQL_HOST = var.DB_MYSQL_HOST
    DB_MYSQL_PORT = var.DB_MYSQL_PORT
    DB_MYSQL_USER = var.DB_MYSQL_USER
    DB_MYSQL_PASS = var.DB_MYSQL_PASS
    DB_MYSQL_NAME = var.DB_MYSQL_NAME
    DB_MYSQL_TIME = var.DB_MYSQL_TIME
    DB_MYSQL_DIALECT = var.DB_MYSQL_DIALECT
    DB_MYSQL_POOL_MAX = var.DB_MYSQL_POOL_MAX
    DB_MYSQL_POOL_MIN = var.DB_MYSQL_POOL_MIN
    STAGE = var.STAGE
    DOCKER_NETWORK = var.DOCKER_NETWORK
    APP_NAME = var.APP_NAME
    APP_PORT = var.APP_PORT
}

# module "events" {
#     source = "./modules/events"
#     crear_orden_funcion_arn = module.serverless.crear_orden_funcion_arn
#     crear_orden_funcion_name = module.serverless.crear_orden_funcion_name
# }

module "api" {
    source = "./modules/api"
    load_balancer_url = module.compute.load_balancer_url
    rol_lab_arn = var.rol_lab_arn
    # event_bus_name = module.events.event_bus_name
}
