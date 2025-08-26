import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export async function getImages(slug: string){
    const { data, error } = await supabase
    .storage
    .from('afiliados')
    .list(`images/${slug}`, {
      limit: 100,
      offset: 0,
      sortBy: { column: 'name', order: 'desc' },
    });

  if (error || !data) {
    console.error("Erro ao carregar imagens:", error?.message);
    return []; 
  }

  const images_links = data.map((image) => {
    const { data: publicUrlData } = supabase
      .storage
      .from('afiliados')
      .getPublicUrl(`images/${slug}/${image.name}`);

    return {
      name: image.name,
      url: publicUrlData.publicUrl,
    };
  });
  return images_links;
}

