"use client"

import { AlertTriangle } from "lucide-react"

interface AdvertenciaVidasProps {
  vidas: number
}

export function AdvertenciaVidas({ vidas }: AdvertenciaVidasProps) {
  if (vidas >= 3) return null

  const getMensaje = () => {
    if (vidas === 2) return "¡Cuidado! Solo te quedan 2 vidas"
    if (vidas === 1) return "¡ÚLTIMA VIDA! Debes responder todas correctamente"
    return ""
  }

  const getColor = () => {
    if (vidas === 2) return "bg-yellow-50 border-yellow-200 text-yellow-800"
    if (vidas === 1) return "bg-red-50 border-red-200 text-red-800"
    return ""
  }

  return (
    <div className={`mt-4 border rounded-lg p-3 max-w-md mx-auto ${getColor()}`}>
      <div className="flex items-center gap-2">
        <AlertTriangle className="h-5 w-5" />
        <p className="text-sm font-medium">{getMensaje()}</p>
      </div>
      <p className="text-xs mt-1 opacity-75">Recuerda: Solo los exámenes perfectos (5/5) no consumen vidas</p>
    </div>
  )
}
