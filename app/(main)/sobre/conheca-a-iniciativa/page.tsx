import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import React from 'react'

const ConhecaAIniciativa = () => {
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
            Conheça a Iniciativa
          </h1>
          <div className="w-24 h-1 bg-[var(--main-color)] mx-auto rounded-full"></div>
        </div>

        {/* Content Cards */}
        <div className="space-y-8">
          {/* Main Description Card */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-8 sm:p-12">
              <div className="prose prose-lg sm:prose-xl max-w-none">
                <p className="text-lg sm:text-xl leading-relaxed text-gray-700 mb-6 font-medium">
                  A iniciativa da plataforma{' '}
                  <span className="font-bold text-[var(--main-color)]">
                    Visite a Região Vulcânica
                  </span>{' '}
                  nasce no âmbito do{' '}
                  <span className="font-bold text-gray-900">
                    Programa Institucional de Apoio a Ações de Extensão do IFSP
                  </span>
                  . O projeto tem como objetivo unir tecnologia e sustentabilidade para fortalecer o turismo local, valorizando a{' '}
                  <span className="font-bold text-[var(--main-color)]">
                    região vulcânica
                  </span>{' '}
                  e promovendo experiências que respeitem o meio ambiente e a cultura regional.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Team Card */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-8 sm:p-12">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-[var(--main-color)] flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[var(--main-color)]">Equipe Responsável</h3>
              </div>
                <p className="text-lg sm:text-xl leading-relaxed text-gray-700">
                  Coordenado pelo professor{' '}
                  <span className="font-bold text-[var(--main-color)]">João Paulo Pereira</span>{' '}
                  e desenvolvido pelo estudante bolsista do IFSP - Campus São João da Boa Vista,{' '}
                  <span className="font-bold text-[var(--main-color)]">Thiago Laranjeira Maciel</span>
                  , o projeto consiste nesta plataforma digital, que facilita a divulgação de atrativos turísticos, práticas sustentáveis e informações úteis para visitantes e moradores.
                </p>
            </CardContent>
          </Card>

          {/* Vision Card */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-8 sm:p-12">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-[var(--main-color)] flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[var(--main-color)]">Nossa Visão</h3>
              </div>
              <p className="text-lg sm:text-xl leading-relaxed text-gray-700">
                Mais do que um recurso tecnológico, a iniciativa representa um espaço de integração entre comunidade, academia e setor turístico. Ao mesmo tempo em que contribui para a formação prática dos estudantes, também busca fomentar o desenvolvimento socioeconômico regional e incentivar um turismo ágil e transparente.
              </p>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <Link href="/busca">
              <div className="inline-flex items-center justify-center px-8 py-4 bg-[var(--main-color)] rounded-full text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Explore a Região Vulcânica
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConhecaAIniciativa
