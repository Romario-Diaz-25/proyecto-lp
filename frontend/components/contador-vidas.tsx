"use client"

import { Heart } from "lucide-react"

interface ContadorVidasProps {
  vidas: number
  tiempoRestante?: string
}

export function ContadorVidas({ vidas, tiempoRestante }: ContadorVidasProps) {
  return (
    <div className="flex items-center gap-3 bg-white rounded-lg px-4 py-2 shadow-sm border">
      <div className="flex items-center gap-2">
        <Heart className={`h-6 w-6 ${vidas > 0 ? "text-red-500 fill-red-500" : "text-gray-300"}`} />
        <span className="text-lg font-bold text-gray-700">{vidas}</span>
      </div>
      {tiempoRestante && vidas === 0 && (
        <div className="text-xs text-gray-500 font-mono bg-gray-100 px-2 py-1 rounded">{tiempoRestante}</div>
      )}
    </div>
  )
}
