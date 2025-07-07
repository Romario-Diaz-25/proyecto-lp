Este proyecto es una plataforma educativa orientada a la entrega de cursos y exámenes para estudiantes, desarrollada con una arquitectura moderna y herramientas diversas tanto en el backend, frontend e infraestructura.


Frontend:



Se utiliza Next.js para la construcción de la aplicación del lado del cliente, aprovechando React y funcionalidades modernas como Server Components.

Se emplean librerías de Radix UI para componentes accesibles y estilizados.

El styling está basado en Tailwind CSS con configuraciones personalizadas para modos claro y oscuro.

Hooks personalizados y un sistema de manejo de examen con contador de vidas, progreso y manejo de resultados.


Backend:



El backend está desarrollado con Node.js y TypeScript, usando el framework Express para el manejo de rutas y controladores.

Se usa arquitectura basada en controladores, servicios y repositorios, con un patrón claro y modular.

Se utiliza Knex.js como ORM para interacción con la base de datos MySQL.

Arquitectura orientada a entidades con clases modelo para dominio (Course, Exam, Student, etc.).

Se aplican validaciones, manejo de errores con clases personalizadas y soporte para internacionalización (i18n) mediante JSON.

Se usan decoradores para manejo automático de controladores y respuestas.


Base de Datos:



La base de datos es MySQL alojada en AWS RDS.

Se gestionan esquemas y migraciones de tablas mediante clases y esquemas definidos con utilidades propias.

Se implementan patrones de soft delete y manejo de pool de conexiones.


Infraestructura como Código (IaC):



El proyecto utiliza Terraform para automatizar la infraestructura AWS.

Se configura un clúster ECS en AWS Fargate con definición de tareas y servicios.

Se implementa un Application Load Balancer (ALB) para enrutar el tráfico HTTP hacia los servicios ECS.

Se utiliza AWS ECR para almacenamiento y despliegue de imágenes Docker.

Se establece integración con AWS API Gateway HTTP API para exponer las APIs backend.

Se emplea EventBridge para eventos internos, incluyendo un bus personalizado y regla para funciones Lambda.

Se configura CloudWatch para logs y métricas.

Autoescalado configurado para ECS basado en uso de CPU.


Despliegue y CI/CD:



GitHub Actions configurado para automatizar pruebas, construcción de imágenes docker y despliegue a AWS ECR y ECS.

Deploy frontend está configurado para desplegar en Vercel con variables de entorno seguras.

Se maneja versionado mediante tags git para control de versiones del build.


Otras Tecnologías y Utilidades:



Uso de ESLint con presets para Next.js y TypeScript.

Librerías para manejo de fechas personalizado y utilidades comunes.

Uso de librerías UI modernas para aseguramiento de experiencia y accesibilidad en frontend.

Manejo de estados con React hooks y almacenamiento local para progreso y vidas del examen.


En resumen, este es un aplicativo web moderno para educación en línea, con backend robusto en Node/Express, base de datos MySQL, frontend optimizado con Next.js, y una infraestructura sólida desplegada y gestionada a través de Terraform en AWS, usando servicios como ECS, ECR, ALB, API Gateway, EventBridge y Lambda para garantizar escalabilidad, mantenibilidad y una integración fluida entre componentes.
