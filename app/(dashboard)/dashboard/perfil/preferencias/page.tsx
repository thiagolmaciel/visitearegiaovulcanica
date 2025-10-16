'use client'
import InfoTag from '@/components/dashboard/info-tag';
import React from 'react'
import { Shield, ArrowLeft, Trash2, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import ConfirmDialog from '@/components/dashboard/confirm-dialog';

const PreferenciasPage = () => { 

  return (
    <div className="flex-1 w-full flex flex-col gap-8">
      {/* Back Button */}
      <div className="flex items-center gap-3">
        <Link href="/dashboard/perfil" className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors">
          <ArrowLeft size={20} />
          <span>Voltar ao perfil</span>
        </Link>
      </div>

      <InfoTag message='Configure suas configurações de privacidade e gerencie sua conta.'></InfoTag>
    
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 items-start">
          <h2 className="font-bold text-xl">Configurações de Privacidade</h2>
          <p className="text-[#747474]">Gerencie suas configurações de privacidade e conta</p>
        </div>


        {/* Privacy Settings */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Privacidade</h3>
                <p className="text-sm text-gray-500">Configure suas configurações de privacidade</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-800">Perfil público</h4>
                  <p className="text-sm text-gray-500">Permitir que outros usuários vejam seu perfil</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[var(--main-color)]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--main-color)]"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-800">Análise de dados</h4>
                  <p className="text-sm text-gray-500">Permitir coleta de dados para melhorar a experiência</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[var(--main-color)]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--main-color)]"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Delete Account Section */}
        <div className="bg-red-50 border-2 border-red-200 rounded-2xl shadow-lg p-6">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-red-800">ZONA PERIGOSA</h3>
                <p className="text-sm text-red-600">Ações irreversíveis para sua conta</p>
              </div>
            </div>

            <div className="bg-white border border-red-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Trash2 className="w-6 h-6 text-red-600" />
                  <div>
                    <h4 className="font-bold text-red-800 text-lg">EXCLUIR SUA CONTA</h4>
                    <p className="text-sm text-red-600">
                      Esta ação é <span className="font-bold">IRREVERSÍVEL</span>. Todos os seus dados, 
                      agriturismos e informações serão <span className="font-bold">PERMANENTEMENTE DELETADOS</span>.
                    </p>
                    <p className="text-xs text-red-500 mt-2">
                      ⚠️ Esta ação não pode ser desfeita. Certifique-se antes de continuar.
                    </p>
                  </div>
                </div>
                <DeleteAccountButton />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <button className="px-6 py-2 bg-[var(--main-color)] text-white rounded-lg hover:opacity-90 transition-opacity">
            Salvar preferências
          </button>
          <Link href="/dashboard/perfil">
            <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              Cancelar
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

function yarnDeleteAccountButton() {
  const [dialogOpen, setDialogOpen] = React.useState(false);

  async function handleDeleteAccount() {
    try {
      console.log('Account deletion requested');
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  }

  return (
    <>
      <button 
        onClick={() => setDialogOpen(true)}
        className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold shadow-lg"
      >
        EXCLUIR CONTA
      </button>
      
      <ConfirmDialog 
        open={dialogOpen}
        onClose={(confirmed) => {
          setDialogOpen(false);
          if (confirmed) {
            handleDeleteAccount();
          }
        }}
        title="CONFIRMAR EXCLUSÃO DA CONTA"
        description="⚠️ ATENÇÃO: Esta ação é IRREVERSÍVEL! Você está prestes a excluir permanentemente sua conta e todos os dados associados: agriturismos cadastrados, imagens e informações dos locais, dados pessoais e de perfil, histórico de atividades, e configurações. Esta ação NÃO pode ser desfeita. Tem certeza absoluta que deseja continuar?"
      />
    </>
  );
}

export default PreferenciasPage
