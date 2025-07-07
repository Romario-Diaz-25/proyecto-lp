```markdown
# Resumen Tecnológico del Proyecto

Este proyecto es una plataforma educativa para la entrega de cursos y exámenes para estudiantes, desarrollada con tecnologías modernas en frontend, backend e infraestructura.

---

## Frontend
- **Next.js**: Framework React para aplicaciones web modernas.
- **React** con Hooks personalizados para manejo de estado y lógica del examen.
- **Radix UI**: Librerías de componentes accesibles y estilizados.
- **Tailwind CSS**: Framework de estilos utilitario con soporte para modo claro/oscuro.
- Uso de almacenamiento local para progreso y vidas en exámenes.
- Despliegue configurado en **Vercel** con integración en CI/CD.

## Backend
- **Node.js** con **TypeScript** y **Express** para APIs REST.
- Arquitectura basada en controladores, servicios y repositorios.
- **Knex.js** como ORM para base de datos MySQL.
- Modelos de dominio bien definidos (Course, Exam, Student, etc.).
- Internacionalización (i18n) mediante archivos JSON.
- Manejo avanzado de errores y respuestas con decoradores.

## Base de Datos
- **MySQL** alojado en AWS RDS.
- Migraciones y esquemas gestionados mediante clases y definiciones de esquema.
- Soporte para soft delete y pool de conexiones configurado.

## Infraestructura como Código (IaC)
- **Terraform** para automatización y gestión de infraestructura AWS.
- Despliegue de clúster **ECS** en **AWS Fargate**.
- Configuración de **Application Load Balancer (ALB)** para balanceo HTTP.
- Registro y despliegue de imágenes Docker en **AWS ECR**.
- Integración con **AWS API Gateway HTTP API** para exponer las APIs.
- Uso de **AWS EventBridge** para gestión de eventos internos.
- Configuración de logs con **CloudWatch**.
- Autoescalado de ECS basado en uso de CPU.

## CI/CD y Despliegue
- Pipeline en **GitHub Actions** para tests, construcción Docker y despliegue en AWS y Vercel.
- Control de versiones con tags Git automáticos.
- Variables de entorno gestionadas con secretos y variables GitHub.

## Otras Herramientas y Configuraciones
- Linter **ESLint** configurado para Next.js y TypeScript.
- Utilidades propias para manejo de fechas, errores y respuestas.
- UI moderna y accesible con componentes de Radix UI.
- Optimización del frontend para navegadores modernos y Node.js 22.

---

## Servicios AWS Utilizados
- **ECS (Elastic Container Service) con Fargate**
- **ECR (Elastic Container Registry)**
- **Application Load Balancer (ALB)**
- **API Gateway (HTTP API)**
- **CloudWatch Logs**
- **EventBridge (Bus de eventos personalizado)**
- **Lambda Functions** (para lógica de decremento de vidas vía eventos)
- **RDS (MySQL)**

---

**En resumen**, se trata de una aplicación web educativa con:

- Frontend moderno y optimizado con Next.js y Tailwind CSS.
- Backend robusto en Node.js/Express con TypeScript y arquitectura modular.
- BD relacional MySQL gestionada con migraciones.
- Infraestructura gestionada via Terraform en AWS, aprovechando servicios serverless y gestionados para escalabilidad.
- Flujo CI/CD automatizado para construcción, pruebas y despliegue en AWS y Vercel.
```
