"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Trophy, Target } from "lucide-react"

interface ProgresoGeneralProps {
  totalMaterias: number
  materiasCompletadas: number
}

export function ProgresoGeneral({ totalMaterias, materiasCompletadas }: ProgresoGeneralProps) {
  const porcentajeProgreso = totalMaterias > 0 ? (materiasCompletadas / totalMaterias) * 100 : 0
  const todasCompletadas = materiasCompletadas === totalMaterias

  if (materiasCompletadas === 0) return null

  return (
    <Card
      className={`mb-6 ${todasCompletadas ? "bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-300" : "bg-blue-50 border-blue-200"}`}
    >
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          {todasCompletadas ? (
            <>
              <Trophy className="h-5 w-5 text-yellow-600" />
              <span className="text-yellow-800">¡Todas las materias completadas!</span>
            </>
          ) : (
            <>
              <Target className="h-5 w-5 text-blue-600" />
              <span className="text-blue-800">Progreso General</span>
            </>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className={todasCompletadas ? "text-yellow-700" : "text-blue-700"}>
              {materiasCompletadas} de {totalMaterias} materias completadas
            </span>
            <span className={`font-bold ${todasCompletadas ? "text-yellow-800" : "text-blue-800"}`}>
              {Math.round(porcentajeProgreso)}%
            </span>
          </div>
          <Progress
            value={porcentajeProgreso}
            className={`h-2 ${todasCompletadas ? "bg-yellow-200" : "bg-blue-200"}`}
          />
          {todasCompletadas && (
            <p className="text-sm text-yellow-700 text-center font-medium">
              🎉 ¡Felicidades! Has dominado todas las materias con exámenes perfectos
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
