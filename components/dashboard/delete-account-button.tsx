'use client'
import React from 'react';
import ConfirmDialog from './confirm-dialog';

export default function DeleteAccountButton() {
  const [dialogOpen, setDialogOpen] = React.useState(false);

  async function handleDeleteAccount() {
    try {
      // Here you would implement the actual account deletion logic
      console.log('Account deletion requested');
      // await deleteUserAccount();
      // router.push('/auth/login');
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
