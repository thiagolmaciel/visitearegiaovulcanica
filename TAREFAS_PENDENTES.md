# Tarefas Pendentes e Itens Incompletos

Este documento lista funcionalidades que estão incompletas ou precisam de implementação nos dashboards.

## 📊 Dashboard Administrativo

### Página de Estatísticas (`app/(admin)/admin/estatisticas/page.tsx`)
- ✅ **Gráficos de crescimento**: Implementados com Recharts
  - Gráfico de "Crescimento de Usuários" 
  - Gráfico de "Crescimento de Locais"
- **Status**: ✅ Completo

### Página de Configurações (`app/(admin)/admin/configuracoes/page.tsx`)
- ✅ **Salvamento de configurações**: Implementado
  - Toggles funcionais (2FA, Logs, Notificações, Alertas, Modo Manutenção)
  - Select de frequência de backup funcional
  - API routes para salvar/carregar configurações
- ✅ **Modo de manutenção**: Implementado
  - Middleware verifica e redireciona para página de manutenção
  - Página de manutenção criada
- ⚠️ **Backup automático**: Botão presente mas funcionalidade de backup real não implementada
  - Requer integração com serviço de backup ou Supabase
- ⚠️ **Autenticação de dois fatores (2FA)**: Toggle funcional mas integração com serviço 2FA não implementada
  - Requer integração com serviço externo (Google Authenticator, Authy, etc.)
- ⚠️ **Sistema de logs de auditoria**: Toggle funcional mas sistema de logs não implementado
  - Requer criação de tabela de logs e lógica de registro
- ⚠️ **Sistema de notificações por email**: Toggle funcional mas envio de emails não implementado
  - Requer configuração de serviço de email (Resend já está no projeto)
- **Status**: Funcionalidades básicas implementadas, funcionalidades avançadas pendentes

## 📝 Observações

- As configurações são salvas na tabela `system_settings` (se existir) ou usam valores padrão
- Modo de manutenção funciona para rotas públicas
- Gráficos mostram dados dos últimos 30 dias

---

**Última atualização**: Janeiro 2025
