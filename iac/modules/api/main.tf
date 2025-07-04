resource "aws_apigatewayv2_api" "http_api" {
  name          = "proyecto-lp-api"
  protocol_type = "HTTP"
}

resource "aws_apigatewayv2_integration" "examen_integration_get_all" {
  api_id                 = aws_apigatewayv2_api.http_api.id
  integration_type       = "HTTP_PROXY"
  integration_uri        = "http://${var.load_balancer_url}/v1/exam"
  integration_method     = "ANY"
  payload_format_version = "1.0"
}

resource "aws_apigatewayv2_integration" "examen_integration" {
  api_id                 = aws_apigatewayv2_api.http_api.id
  integration_type       = "HTTP_PROXY"
  integration_uri        = "http://${var.load_balancer_url}/v1/exam/{proxy}"
  integration_method     = "ANY"
  payload_format_version = "1.0"
}

resource "aws_apigatewayv2_integration" "preguntas_examen_integration_get_all_by_exam_id" {
  api_id                 = aws_apigatewayv2_api.http_api.id
  integration_type       = "HTTP_PROXY"
  integration_uri        = "http://${var.load_balancer_url}/v1/exam-question/find-by-exam-id/{proxy}"
  integration_method     = "ANY"
  payload_format_version = "1.0"
}

resource "aws_apigatewayv2_integration" "estudiantes_integration_get_all" {
  api_id                 = aws_apigatewayv2_api.http_api.id
  integration_type       = "HTTP_PROXY"
  integration_uri        = "http://${var.load_balancer_url}/v1/students"
  integration_method     = "ANY"
  payload_format_version = "1.0"
}

resource "aws_apigatewayv2_integration" "estudiantes_integration" {
  api_id                 = aws_apigatewayv2_api.http_api.id
  integration_type       = "HTTP_PROXY"
  integration_uri        = "http://${var.load_balancer_url}/v1/students/{proxy}"
  integration_method     = "ANY"
  payload_format_version = "1.0"
}





resource "aws_apigatewayv2_integration" "eventbridge_integration" {
  api_id                 = aws_apigatewayv2_api.http_api.id
  integration_type       = "AWS_PROXY"
  integration_subtype    = "EventBridge-PutEvents"
  credentials_arn        = var.rol_lab_arn

  request_parameters = {
    Source       = "pe.com.tiendavirtual"
    DetailType   = "crear-orden"
    Detail       = "$request.body"
    EventBusName = var.event_bus_name
  }

  payload_format_version = "1.0"
  timeout_milliseconds   = 10000
}

resource "aws_apigatewayv2_stage" "default_stage" {
  api_id      = aws_apigatewayv2_api.http_api.id
  name        = "$default"
  auto_deploy = true

  default_route_settings {
    throttling_burst_limit = 500
    throttling_rate_limit  = 1000
  }

  route_settings {
    route_key     = "$default"
    logging_level = "INFO"
  }
}

#########################################
# Routes - Examenes
#########################################
resource "aws_apigatewayv2_route" "clientes_get_all" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "GET /examen"
  target    = "integrations/${aws_apigatewayv2_integration.examen_integration_get_all.id}"
}

resource "aws_apigatewayv2_route" "examen_get_proxy" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "GET /examen/{proxy+}"
  target    = "integrations/${aws_apigatewayv2_integration.examen_integration.id}"
}

#########################################
# Routes - Preguntas Examenes
#########################################

resource "aws_apigatewayv2_route" "pregunta_examen_get_proxy" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "GET /examen/get_all_by_exam_id/{proxy+}"
  target    = "integrations/${aws_apigatewayv2_integration.preguntas_examen_integration_get_all_by_exam_id.id}"
}

#########################################
# Routes - Preguntas Estudiantes
#########################################


resource "aws_apigatewayv2_route" "estudiantes_get_all" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "GET /estudiantes"
  target    = "integrations/${aws_apigatewayv2_integration.estudiantes_integration_get_all.id}"
}

resource "aws_apigatewayv2_route" "estudiantes_get_proxy" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "GET /estudiantes/{proxy+}"
  target    = "integrations/${aws_apigatewayv2_integration.estudiantes_integration.id}"
}

resource "aws_apigatewayv2_route" "estudiantes_post" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "POST /estudiantes/{proxy+}"
  target    = "integrations/${aws_apigatewayv2_integration.estudiantes_integration.id}"
}

resource "aws_apigatewayv2_route" "decrement_life_put" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "PUT /estudiantes/decrement-life/{proxy+}"
  target    = "integrations/${aws_apigatewayv2_integration.eventbridge_integration.id}"
}


# resource "aws_apigatewayv2_integration" "decrement_life_put_integration" {
#   api_id                 = aws_apigatewayv2_api.http_api.id
#   integration_type       = "HTTP_PROXY"
#   integration_uri        = "http://${var.load_balancer_url}/v1/students/decrement-life/{proxy}"
#   integration_method     = "ANY"
#   payload_format_version = "1.0"
# }




# resource "aws_apigatewayv2_integration" "clientes_integration" {
#   api_id                 = aws_apigatewayv2_api.http_api.id
#   integration_type       = "HTTP_PROXY"
#   integration_uri        = "http://${var.load_balancer_url}/api/clientes/{proxy}"
#   integration_method     = "ANY"
#   payload_format_version = "1.0"
# }

# resource "aws_apigatewayv2_integration" "carritos_integration_get_all" {
#   api_id                 = aws_apigatewayv2_api.http_api.id
#   integration_type       = "HTTP_PROXY"
#   integration_uri        = "http://${var.load_balancer_url}/api/carritos"
#   integration_method     = "ANY"
#   payload_format_version = "1.0"
# }

# resource "aws_apigatewayv2_integration" "carritos_integration" {
#   api_id                 = aws_apigatewayv2_api.http_api.id
#   integration_type       = "HTTP_PROXY"
#   integration_uri        = "http://${var.load_balancer_url}/api/carritos/{proxy}"
#   integration_method     = "ANY"
#   payload_format_version = "1.0"
# }

# resource "aws_apigatewayv2_integration" "ordenes_integration_get_all" {
#   api_id                 = aws_apigatewayv2_api.http_api.id
#   integration_type       = "HTTP_PROXY"
#   integration_uri        = "http://${var.load_balancer_url}/api/ordenes"
#   integration_method     = "ANY"
#   payload_format_version = "1.0"
# }

# resource "aws_apigatewayv2_integration" "ordenes_integration" {
#   api_id                 = aws_apigatewayv2_api.http_api.id
#   integration_type       = "HTTP_PROXY"
#   integration_uri        = "http://${var.load_balancer_url}/api/ordenes/{proxy}"
#   integration_method     = "ANY"
#   payload_format_version = "1.0"
# }


#########################################
# Routes - Ordenes (EventBridge for POST, PUT)
#########################################
# resource "aws_apigatewayv2_route" "ordenes_post" {
#   api_id    = aws_apigatewayv2_api.http_api.id
#   route_key = "POST /ordenes"
#   target    = "integrations/${aws_apigatewayv2_integration.eventbridge_integration.id}"
# }

# resource "aws_apigatewayv2_route" "ordenes_put" {
#   api_id    = aws_apigatewayv2_api.http_api.id
#   route_key = "PUT /ordenes/{proxy+}"
#   target    = "integrations/${aws_apigatewayv2_integration.eventbridge_integration.id}"
# }




# resource "aws_apigatewayv2_route" "ordenes_post" {
#   api_id    = aws_apigatewayv2_api.http_api.id
#   route_key = "POST /ordenes"
#   target    = "integrations/${aws_apigatewayv2_integration.eventbridge_integration.id}"
# }

#########################################
# Routes - Clientes
#########################################
# resource "aws_apigatewayv2_route" "clientes_get_all" {
#   api_id    = aws_apigatewayv2_api.http_api.id
#   route_key = "GET /clientes"
#   target    = "integrations/${aws_apigatewayv2_integration.clientes_integration_get_all.id}"
# }

# resource "aws_apigatewayv2_route" "clientes_get_proxy" {
#   api_id    = aws_apigatewayv2_api.http_api.id
#   route_key = "GET /clientes/{proxy+}"
#   target    = "integrations/${aws_apigatewayv2_integration.clientes_integration.id}"
# }

# resource "aws_apigatewayv2_route" "clientes_post" {
#   api_id    = aws_apigatewayv2_api.http_api.id
#   route_key = "POST /clientes/{proxy+}"
#   target    = "integrations/${aws_apigatewayv2_integration.clientes_integration.id}"
# }

# resource "aws_apigatewayv2_route" "clientes_put_proxy" {
#   api_id    = aws_apigatewayv2_api.http_api.id
#   route_key = "PUT /clientes/{proxy+}"
#   target    = "integrations/${aws_apigatewayv2_integration.clientes_integration.id}"
# }

# resource "aws_apigatewayv2_route" "clientes_delete_proxy" {
#   api_id    = aws_apigatewayv2_api.http_api.id
#   route_key = "DELETE /clientes/{proxy+}"
#   target    = "integrations/${aws_apigatewayv2_integration.clientes_integration.id}"
# }

#########################################
# Routes - Productos
#########################################

# resource "aws_apigatewayv2_route" "producto_get_all" {
#   api_id    = aws_apigatewayv2_api.http_api.id
#   route_key = "GET /productos"
#   target    = "integrations/${aws_apigatewayv2_integration.productos_integration_get_all.id}"
# }

# resource "aws_apigatewayv2_route" "producto_get_proxy" {
#   api_id    = aws_apigatewayv2_api.http_api.id
#   route_key = "GET /productos/{proxy+}"
#   target    = "integrations/${aws_apigatewayv2_integration.productos_integration.id}"
# }

# resource "aws_apigatewayv2_route" "producto_post" {
#   api_id    = aws_apigatewayv2_api.http_api.id
#   route_key = "POST /productos/{proxy+}"
#   target    = "integrations/${aws_apigatewayv2_integration.productos_integration.id}"
# }

# resource "aws_apigatewayv2_route" "producto_put_proxy" {
#   api_id    = aws_apigatewayv2_api.http_api.id
#   route_key = "PUT /productos/{proxy+}"
#   target    = "integrations/${aws_apigatewayv2_integration.productos_integration.id}"
# }

# resource "aws_apigatewayv2_route" "producto_delete_proxy" {
#   api_id    = aws_apigatewayv2_api.http_api.id
#   route_key = "DELETE /productos/{proxy+}"
#   target    = "integrations/${aws_apigatewayv2_integration.productos_integration.id}"
# }

#########################################
# Routes - Carritos
#########################################
# resource "aws_apigatewayv2_route" "carritos_get_all" {
#   api_id    = aws_apigatewayv2_api.http_api.id
#   route_key = "GET /carritos"
#   target    = "integrations/${aws_apigatewayv2_integration.carritos_integration_get_all.id}"
# }

# resource "aws_apigatewayv2_route" "carritos_get_proxy" {
#   api_id    = aws_apigatewayv2_api.http_api.id
#   route_key = "GET /carritos/{proxy+}"
#   target    = "integrations/${aws_apigatewayv2_integration.carritos_integration.id}"
# }

# resource "aws_apigatewayv2_route" "carritos_post" {
#   api_id    = aws_apigatewayv2_api.http_api.id
#   route_key = "POST /carritos/{proxy+}"
#   target    = "integrations/${aws_apigatewayv2_integration.carritos_integration.id}"
# }

# resource "aws_apigatewayv2_route" "carritos_put_proxy" {
#   api_id    = aws_apigatewayv2_api.http_api.id
#   route_key = "PUT /carritos/{proxy+}"
#   target    = "integrations/${aws_apigatewayv2_integration.carritos_integration.id}"
# }

# resource "aws_apigatewayv2_route" "carritos_delete_proxy" {
#   api_id    = aws_apigatewayv2_api.http_api.id
#   route_key = "DELETE /carritos/{proxy+}"
#   target    = "integrations/${aws_apigatewayv2_integration.carritos_integration.id}"
# }

#########################################
# Routes - Ordenes
# #########################################
# resource "aws_apigatewayv2_route" "ordenes_get_all" {
#   api_id    = aws_apigatewayv2_api.http_api.id
#   route_key = "GET /ordenes"
#   target    = "integrations/${aws_apigatewayv2_integration.ordenes_integration_get_all.id}"
# }

# resource "aws_apigatewayv2_route" "ordenes_get_proxy" {
#   api_id    = aws_apigatewayv2_api.http_api.id
#   route_key = "GET /ordenes/{proxy+}"
#   target    = "integrations/${aws_apigatewayv2_integration.ordenes_integration.id}"
# }

# resource "aws_apigatewayv2_route" "ordenes_delete_proxy" {
#   api_id    = aws_apigatewayv2_api.http_api.id
#   route_key = "DELETE /ordenes/{proxy+}"
#   target    = "integrations/${aws_apigatewayv2_integration.ordenes_integration.id}"
# }
