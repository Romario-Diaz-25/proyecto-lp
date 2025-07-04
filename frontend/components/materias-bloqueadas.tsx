"use client"

import { Lock, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface MateriasBloqueadasProps {
  tiempoRestante: string
}

export function MateriasBloqueadas({ tiempoRestante }: MateriasBloqueadasProps) {
  return (
    <div className="text-center py-12">
      <Card className="w-full max-w-md mx-auto bg-gray-50 border-2 border-gray-300">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Lock className="h-16 w-16 text-gray-400" />
              <Clock className="h-6 w-6 text-red-500 absolute -bottom-1 -right-1" />
            </div>
          </div>
          <CardTitle className="text-xl font-bold text-gray-700">Vidas Agotadas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">Tus vidas se restablecerán pasadas las 24 horas</p>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center justify-center gap-2 text-red-700">
              <Clock className="h-5 w-5" />
              <span className="font-mono text-lg font-bold">{tiempoRestante}</span>
            </div>
            <p className="text-red-600 text-sm mt-2">Tiempo restante para recuperar vidas</p>
          </div>

          <p className="text-sm text-gray-500">💡 Consejo: ¡Estudia mientras esperas para mejorar tus resultados!</p>
        </CardContent>
      </Card>
    </div>
  )
}
