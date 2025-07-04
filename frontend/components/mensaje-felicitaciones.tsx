"use client"

import { Trophy, Star, Sparkles, CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface MensajeFelicitacionesProps {
  nombreMateria: string
  onContinuar: () => void
}

export function MensajeFelicitaciones({ nombreMateria, onContinuar }: MensajeFelicitacionesProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4 bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300">
        <CardContent className="text-center p-8">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Trophy className="h-16 w-16 text-yellow-500" />
              <Sparkles className="h-6 w-6 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
              <Star className="h-4 w-4 text-yellow-400 absolute -bottom-1 -left-1 animate-bounce" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-2">¡Felicidades, aprobado!</h2>

          <p className="text-gray-600 mb-4">
            Has respondido correctamente <strong>todas las preguntas</strong> de {nombreMateria}
          </p>

          <div className="bg-green-100 border border-green-300 rounded-lg p-3 mb-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <p className="text-green-800 font-medium">¡Materia completada!</p>
            </div>
            <p className="text-green-700 text-sm">🎉 Examen perfecto: 5/5 respuestas correctas</p>
            <p className="text-green-700 text-sm">✨ No perdiste ninguna vida</p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 mb-6">
            <p className="text-blue-800 text-sm">📋 Esta materia ahora aparecerá marcada como "Completado"</p>
          </div>

          <button
            onClick={onContinuar}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors w-full"
          >
            Continuar
          </button>
        </CardContent>
      </Card>
    </div>
  )
}
