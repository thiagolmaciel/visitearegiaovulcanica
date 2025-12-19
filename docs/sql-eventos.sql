-- Tabela de Eventos
-- Execute este SQL no Supabase SQL Editor

CREATE TABLE events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE,
  location TEXT NOT NULL,
  address TEXT,
  google_maps_link TEXT,
  image_url TEXT,
  category TEXT DEFAULT 'geral',
  status TEXT DEFAULT 'ativo' CHECK (status IN ('ativo', 'cancelado', 'finalizado', 'rascunho')),
  price_info TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  website_url TEXT,
  instagram_url TEXT,
  facebook_url TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para melhor performance
CREATE INDEX idx_events_start_date ON events(start_date DESC);
CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_events_category ON events(category);
CREATE INDEX idx_events_created_at ON events(created_at DESC);

-- Índice composto para buscar eventos ativos (sem função no predicado)
CREATE INDEX idx_events_active ON events(start_date DESC) 
WHERE status = 'ativo';

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para atualizar updated_at
CREATE TRIGGER update_events_updated_at 
BEFORE UPDATE ON events 
FOR EACH ROW 
EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) - Permitir leitura pública
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Política: Qualquer um pode ler eventos ativos ou finalizados
CREATE POLICY "Permitir leitura pública de eventos" ON events
FOR SELECT
USING (status IN ('ativo', 'finalizado'));

-- Política: Apenas usuários autenticados podem criar eventos
CREATE POLICY "Permitir criação de eventos para usuários autenticados" ON events
FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

-- Política: Usuários podem atualizar seus próprios eventos
CREATE POLICY "Permitir atualização de eventos próprios" ON events
FOR UPDATE
USING (auth.uid() = created_by);

-- Política: Usuários podem deletar seus próprios eventos
CREATE POLICY "Permitir deleção de eventos próprios" ON events
FOR DELETE
USING (auth.uid() = created_by);

-- Política: Administradores podem fazer tudo (você precisará criar uma função is_admin)
-- Descomente e ajuste conforme sua estrutura de admin:
-- CREATE POLICY "Permitir tudo para administradores" ON events
-- FOR ALL
-- USING (
--   EXISTS (
--     SELECT 1 FROM profiles 
--     WHERE id = auth.uid() 
--     AND role = 'admin'
--   )
-- );

-- Dados de exemplo (opcional)
INSERT INTO events (
  title,
  description,
  start_date,
  end_date,
  location,
  address,
  category,
  status,
  price_info,
  contact_email,
  contact_phone
) VALUES
(
  'Festival de Inverno da Região Vulcânica',
  'Um evento especial com música ao vivo, gastronomia local e artesanato da região. Venha conhecer a cultura e tradições da nossa região vulcânica!',
  NOW() + INTERVAL '30 days',
  NOW() + INTERVAL '32 days',
  'Centro de Poços de Caldas',
  'Praça Getúlio Vargas, Centro - Poços de Caldas, MG',
  'festival',
  'ativo',
  'Entrada gratuita',
  'contato@regiaovulcanica.org.br',
  '+55 (35) 99819 6519'
),
(
  'Rota do Café - Degustação Especial',
  'Passeio guiado pelas fazendas de café da região com degustação de diferentes tipos de café e aprendizado sobre o processo de produção.',
  NOW() + INTERVAL '15 days',
  NOW() + INTERVAL '15 days',
  'Fazenda São João',
  'Rodovia MG-290, Km 12 - Andradas, MG',
  'turismo',
  'ativo',
  'R$ 80,00 por pessoa',
  'contato@regiaovulcanica.org.br',
  '+55 (35) 99819 6519'
),
(
  'Workshop de Artesanato em Pedra Sabão',
  'Aprenda técnicas tradicionais de artesanato em pedra sabão com artesãos locais. Material incluso.',
  NOW() + INTERVAL '7 days',
  NOW() + INTERVAL '7 days',
  'Centro Cultural',
  'Rua da Cultura, 123 - Poços de Caldas, MG',
  'workshop',
  'ativo',
  'R$ 50,00 por pessoa',
  'contato@regiaovulcanica.org.br',
  '+55 (35) 99819 6519'
);

