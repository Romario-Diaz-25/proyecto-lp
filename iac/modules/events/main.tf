resource "aws_cloudwatch_event_bus" "decrement_bus" {
    name = "ordenes-bus"
}

resource "aws_cloudwatch_event_rule" "decrement_life" {
    name           = "decrement-life"
    description    = "Regla para crear orden desde evento personalizado"
    event_bus_name = aws_cloudwatch_event_bus.decrement_bus.name
    event_pattern = jsonencode({
        source       = ["pe.com.proyectolp"],
        "detail-type": ["decrement-life"]
    })
}

resource "aws_cloudwatch_event_target" "target_lambda_decrement_life" {
    rule      = aws_cloudwatch_event_rule.decrement_life.name
    target_id = "decrement-life-lambda"
    arn       = var.decrement_life_funcion_arn
    event_bus_name = aws_cloudwatch_event_bus.decrement_bus.name
}

resource "aws_lambda_permission" "allow_eventbridge" {
    statement_id  = "AllowExecutionFromEventBridge"
    action        = "lambda:InvokeFunction"
    function_name = var.decrement_life_funcion_name
    principal     = "events.amazonaws.com"
    source_arn    = aws_cloudwatch_event_rule.decrement_life.arn
}