export interface Event {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string | null;
  location: string;
  address: string | null;
  google_maps_link: string | null;
  image_url: string | null;
  category: string;
  status: 'ativo' | 'cancelado' | 'finalizado' | 'rascunho';
  price_info: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  website_url: string | null;
  instagram_url: string | null;
  facebook_url: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export type EventCategory = 
  | 'geral' 
  | 'festival' 
  | 'turismo' 
  | 'workshop' 
  | 'gastronomia' 
  | 'cultura' 
  | 'esporte' 
  | 'outro';

export type EventStatus = 'ativo' | 'cancelado' | 'finalizado' | 'rascunho';


