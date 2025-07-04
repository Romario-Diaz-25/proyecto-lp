terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  backend "s3" {
    bucket         = "proyecto-lp-roma"                           # tu bucket nuevo
    key            = "proyecto-lp/backend-terraform.tfstate"      # la nueva ruta dentro del bucket
    region         = "us-east-1"
    dynamodb_table = "terraform-locks-2"    
    # key    = "backend-terraform.tfstate"
    # region = "us-east-1"
  }
}