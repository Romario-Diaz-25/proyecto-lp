# pucp-education-labs

Education Labs es un sistema para poder brindar cursos y examenes a estudiantes de direfentes ramas profesionales
e instituciones.
Este proyecto se propuso en el paradigma logico, y siguiendo con el regimen de entrega se avanzó en un 50% las apis
teniendo concluido los CRUDs de 3 entidades que son :

- students
- courses
- student_courses

# ESPECIFICACIONES DE PROYECTO

El proyecto se esta desarrollando con typescript y node.js, usando Express como framework de desarrollo
y de ORM se esta utilizando Knex.js

# LEVANTAMIENTO DE PROYECTO

- Descargar el proyecto, y correr el comando:

Se debe tener instalado node -v 22.0.0
Se debe asegurar que la instancia rds este activa para la conexion a base de datos
Se debe asegurar que las variables de entorno este con todos sus parametros especificados

npm install

- y luego para poder levantar el proyecto tenemos 2 formas
  en forma local de desarrollo y forma de produccion:

- forma local:
  npm run start:local

- forma en produccion para que se haga la build
  npm start

y listo, ya se tendra la aplicacion corriendo en el puerto 3002

# LEVANTAMIENTO DE PROYECTO CON DOCKER

- Descargar el proyecto, y correr el comando:

docker compose up --build

- para confirmar que se creo el contenedor:

docker ps

y listo, la aplicacion puede ser accedida desde el puerto 3002
