"use client"

import { Button } from "@/components/ui/button"
import { Play, RotateCcw } from "lucide-react"

interface BotonIniciarProps {
  onClick: () => void
  loading?: boolean
  disabled?: boolean
  variant?: "start" | "restart"
  className?: string
}

export function BotonIniciar({
  onClick,
  loading = false,
  disabled = false,
  variant = "start",
  className = "",
}: BotonIniciarProps) {
  const isStart = variant === "start"

  return (
    <Button
      onClick={onClick}
      disabled={disabled || loading}
      className={`${className} ${isStart ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"} text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center gap-2`}
      size="lg"
    >
      {loading ? (
        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
      ) : (
        <>
          {isStart ? <Play className="h-4 w-4" /> : <RotateCcw className="h-4 w-4" />}
          {isStart ? "Iniciar Examen" : "Reiniciar Examen"}
        </>
      )}
    </Button>
  )
}
