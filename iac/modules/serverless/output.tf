output "decrement_life_funcion_arn" {
  description = "ARN de la función para crear ordenes"
  value       = aws_lambda_function.crear_orden.arn
}
output "decrement_life_funcion_name" {
  description = "Nombre de la función Lambda para crear ordenes"
  value       = aws_lambda_function.crear_orden.function_name
}