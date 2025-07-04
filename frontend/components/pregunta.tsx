"use client"

import { useEffect } from "react"
import type { Pregunta as PreguntaType } from "@/modelo/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface PreguntaProps {
  pregunta: PreguntaType
  respuestaSeleccionada?: number
  onRespuestaChange: (opcion: number) => void
  numeroPregunta: number
  totalPreguntas: number
}

export function Pregunta({
  pregunta,
  respuestaSeleccionada,
  onRespuestaChange,
  numeroPregunta,
  totalPreguntas,
}: PreguntaProps) {
  useEffect(() => {
  }, [numeroPregunta])


  
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-500">
            Pregunta {numeroPregunta} de {totalPreguntas}
          </span>
          <div className="w-32 bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(numeroPregunta / totalPreguntas) * 100}%` }}
            />
          </div>
        </div>
        <CardTitle className="text-lg font-semibold text-gray-800">{pregunta.texto}</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={respuestaSeleccionada?.toString()}
          onValueChange={(value) => onRespuestaChange(Number(value))}
          className="space-y-3"
        >
          {pregunta.opciones.map((opcion, index) => (
            <div key={index} className="flex items-center space-x-3">
              <RadioGroupItem value={index.toString()} id={`opcion-${index}`} className="text-blue-600" />
              <Label
                htmlFor={`opcion-${index}`}
                className="flex-1 cursor-pointer p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-gray-700 mr-2">{String.fromCharCode(65 + index)}.</span>
                {opcion}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  )
}
