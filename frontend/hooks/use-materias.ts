"use client"

import { useState, useEffect } from "react"
import type { Examen } from "@/modelo/types"
import { fetchMaterias } from "@/lib/api"

export function useMaterias() {
  const [materias, setMaterias] = useState<Examen[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadMaterias = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await fetchMaterias()
      setMaterias(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar materias")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadMaterias()
  }, [])

  return { materias, loading, error, refetch: loadMaterias }
}
