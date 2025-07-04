"use client"

import { useState } from "react"
import type { Respuesta, Resultado, Pregunta } from "@/modelo/types"
import { postResultados } from "@/lib/api"

export function useResultados() {
  const [resultado, setResultado] = useState<Resultado | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const enviarRespuestas = async (respuestas: Respuesta[], preguntas: Pregunta[]) => {
    try {
      setLoading(true)
      setError(null)
      const data = await postResultados(respuestas, preguntas)
      setResultado(data)
      return data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error al procesar resultados"
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const limpiarResultados = () => {
    setResultado(null)
    setError(null)
  }

  return {
    resultado,
    loading,
    error,
    enviarRespuestas,
    limpiarResultados,
  }
}
