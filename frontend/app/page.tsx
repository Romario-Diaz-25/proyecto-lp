"use client"

import { useState } from "react"
import { useMaterias } from "@/hooks/use-materias"
import { useExamen } from "@/hooks/use-examen"
import { useResultados } from "@/hooks/use-resultados"
import { useVidas } from "@/hooks/use-vidas"
import { useMateriasCompletadas } from "@/hooks/use-materias-completadas"
import { MateriaCard } from "@/components/materia-card"
import { Pregunta } from "@/components/pregunta"
import { ResultadoExamen } from "@/components/resultado-examen"
import { ContadorVidas } from "@/components/contador-vidas"
import { MensajeFelicitaciones } from "@/components/mensaje-felicitaciones"
import { MateriasBloqueadas } from "@/components/materias-bloqueadas"
import { ProgresoGeneral } from "@/components/progreso-general"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Send } from "lucide-react"
import { AdvertenciaVidas } from "@/components/advertencia-vidas"

type Vista = "materias" | "examen" | "resultados" | "felicitaciones"

export default function ExamenApp() {
  const [vista, setVista] = useState<Vista>("materias")
  const [materiaSeleccionada, setMateriaSeleccionada] = useState<string | null>(null)

  const { materias, loading: loadingMaterias } = useMaterias()
  const { vidas, vidasAgotadas, tiempoRestante, restarVida } = useVidas()
  const { marcarMateriaCompletada, esMateriaCompletada, totalCompletadas } = useMateriasCompletadas()
  const {
    preguntas,
    estadoExamen,
    preguntaActual,
    respuestaActual = { opcionSeleccionada: 1 },
    loading: loadingExamen,
    registrarRespuesta,
    siguientePregunta,
    preguntaAnterior,
    reiniciarExamen,
    esUltimaPregunta,
    esPrimeraPregunta,
    progreso,
  } = useExamen(materiaSeleccionada)

  const { resultado, loading: loadingResultados, enviarRespuestas } = useResultados()

  const handleSeleccionarMateria = (materiaId: string) => {
    if (vidasAgotadas) return
    setMateriaSeleccionada(materiaId)
    setVista("examen")
  }

  const handleRespuestaChange = (opcion: number) => {
    console.log("Respuesta seleccionada:", opcion)
    console.log("Pregunta actual:", preguntaActual)
    if (preguntaActual) {
      registrarRespuesta(preguntaActual.id, opcion)
    }
  }

  const handleFinalizarExamen = async () => {
    try {
      const resultadoExamen = await enviarRespuestas(estadoExamen.respuestas, preguntas)
      if (resultadoExamen.aciertos === resultadoExamen.total) {
        if (materiaSeleccionada) {
          marcarMateriaCompletada(materiaSeleccionada)
        }
        setVista("felicitaciones")
      } else {
        restarVida()
        setVista("resultados")
      }
    } catch (error) {
      console.error("Error al finalizar examen:", error)
    }
  }

  const handleVolverInicio = () => {
    setVista("materias")
    setMateriaSeleccionada(null)
    reiniciarExamen()
  }

  const handleReiniciarExamen = () => {
    if (vidasAgotadas) return
    reiniciarExamen()
    setVista("examen")
  }

  const handleContinuarDespuesFelicitaciones = () => {
    setVista("resultados")
  }

  const materiaActual = materias.find((m) => m.id === materiaSeleccionada)

  if (loadingMaterias) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando materias...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Sistema de Exámenes</h1>
              {vista !== "materias" && materiaActual && <p className="text-gray-600 mt-1">{materiaActual.nombre}</p>}
            </div>
            <ContadorVidas vidas={vidas} tiempoRestante={tiempoRestante} />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {vista === "materias" && (
          <div>
            {vidasAgotadas ? (
              <MateriasBloqueadas tiempoRestante={tiempoRestante} />
            ) : (
              <>
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2">Selecciona una Materia</h2>
                  <p className="text-gray-600">Elige la materia para comenzar tu examen de 5 preguntas</p>


                  <AdvertenciaVidas vidas={vidas} />
                </div>

                <ProgresoGeneral totalMaterias={materias.length} materiasCompletadas={totalCompletadas} />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {materias.map((materia) => (
                    <MateriaCard
                      key={materia.id}
                      materia={materia}
                      onClick={() => handleSeleccionarMateria(materia.id)}
                      completada={esMateriaCompletada(materia.id)}
                    />
                  ))}
                </div>

                {totalCompletadas > 0 && (
                  <div className="text-center mt-8">
                    <p className="text-sm text-gray-500">
                      💡 <strong>Tip:</strong> Puedes repetir materias completadas para practicar sin perder vidas
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {vista === "examen" && (
          <div>
            {loadingExamen ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
                <p className="text-gray-600">Preparando examen...</p>
              </div>
            ) : preguntaActual ? (
              <div className="space-y-6">
                {materiaSeleccionada && esMateriaCompletada(materiaSeleccionada) && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 max-w-2xl mx-auto">
                    <p className="text-green-800 text-sm text-center">
                      ✅ <strong>Materia ya completada</strong> - Este examen no consumirá vidas
                    </p>
                  </div>
                )}

                <Pregunta
                  key={estadoExamen.preguntaActual}
                  pregunta={preguntaActual}
                  respuestaSeleccionada={respuestaActual?.opcionSeleccionada}
                  onRespuestaChange={handleRespuestaChange}
                  numeroPregunta={estadoExamen.preguntaActual + 1}
                  totalPreguntas={preguntas.length}
                />

                <div className="flex justify-between items-center max-w-2xl mx-auto">
                  <Button
                    onClick={preguntaAnterior}
                    disabled={esPrimeraPregunta}
                    variant="outline"
                    className="flex items-center gap-2 bg-transparent"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Anterior
                  </Button>

                  <div className="text-sm text-gray-500">
                    {estadoExamen.respuestas.length} de {preguntas.length} respondidas
                  </div>

                  {esUltimaPregunta ? (
                    <Button
                      onClick={handleFinalizarExamen}
                      disabled={estadoExamen.respuestas.length !== preguntas.length || loadingResultados}
                      className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                    >
                      {loadingResultados ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                      Finalizar
                    </Button>
                  ) : (
                    <Button onClick={siguientePregunta} className="flex items-center gap-2">
                      Siguiente
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="max-w-2xl mx-auto">
                  <Button
                    onClick={handleVolverInicio}
                    variant="ghost"
                    className="w-full text-gray-500 hover:text-gray-700"
                  >
                    Cancelar y volver al inicio
                  </Button>
                </div>
              </div>
            ) : null}
          </div>
        )}

        {vista === "resultados" && resultado && materiaActual && (
          <ResultadoExamen
            resultado={resultado}
            nombreMateria={materiaActual.nombre}
            onReiniciar={handleReiniciarExamen}
            onVolverInicio={handleVolverInicio}
          />
        )}
      </main>
      {vista === "felicitaciones" && materiaActual && (
        <MensajeFelicitaciones
          nombreMateria={materiaActual.nombre}
          onContinuar={handleContinuarDespuesFelicitaciones}
        />
      )}
    </div>
  )
}
