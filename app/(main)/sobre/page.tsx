import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import React from 'react'

const SobrePage = () => {
  return (
    <div className="flex flex-col items-center w-full min-h-screen">
      <div className="w-full max-w-[100vw] sm:max-w-[95rem] mx-auto px-4 sm:px-16 py-8 sm:py-12 pb-16 sm:pb-20">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--main-color)] mb-6 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--main-color)] mb-4">
            Sobre a Plataforma
          </h1>
          <div className="w-24 h-1 bg-[var(--main-color)] mx-auto rounded-full"></div>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Conheça a Iniciativa */}
          <Link href="/sobre/conheca-a-iniciativa">
            <Card className="shadow-lg border-0 bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-[var(--main-color)] flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[var(--main-color)] mb-2">Conheça a Iniciativa</h3>
                <p className="text-sm text-gray-600">Saiba mais sobre nosso projeto e objetivos</p>
              </CardContent>
            </Card>
          </Link>

          {/* Contato */}
          <Link href="/sobre/contato">
            <Card className="shadow-lg border-0 bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-[var(--main-color)] flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[var(--main-color)] mb-2">Contato</h3>
                <p className="text-sm text-gray-600">Entre em contato conosco</p>
              </CardContent>
            </Card>
          </Link>

          {/* Anuncie seu Agriturismo */}
          <Link href="/sobre/anuncie-seu-agriturismo">
            <Card className="shadow-lg border-0 bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-[var(--main-color)] flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[var(--main-color)] mb-2">Anuncie seu Agriturismo</h3>
                <p className="text-sm text-gray-600">Divulgue seu estabelecimento</p>
              </CardContent>
            </Card>
          </Link>

          {/* Destinos */}
          <Link href="/search">
            <Card className="shadow-lg border-0 bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-[var(--main-color)] flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[var(--main-color)] mb-2">Destinos</h3>
                <p className="text-sm text-gray-600">Explore todos os destinos</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Main Description */}
        <Card className="shadow-xl border-0 bg-white">
          <CardContent className="p-8 sm:p-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-[var(--main-color)] mb-6">Bem-vindo à Plataforma</h2>
              <p className="text-lg sm:text-xl leading-relaxed text-gray-700 max-w-4xl mx-auto">
                A plataforma <span className="font-bold text-[var(--main-color)]">Visite a Região Vulcânica</span> foi criada para conectar visitantes aos encantos únicos da região vulcânica. Descubra agriturismos, experiências sustentáveis e atrativos naturais que fazem desta região um destino especial.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default SobrePage
