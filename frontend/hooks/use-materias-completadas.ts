"use client"

import { useState, useEffect, useCallback } from "react"

const STORAGE_KEY_MATERIAS_COMPLETADAS = "exam-app-materias-completadas"

export function useMateriasCompletadas() {
  const [materiasCompletadas, setMateriasCompletadas] = useState<Set<string>>(new Set())

  useEffect(() => {
    const materiasGuardadas = localStorage.getItem(STORAGE_KEY_MATERIAS_COMPLETADAS)
    if (materiasGuardadas) {
      try {
        const materias = JSON.parse(materiasGuardadas)
        setMateriasCompletadas(new Set(materias))
      } catch (error) {
        console.error("Error al cargar materias completadas:", error)
      }
    }
  }, [])

  const marcarMateriaCompletada = useCallback((materiaId: string) => {
    setMateriasCompletadas((prev) => {
      const nuevasCompletadas = new Set(prev)
      nuevasCompletadas.add(materiaId)

      localStorage.setItem(STORAGE_KEY_MATERIAS_COMPLETADAS, JSON.stringify(Array.from(nuevasCompletadas)))

      return nuevasCompletadas
    })
  }, [])

  const esMateriaCompletada = useCallback(
    (materiaId: string) => {
      return materiasCompletadas.has(materiaId)
    },
    [materiasCompletadas],
  )

  const resetearMaterias = useCallback(() => {
    setMateriasCompletadas(new Set())
    localStorage.removeItem(STORAGE_KEY_MATERIAS_COMPLETADAS)
  }, [])

  const totalCompletadas = materiasCompletadas.size

  return {
    materiasCompletadas: Array.from(materiasCompletadas),
    marcarMateriaCompletada,
    esMateriaCompletada,
    resetearMaterias,
    totalCompletadas,
  }
}
