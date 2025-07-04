"use client"

import type { Examen } from "@/modelo/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle } from "lucide-react"

interface MateriaCardProps {
  materia: Examen
  onClick: () => void
  completada?: boolean
}

export function MateriaCard({ materia, onClick, completada = false }: MateriaCardProps) {
  return (
    <Card
      className={`cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 border-2 ${
        completada
          ? "bg-gradient-to-br from-green-50 to-emerald-50 border-green-300 hover:border-green-400"
          : "bg-gradient-to-br from-white to-gray-50 hover:border-blue-300"
      }`}
      onClick={onClick}
    >
      <CardHeader className="text-center pb-2 relative">
        {completada && (
          <div className="absolute top-2 right-2">
            <Badge variant="default" className="bg-green-600 hover:bg-green-700 text-white text-xs px-2 py-1">
              <CheckCircle className="h-3 w-3 mr-1" />
              Completado
            </Badge>
          </div>
        )}
        <div className="text-4xl mb-2">{materia.icono}</div>
        <CardTitle className={`text-xl font-bold ${completada ? "text-green-800" : "text-gray-800"}`}>
          {materia.nombre}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <CardDescription className={`text-sm ${completada ? "text-green-600" : "text-gray-600"}`}>
          {materia.descripcion}
        </CardDescription>
        {completada && (
          <div className="mt-2">
            <Badge variant="outline" className="text-xs text-green-700 border-green-300">
              ✨ Examen perfecto logrado
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
