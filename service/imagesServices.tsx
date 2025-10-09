import { createClient } from "@/lib/supabase/client";
import { sanitizeFileName } from "@/utils/stringUtils";

const supabase = createClient();

export async function getImages(id: string) {
  const { data, error } = await supabase
    .storage
    .from('members')
    .list(`images/${id}`, {
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
      .from('members')
      .getPublicUrl(`images/${id}/${image.name}`);

    return {
      name: image.name,
      url: publicUrlData.publicUrl,
    };
  });
  return images_links;
}

export async function getImagesByID(id: string) {
  const { data, error } = await supabase
    .storage
    .from('members')
    .list(`images/${id}`, {
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
      .from('members')
      .getPublicUrl(`images/${id}/${image.name}`);

    return {
      name: image.name,
      url: publicUrlData.publicUrl,
    };
  });
  return images_links;
}

export async function updateImages(
  id: string,
  files: File[],
  imagesToDelete: { name: string; url: string | null }[]
) {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) {
    console.error("Usuário não autenticado! Abortando upload.", userError?.message);
    return;
  }
  const userId = userData.user.id;
  console.log("Usuário autenticado:", userId);

  for (const image of imagesToDelete) {
    const pathToDelete = `images/${id}/${image.name}`;
    const { error } = await supabase.storage.from('members').remove([pathToDelete]);
    if (error) console.error("Erro ao deletar imagem:", error.message);
    else console.log("Imagem deletada:", pathToDelete);
  }

  for (const file of files) {
    const safeName = sanitizeFileName(file.name);
    const pathToUpload = `images/${id}/${safeName}`;
    console.log("Uploading file to:", pathToUpload);

    const { data, error } = await supabase
      .storage
      .from('members')
      .upload(pathToUpload, file, { upsert: true });

    if (error) console.error("Erro ao fazer upload da imagem:", error.message);
    else console.log("Upload concluído com sucesso:", data);
  }
}
