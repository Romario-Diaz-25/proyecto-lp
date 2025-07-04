
export interface Examen {
  id: string
  nombre: string
  descripcion?: string
  icono?: string
}

export interface Pregunta {
  id: string
  texto: string
  opciones: string[]
  respuestaCorrecta: number
  materiaId: string
}

export interface Respuesta {
  preguntaId: string
  opcionSeleccionada: number
}

export interface Resultado {
  aciertos: number
  total: number
  porcentaje: number
  aprobado: boolean
  examenPerfecto: boolean 
  respuestas: RespuestaDetallada[]
}

export interface RespuestaDetallada {
  pregunta: Pregunta
  respuestaUsuario: number
  esCorrecta: boolean
}

export interface EstadoExamen {
  preguntaActual: number
  respuestas: Respuesta[]
  completado: boolean
}
