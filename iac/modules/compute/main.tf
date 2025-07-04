resource "aws_ecs_cluster" "cluster_proyecto_lp_servicios" {
    name = var.nombre_cluster
}

resource "aws_ecs_task_definition" "definicion_tarea_proyecto_lp" {
    family = var.familia_tarea
    requires_compatibilities = ["FARGATE"]
    network_mode = "awsvpc"
    cpu = "1024"
    memory = "3072"
    execution_role_arn = var.rol_lab_arn
    task_role_arn = var.rol_lab_arn

    container_definitions = jsonencode([{
        name = "proyecto_lp",
        image = "${var.id_cuenta_aws}.dkr.ecr.${var.region_aws}.amazonaws.com/${var.nombre_repo_ecr}:latest",
        essential = true,
        portMappings = [
            {
                containerPort = 3000,
                protocol = "tcp"
            }
        ],
        cpu = 1024,
        memory = 3072,
        memoryReservation = 1024,
        environment = [
            {
                name  = "DB_MYSQL_HOST"
                value = var.DB_MYSQL_HOST
            },
            {
                name  = "DB_MYSQL_PORT"
                value = var.DB_MYSQL_PORT
            },
            {
                name  = "DB_MYSQL_USER"
                value = var.DB_MYSQL_USER
            },
            {
                name  = "DB_MYSQL_PASS"
                value = var.DB_MYSQL_PASS
            },
            {
                name  = "DB_MYSQL_NAME"
                value = var.DB_MYSQL_NAME
            },
            {
                name  = "DB_MYSQL_TIME"
                value = var.DB_MYSQL_TIME
            },
            {
                name  = "DB_MYSQL_DIALECT"
                value = var.DB_MYSQL_DIALECT
            },
            {
                name  = "DB_MYSQL_POOL_MAX"
                value = var.DB_MYSQL_POOL_MAX
            },
            {
                name  = "DB_MYSQL_POOL_MIN"
                value = var.DB_MYSQL_POOL_MIN
            },
            {
                name  = "STAGE"
                value = var.STAGE
            },
            {
                name  = "DOCKER_NETWORK"
                value = var.DOCKER_NETWORK
            },
            {
                name  = "APP_NAME"
                value = var.APP_NAME
            },
            {
                name  = "APP_PORT"
                value = var.APP_PORT
            }
        ], 
        logConfiguration = {
            logDriver = "awslogs"
            options = {
                awslogs-group         = "/ecs/${var.nombre_servicio_ecs}"
                awslogs-region        = var.region_aws
                awslogs-stream-prefix = "ecs"
            }
        }
    }])
}

resource "aws_cloudwatch_log_group" "ecs_logs" {
  name              = "/ecs/${var.nombre_servicio_ecs}"
  retention_in_days = 7
}

data "aws_vpc" "vpc_por_defecto" {
  default = true
}

data "aws_subnets" "sub_redes_por_defecto" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.vpc_por_defecto.id]
  }
}

data "aws_security_group" "grupo_seguridad_por_defecto" {
    name   = "default"
    vpc_id = data.aws_vpc.vpc_por_defecto.id
}

resource "aws_ecs_service" "servicio_proyecto_lp" {
    name            = var.nombre_servicio_ecs
    cluster         = aws_ecs_cluster.cluster_proyecto_lp_servicios.id
    task_definition = aws_ecs_task_definition.definicion_tarea_proyecto_lp.arn
    desired_count   = 1
    launch_type     = "FARGATE"

    load_balancer {
        target_group_arn = aws_lb_target_group.tg_proyecto_lp.arn
        container_name   = "proyecto_lp"
        container_port   = 3000
    }

    network_configuration {
        subnets         = data.aws_subnets.sub_redes_por_defecto.ids
        security_groups = [data.aws_security_group.grupo_seguridad_por_defecto.id]
        assign_public_ip = true
    }

    deployment_controller {
        type = "ECS"
    }

    depends_on = [
        aws_ecs_task_definition.definicion_tarea_proyecto_lp,
        aws_lb_listener.http_listener
    ]
}

resource "aws_appautoscaling_target" "obetivo_escalamiento_ecs" {
    service_namespace  = "ecs"
    resource_id        = "service/${aws_ecs_cluster.cluster_proyecto_lp_servicios.name}/${aws_ecs_service.servicio_proyecto_lp.name}"
    scalable_dimension = "ecs:service:DesiredCount"
    min_capacity       = 1
    max_capacity       = 4
}

resource "aws_appautoscaling_policy" "politica_de_autoescalamiento_ecs" {
    name               = "cpu-utilization-scaling"
    service_namespace  = "ecs"
    resource_id        = aws_appautoscaling_target.obetivo_escalamiento_ecs.resource_id
    scalable_dimension = aws_appautoscaling_target.obetivo_escalamiento_ecs.scalable_dimension
    policy_type        = "TargetTrackingScaling"

    target_tracking_scaling_policy_configuration {
        target_value       = 75.0
        predefined_metric_specification {
            predefined_metric_type = "ECSServiceAverageCPUUtilization"
        }

        scale_in_cooldown  = 60
        scale_out_cooldown = 60
    }
}

resource "aws_lb" "proyecto_lp_load_balancer" {
  name               = "proyecto-lp-alb"
  internal           = false
  load_balancer_type = "application"
  subnets            = data.aws_subnets.sub_redes_por_defecto.ids
  security_groups    = [data.aws_security_group.grupo_seguridad_por_defecto.id]
}

resource "aws_lb_target_group" "tg_proyecto_lp" {
  name     = "tg-proyecto-lp"
  port     = 3000
  protocol = "HTTP"
  vpc_id   = data.aws_vpc.vpc_por_defecto.id
  target_type = "ip"

  health_check {
    path                = "/"
    interval            = 30
    timeout             = 5
    healthy_threshold   = 2
    unhealthy_threshold = 2
    matcher             = "200"
  }
}

resource "aws_lb_listener" "http_listener" {
  load_balancer_arn = aws_lb.proyecto_lp_load_balancer.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.tg_proyecto_lp.arn
  }
}