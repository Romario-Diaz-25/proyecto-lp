/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimizaciones para Node.js 22
  experimental: {
    // Usar el nuevo compilador Turbo (más rápido en Node 22)
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
    // Optimizaciones de memoria para Node 22
    memoryBasedWorkers: true,
    // Usar el nuevo sistema de cache
    staleTimes: {
      dynamic: 30,
      static: 180,
    },
  },
  
  // Configuración de TypeScript optimizada
  typescript: {
    // Usar el nuevo compilador de TypeScript
    tsconfigPath: './tsconfig.json',
    ignoreBuildErrors: false, // Updated from true to false
  },

  // Optimizaciones de rendimiento
  compiler: {
    // Remover console.log en producción
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Configuración de imágenes
  images: {
    formats: ['image/avif', 'image/webp'],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: true, // Updated from false to true
  },

  // Headers de seguridad
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },

  eslint: {
    ignoreDuringBuilds: false, // Updated from true to false
  },
}

export default nextConfig
