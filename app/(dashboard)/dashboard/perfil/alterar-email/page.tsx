import InfoTag from '@/components/dashboard/info-tag';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import React from 'react'
import { Mail, Lock, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

const AlterarEmailPage = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-8">
      {/* Back Button */}
      <div className="flex items-center gap-3">
        <Link href="/dashboard/perfil" className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors">
          <ArrowLeft size={20} />
          <span>Voltar ao perfil</span>
        </Link>
      </div>

      <InfoTag message='Altere seu email ou senha. Certifique-se de usar uma senha forte e segura.'></InfoTag>
    
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 items-start">
          <h2 className="font-bold text-xl">Alterar Email e Senha</h2>
          <p className="text-[#747474]">Atualize suas credenciais de acesso</p>
        </div>

        {/* Email Change Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Alterar Email</h3>
                <p className="text-sm text-gray-500">Email atual: {data.claims.email}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Novo email
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--main-color)] focus:border-transparent"
                  placeholder="Digite seu novo email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmar novo email
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--main-color)] focus:border-transparent"
                  placeholder="Confirme seu novo email"
                />
              </div>

              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Enviar confirmação por email
              </button>
            </div>
          </div>
        </div>

        {/* Password Change Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Lock className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Alterar Senha</h3>
                <p className="text-sm text-gray-500">Escolha uma senha forte e segura</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Senha atual
                </label>
                <div className="relative">
                  <input
                    type="password"
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--main-color)] focus:border-transparent"
                    placeholder="Digite sua senha atual"
                  />
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    <Eye size={16} />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nova senha
                </label>
                <div className="relative">
                  <input
                    type="password"
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--main-color)] focus:border-transparent"
                    placeholder="Digite sua nova senha"
                  />
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    <Eye size={16} />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmar nova senha
                </label>
                <div className="relative">
                  <input
                    type="password"
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--main-color)] focus:border-transparent"
                    placeholder="Confirme sua nova senha"
                  />
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    <Eye size={16} />
                  </button>
                </div>
              </div>

              {/* Password Strength Indicator */}
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Força da senha:</p>
                <div className="flex gap-1">
                  <div className="h-2 w-full bg-gray-200 rounded"></div>
                  <div className="h-2 w-full bg-gray-200 rounded"></div>
                  <div className="h-2 w-full bg-gray-200 rounded"></div>
                  <div className="h-2 w-full bg-gray-200 rounded"></div>
                </div>
                <p className="text-xs text-gray-500">
                  Use pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e símbolos
                </p>
              </div>

              <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                Alterar senha
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Link href="/dashboard/perfil">
            <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              Voltar ao perfil
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AlterarEmailPage
