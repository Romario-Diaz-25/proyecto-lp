"use client"

import type { Resultado } from "@/modelo/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Trophy, AlertCircle } from "lucide-react"

interface ResultadoExamenProps {
  resultado: Resultado
  nombreMateria: string
  onReiniciar: () => void
  onVolverInicio: () => void
}

export function ResultadoExamen({ resultado, nombreMateria, onReiniciar, onVolverInicio }: ResultadoExamenProps) {
  const { aciertos, total, porcentaje, aprobado, respuestas } = resultado

  const getResultadoColor = () => {
    if (porcentaje === 100) return "text-green-600"
    if (porcentaje >= 80) return "text-yellow-600"
    if (porcentaje >= 60) return "text-orange-600"
    return "text-red-600"
  }

  const getResultadoIcon = () => {
    if (porcentaje === 100) {
      return <Trophy className="h-16 w-16 text-yellow-500" />
    }
    return <AlertCircle className="h-16 w-16 text-red-500" />
  }

  const getResultadoMensaje = () => {
    if (porcentaje === 100) return "¡Examen perfecto!"
    if (porcentaje >= 80) return "Muy bien, pero necesitas perfección"
    if (porcentaje >= 60) return "Bien, pero debes mejorar"
    return "Necesitas estudiar más"
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Resultado Principal */}
      <Card className="text-center">
        <CardHeader>
          <div className="flex flex-col items-center space-y-4">
            {getResultadoIcon()}
            <CardTitle className="text-2xl font-bold">Examen de {nombreMateria} Completado</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className={`text-6xl font-bold ${getResultadoColor()}`}>{porcentaje}%</div>
          <div className="text-xl text-gray-600">
            {aciertos} de {total} respuestas correctas
          </div>
          <Badge variant={porcentaje === 100 ? "default" : "destructive"} className="text-lg px-4 py-2">
            {getResultadoMensaje()}
          </Badge>

          <div className="flex justify-center space-x-4 mt-6">
            <button
              onClick={onReiniciar}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
            >
              Reintentar Examen
            </button>
            <button
              onClick={onVolverInicio}
              className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
            >
              Volver al Inicio
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Detalle de Respuestas */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Detalle de Respuestas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {respuestas.map((respuesta, index) => (
              <div
                key={respuesta.pregunta.id}
                className={`p-4 rounded-lg border-2 ${
                  respuesta.esCorrecta ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
                }`}
              >
                <div className="flex items-start space-x-3">
                  {respuesta.esCorrecta ? (
                    <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  ) : (
                    <XCircle className="h-6 w-6 text-red-600 mt-1 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Pregunta {index + 1}: {respuesta.pregunta.texto}
                    </h4>
                    <div className="space-y-1 text-sm">
                      <div className={`${respuesta.esCorrecta ? "text-green-700" : "text-red-700"}`}>
                        <strong>Tu respuesta:</strong> {respuesta.pregunta.opciones[respuesta.respuestaUsuario]}
                      </div>
                      {!respuesta.esCorrecta && (
                        <div className="text-green-700">
                          <strong>Respuesta correcta:</strong>{" "}
                          {respuesta.pregunta.opciones[respuesta.pregunta.respuestaCorrecta]}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
