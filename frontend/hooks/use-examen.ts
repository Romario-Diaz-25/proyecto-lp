"use client"

import { useState, useEffect, useCallback } from "react"
import type { Pregunta, EstadoExamen } from "@/modelo/types"
import { fetchPreguntas } from "@/lib/api"

export function useExamen(materiaId: string | null) {
  const [preguntas, setPreguntas] = useState<Pregunta[]>([])
  const [estadoExamen, setEstadoExamen] = useState<EstadoExamen>({
    preguntaActual: 0,
    respuestas: [],
    completado: false,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!materiaId) return

    async function loadPreguntas() {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchPreguntas(materiaId!)
        setPreguntas(data)
        setEstadoExamen({
          preguntaActual: 0,
          respuestas: [],
          completado: false,
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error al cargar preguntas")
      } finally {
        setLoading(false)
      }
    }

    loadPreguntas()
  }, [materiaId])

  const registrarRespuesta = useCallback((preguntaId: string, opcionSeleccionada: number) => {
    setEstadoExamen((prev) => {
      const nuevasRespuestas = [...prev.respuestas]
      const indiceExistente = nuevasRespuestas.findIndex((r) => r.preguntaId === preguntaId)

      if (indiceExistente >= 0) {
        nuevasRespuestas[indiceExistente] = { preguntaId, opcionSeleccionada }
      } else {
        nuevasRespuestas.push({ preguntaId, opcionSeleccionada })
      }

      return {
        ...prev,
        respuestas: nuevasRespuestas,
      }
    })
  }, [])

  const siguientePregunta = useCallback(() => {
    setEstadoExamen((prev) => ({
      ...prev,
      preguntaActual: Math.min(prev.preguntaActual + 1, preguntas.length - 1),
    }))
  }, [preguntas.length])

  const preguntaAnterior = useCallback(() => {
    setEstadoExamen((prev) => ({
      ...prev,
      preguntaActual: Math.max(prev.preguntaActual - 1, 0),
    }))
  }, [])

  const finalizarExamen = useCallback(() => {
    setEstadoExamen((prev) => ({
      ...prev,
      completado: true,
    }))
  }, [])

  const reiniciarExamen = useCallback(() => {
    setEstadoExamen({
      preguntaActual: 0,
      respuestas: [],
      completado: false,
    })
  }, [])

  const preguntaActual = preguntas[estadoExamen.preguntaActual]
  console.log("Pregunta actual:", preguntaActual)
  console.log("Estado del examen:", estadoExamen)
  const respuestaActual = estadoExamen.respuestas.find((r) => r.preguntaId === preguntaActual?.id)

  return {
    preguntas,
    estadoExamen,
    preguntaActual,
    respuestaActual,
    loading,
    error,
    registrarRespuesta,
    siguientePregunta,
    preguntaAnterior,
    finalizarExamen,
    reiniciarExamen,
    esUltimaPregunta: estadoExamen.preguntaActual === preguntas.length - 1,
    esPrimeraPregunta: estadoExamen.preguntaActual === 0,
    progreso: preguntas.length > 0 ? ((estadoExamen.preguntaActual + 1) / preguntas.length) * 100 : 0,
  }
}
