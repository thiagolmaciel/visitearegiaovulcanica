export interface Member {
    id?: string;
    name: string;
    description: string;
    email: string;
    whatsapp: string;
    phone: string;
    image: string;
    location_id: string | null;
    instagram: string;
    facebook: string;
    website: string;
    slug: string;
  }

  export interface MemberWithProfileID extends Member {
    profile_id: string;
  }