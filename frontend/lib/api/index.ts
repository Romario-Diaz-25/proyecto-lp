
import type { Examen, Pregunta, Respuesta, Resultado } from "@/modelo/types"
import axios from "axios"

const mockMaterias: Examen[] = [
  {
    id: "1",
    nombre: "Matemáticas",
    descripcion: "Álgebra, geometría y cálculo básico",
    icono: "📐",
  },
  {
    id: "2",
    nombre: "Historia",
    descripcion: "Historia universal y nacional",
    icono: "📚",
  },
  {
    id: "3",
    nombre: "Ciencias",
    descripcion: "Biología, química y física",
    icono: "🔬",
  },
  {
    id: "4",
    nombre: "Literatura",
    descripcion: "Análisis literario y comprensión lectora",
    icono: "📖",
  },
]

const mockPreguntas: Record<string, Pregunta[]> = {
  "1": [
    {
      id: "1-1",
      texto: "¿Cuál es el resultado de 2 + 2 × 3?",
      opciones: ["8", "12", "10", "6"],
      respuestaCorrecta: 0,
      materiaId: "1",
    },
    {
      id: "1-2",
      texto: "¿Cuál es la fórmula del área de un círculo?",
      opciones: ["πr²", "2πr", "πd", "r²"],
      respuestaCorrecta: 0,
      materiaId: "1",
    },
    {
      id: "1-3",
      texto: "¿Cuánto es √16?",
      opciones: ["2", "4", "8", "16"],
      respuestaCorrecta: 1,
      materiaId: "1",
    },
    {
      id: "1-4",
      texto: "¿Cuál es el valor de x en la ecuación 2x + 4 = 10?",
      opciones: ["2", "3", "4", "5"],
      respuestaCorrecta: 1,
      materiaId: "1",
    },
    {
      id: "1-5",
      texto: "¿Cuántos grados tiene un triángulo?",
      opciones: ["90°", "180°", "270°", "360°"],
      respuestaCorrecta: 1,
      materiaId: "1",
    },
  ],
  "2": [
    {
      id: "2-1",
      texto: "¿En qué año comenzó la Segunda Guerra Mundial?",
      opciones: ["1938", "1939", "1940", "1941"],
      respuestaCorrecta: 1,
      materiaId: "2",
    },
    {
      id: "2-2",
      texto: "¿Quién fue el primer presidente de Estados Unidos?",
      opciones: ["Thomas Jefferson", "John Adams", "George Washington", "Benjamin Franklin"],
      respuestaCorrecta: 2,
      materiaId: "2",
    },
    {
      id: "2-3",
      texto: "¿En qué siglo ocurrió la Revolución Francesa?",
      opciones: ["Siglo XVII", "Siglo XVIII", "Siglo XIX", "Siglo XX"],
      respuestaCorrecta: 1,
      materiaId: "2",
    },
    {
      id: "2-4",
      texto: "¿Cuál fue la capital del Imperio Romano?",
      opciones: ["Atenas", "Roma", "Constantinopla", "Alejandría"],
      respuestaCorrecta: 1,
      materiaId: "2",
    },
    {
      id: "2-5",
      texto: "¿En qué año cayó el Muro de Berlín?",
      opciones: ["1987", "1988", "1989", "1990"],
      respuestaCorrecta: 2,
      materiaId: "2",
    },
  ],
  "3": [
    {
      id: "3-1",
      texto: "¿Cuál es el símbolo químico del oro?",
      opciones: ["Go", "Au", "Ag", "Or"],
      respuestaCorrecta: 1,
      materiaId: "3",
    },
    {
      id: "3-2",
      texto: "¿Cuántos huesos tiene el cuerpo humano adulto?",
      opciones: ["196", "206", "216", "226"],
      respuestaCorrecta: 1,
      materiaId: "3",
    },
    {
      id: "3-3",
      texto: "¿Cuál es la velocidad de la luz?",
      opciones: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "600,000 km/s"],
      respuestaCorrecta: 0,
      materiaId: "3",
    },
    {
      id: "3-4",
      texto: "¿Qué gas es más abundante en la atmósfera?",
      opciones: ["Oxígeno", "Nitrógeno", "Dióxido de carbono", "Argón"],
      respuestaCorrecta: 1,
      materiaId: "3",
    },
    {
      id: "3-5",
      texto: "¿Cuál es la unidad básica de la vida?",
      opciones: ["Átomo", "Molécula", "Célula", "Tejido"],
      respuestaCorrecta: 2,
      materiaId: "3",
    },
  ],
  "4": [
    {
      id: "4-1",
      texto: '¿Quién escribió "Don Quijote de la Mancha"?',
      opciones: ["Lope de Vega", "Miguel de Cervantes", "Francisco de Quevedo", "Calderón de la Barca"],
      respuestaCorrecta: 1,
      materiaId: "4",
    },
    {
      id: "4-2",
      texto: "¿Cuál es la obra más famosa de William Shakespeare?",
      opciones: ["Macbeth", "Hamlet", "Romeo y Julieta", "Otelo"],
      respuestaCorrecta: 1,
      materiaId: "4",
    },
    {
      id: "4-3",
      texto: "¿Qué es una metáfora?",
      opciones: [
        "Una comparación directa",
        "Una figura retórica de comparación implícita",
        "Una repetición de sonidos",
        "Una exageración",
      ],
      respuestaCorrecta: 1,
      materiaId: "4",
    },
    {
      id: "4-4",
      texto: '¿Quién escribió "Cien años de soledad"?',
      opciones: ["Mario Vargas Llosa", "Gabriel García Márquez", "Jorge Luis Borges", "Octavio Paz"],
      respuestaCorrecta: 1,
      materiaId: "4",
    },
    {
      id: "4-5",
      texto: "¿Qué es un soneto?",
      opciones: ["Un poema de 12 versos", "Un poema de 14 versos", "Un poema de 16 versos", "Un poema de 18 versos"],
      respuestaCorrecta: 1,
      materiaId: "4",
    },
  ],
}

export async function fetchMaterias(): Promise<Examen[]> {
  // const examenes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/examenes`)
  const {data: { data: examenes }} = await axios.get(`http://localhost:3002/v1/exam`)
  return examenes.map((examen: any) => ({
    id: examen.id,
    nombre: examen.title,
    descripcion: examen.description,
    icono: examen.icon,
  }))
}

export async function fetchPreguntas(examenId: string): Promise<Pregunta[]> {
  await new Promise((resolve) => setTimeout(resolve, 800))

  const {data: { data: preguntasServer }} = await axios.get(`http://localhost:3002/v1/exam-question/find-by-exam-id/${examenId}`)


  const preguntas = preguntasServer.map((pregunta: any) => ({
    id: pregunta.id,
    texto: pregunta.questionText,
    opciones: pregunta.answerOptions,
    respuestaCorrecta: pregunta.correctAnswerIndex,
    materiaId: examenId,
  }))

    console.log("Preguntas obtenidas:", preguntas)

  if (!preguntas) {
    throw new Error(`No se encontraron preguntas para la materia ${examenId}`)
  }

  const preguntasMezcladas = [...preguntas].sort(() => Math.random() - 0.5)
  return preguntasMezcladas.slice(0, 5)
}

export async function postResultados(respuestas: Respuesta[], preguntas: Pregunta[]): Promise<Resultado> {
  await new Promise((resolve) => setTimeout(resolve, 600))

  const respuestasDetalladas = respuestas.map((respuesta) => {
    const pregunta = preguntas.find((p) => p.id === respuesta.preguntaId)!
    const esCorrecta = respuesta.opcionSeleccionada === pregunta.respuestaCorrecta

    return {
      pregunta,
      respuestaUsuario: respuesta.opcionSeleccionada,
      esCorrecta,
    }
  })

  const aciertos = respuestasDetalladas.filter((r) => r.esCorrecta).length
  const total = respuestas.length
  const porcentaje = Math.round((aciertos / total) * 100)

  const aprobado = aciertos === total
  const examenPerfecto = aciertos === total

  return {
    aciertos,
    total,
    porcentaje,
    aprobado,
    examenPerfecto,
    respuestas: respuestasDetalladas,
  }
}
