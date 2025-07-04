data "archive_file" "archivo_decrement_life_lambda" {
  type        = "zip"
  source_dir  = "${path.root}/../serverless/proyectolp/packages/funciones/decrement-life/build"
  output_path = "${path.root}/data/decrement_life_lambda.zip"
}

resource "aws_lambda_function" "crear_orden" {
  function_name    = "decrement_life_lambda"
  handler          = "index.handler"
  runtime          = var.entorno_ejecucion
  role             = var.rol_lambda_arn
  filename         = data.archive_file.archivo_decrement_life_lambda.output_path
  source_code_hash = filebase64sha256(data.archive_file.archivo_decrement_life_lambda.output_path)
  timeout          = 60
  memory_size      = 512
  environment {
    variables = {
        URL_BASE_SERVICIO = var.url_base_servicio
    }
  }
}