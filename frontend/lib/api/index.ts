import type { Examen, Pregunta, Respuesta, Resultado } from "@/modelo/types";
import axios from "axios";

const NEXT_API_URL =
  "http://proyecto-lp-alb-1580474821.us-east-1.elb.amazonaws.com/v1";

export async function fetchMaterias(): Promise<Examen[]> {
  // const examenes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/examenes`)
  const {
    data: { data: examenes },
  } = await axios.get(`${NEXT_API_URL}/exam`);
  return examenes.map((examen: any) => ({
    id: examen.id,
    nombre: examen.title,
    descripcion: examen.description,
    icono: examen.icon,
  }));
}

export async function fetchPreguntas(examenId: string): Promise<Pregunta[]> {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const {
    data: { data: preguntasServer },
  } = await axios.get(
    `${NEXT_API_URL}/exam-question/find-by-exam-id/${examenId}`
  );

  const preguntas = preguntasServer.map((pregunta: any) => ({
    id: pregunta.id,
    texto: pregunta.questionText,
    opciones: pregunta.answerOptions,
    respuestaCorrecta: pregunta.correctAnswerIndex,
    materiaId: examenId,
  }));

  console.log("Preguntas obtenidas:", preguntas);

  if (!preguntas) {
    throw new Error(`No se encontraron preguntas para la materia ${examenId}`);
  }

  const preguntasMezcladas = [...preguntas].sort(() => Math.random() - 0.5);
  return preguntasMezcladas.slice(0, 5);
}

export async function postResultados(
  respuestas: Respuesta[],
  preguntas: Pregunta[]
): Promise<Resultado> {
  await new Promise((resolve) => setTimeout(resolve, 600));

  const respuestasDetalladas = respuestas.map((respuesta) => {
    const pregunta = preguntas.find((p) => p.id === respuesta.preguntaId)!;
    const esCorrecta =
      respuesta.opcionSeleccionada === pregunta.respuestaCorrecta;

    return {
      pregunta,
      respuestaUsuario: respuesta.opcionSeleccionada,
      esCorrecta,
    };
  });

  const aciertos = respuestasDetalladas.filter((r) => r.esCorrecta).length;
  const total = respuestas.length;
  const porcentaje = Math.round((aciertos / total) * 100);

  const aprobado = aciertos === total;
  const examenPerfecto = aciertos === total;

  return {
    aciertos,
    total,
    porcentaje,
    aprobado,
    examenPerfecto,
    respuestas: respuestasDetalladas,
  };
}
