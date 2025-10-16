import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const AnuncieSeuAgriturismoPage = () => {
  return (
    <div className="flex flex-col items-center w-full min-h-screen">
      <div className="w-full max-w-[100vw] sm:max-w-[95rem] mx-auto px-4 sm:px-16 py-8 sm:py-12 pb-16 sm:pb-20">

        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--main-color)] mb-6 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--main-color)] mb-4">
            Anuncie seu Agriturismo
          </h1>
          <div className="w-24 h-1 bg-[var(--main-color)] mx-auto rounded-full"></div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Benefits */}
          <Card className="shadow-xl border-0 bg-white">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-[var(--main-color)] mb-6">Por que anunciar conosco?</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[var(--main-color)] flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--main-color)] mb-1">Visibilidade Regional</h3>
                    <p className="text-gray-600">Alcance visitantes interessados na região vulcânica</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[var(--main-color)] flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--main-color)] mb-1">Plataforma Gratuita</h3>
                    <p className="text-gray-600">Divulgue seu estabelecimento sem custos</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[var(--main-color)] flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--main-color)] mb-1">Suporte Completo</h3>
                    <p className="text-gray-600">Ajudamos você a configurar seu perfil</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[var(--main-color)] flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--main-color)] mb-1">Turismo Sustentável</h3>
                    <p className="text-gray-600">Participe da promoção do turismo responsável</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Form */}
          <Card className="shadow-xl border-0 bg-white">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-[var(--main-color)] text-center">Solicite seu Cadastro</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nome do Estabelecimento</label>
                  <Input 
                    type="text" 
                    placeholder="Nome do seu agriturismo"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nome do Responsável</label>
                  <Input 
                    type="text" 
                    placeholder="Seu nome completo"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <Input 
                    type="email" 
                    placeholder="seu@email.com"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
                  <Input 
                    type="tel" 
                    placeholder="(35) 99999-9999"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Endereço</label>
                  <Input 
                    type="text" 
                    placeholder="Endereço completo do estabelecimento"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
                  <textarea 
                    className="w-full h-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--main-color)] focus:border-transparent resize-none"
                    placeholder="Descreva brevemente seu agriturismo..."
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-[var(--main-color)] hover:bg-[var(--main-color)]/90 text-white font-semibold py-3"
                >
                  Solicitar Cadastro
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Additional Information */}
        <Card className="shadow-xl border-0 bg-white">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-[var(--main-color)] mb-6 text-center">Como Funciona</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-[var(--main-color)] flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Solicite o Cadastro</h3>
                <p className="text-gray-600 text-sm">Preencha o formulário com as informações do seu estabelecimento</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-[var(--main-color)] flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Avaliação</h3>
                <p className="text-gray-600 text-sm">Nossa equipe avalia e aprova o cadastro do seu agriturismo</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-[var(--main-color)] flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Divulgação</h3>
                <p className="text-gray-600 text-sm">Seu agriturismo aparece na plataforma para todos os visitantes</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AnuncieSeuAgriturismoPage
