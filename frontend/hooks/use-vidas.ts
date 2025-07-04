"use client";

import { useState, useEffect, useCallback } from "react";

const VIDAS_INICIALES = 30;
const TIEMPO_RESTABLECIMIENTO = 24 * 60 * 60 * 1000;
const STORAGE_KEY_VIDAS = "exam-app-vidas";
const STORAGE_KEY_TIEMPO_AGOTAMIENTO = "exam-app-tiempo-agotamiento";

export function useVidas() {
  const [vidas, setVidas] = useState(VIDAS_INICIALES);
  const [tiempoAgotamiento, setTiempoAgotamiento] = useState<number | null>(
    null
  );
  const [tiempoRestante, setTiempoRestante] = useState<number>(0);

  useEffect(() => {
    const vidasGuardadas = localStorage.getItem(STORAGE_KEY_VIDAS);
    const tiempoGuardado = localStorage.getItem(STORAGE_KEY_TIEMPO_AGOTAMIENTO);

    if (vidasGuardadas) {
      setVidas(Number.parseInt(vidasGuardadas));
    }

    if (tiempoGuardado) {
      const tiempo = Number.parseInt(tiempoGuardado);
      setTiempoAgotamiento(tiempo);

      const ahora = Date.now();
      if (ahora >= tiempo + TIEMPO_RESTABLECIMIENTO) {
        setVidas(VIDAS_INICIALES);
        setTiempoAgotamiento(null);
        localStorage.removeItem(STORAGE_KEY_VIDAS);
        localStorage.removeItem(STORAGE_KEY_TIEMPO_AGOTAMIENTO);
      }
    }
  }, []);

  useEffect(() => {
    if (!tiempoAgotamiento) return;

    const interval = setInterval(() => {
      const ahora = Date.now();
      const tiempoTranscurrido = ahora - tiempoAgotamiento;
      const restante = TIEMPO_RESTABLECIMIENTO - tiempoTranscurrido;

      if (restante <= 0) {
        setVidas(VIDAS_INICIALES);
        setTiempoAgotamiento(null);
        setTiempoRestante(0);
        localStorage.removeItem(STORAGE_KEY_VIDAS);
        localStorage.removeItem(STORAGE_KEY_TIEMPO_AGOTAMIENTO);
      } else {
        setTiempoRestante(restante);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [tiempoAgotamiento]);

  const restarVida = useCallback(() => {
    const nuevasVidas = Math.max(0, vidas - 1);
    setVidas(nuevasVidas);
    localStorage.setItem(STORAGE_KEY_VIDAS, nuevasVidas.toString());

    if (nuevasVidas === 0) {
      const ahora = Date.now();
      setTiempoAgotamiento(ahora);
      localStorage.setItem(STORAGE_KEY_TIEMPO_AGOTAMIENTO, ahora.toString());
    }
  }, [vidas]);

  const formatearTiempoRestante = useCallback(() => {
    if (tiempoRestante <= 0) return "";

    const horas = Math.floor(tiempoRestante / (1000 * 60 * 60));
    const minutos = Math.floor(
      (tiempoRestante % (1000 * 60 * 60)) / (1000 * 60)
    );
    const segundos = Math.floor((tiempoRestante % (1000 * 60)) / 1000);

    return `${horas.toString().padStart(2, "0")}:${minutos
      .toString()
      .padStart(2, "0")}:${segundos.toString().padStart(2, "0")}`;
  }, [tiempoRestante]);

  return {
    vidas,
    vidasAgotadas: vidas === 0,
    tiempoRestante: formatearTiempoRestante(),
    restarVida,
  };
}
