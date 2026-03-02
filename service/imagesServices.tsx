import { getClient } from "./base-client";
import { sanitizeFileName } from "@/utils/stringUtils";
import { logError } from "@/lib/error-handler";

/**
 * Gets all images for a member
 * @param id - The member ID
 * @returns Array of image objects with name and URL
 */
export async function getImages(id: string) {
  const supabase = getClient();
  const { data, error } = await supabase
    .storage
    .from('members')
    .list(`images/${id}`, {
      limit: 100,
      offset: 0,
      sortBy: { column: 'name', order: 'desc' },
    });

  if (error || !data) {
    logError("getImages", error, { memberId: id });
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

/**
 * Gets all images for a member by ID (alias for getImages)
 * @param id - The member ID
 * @returns Array of image objects with name and URL
 */
export async function getImagesByID(id: string) {
  return getImages(id);
}

/**
 * Updates images for a member (deletes old ones and uploads new ones)
 * @param id - The member ID
 * @param files - Array of files to upload
 * @param imagesToDelete - Array of images to delete
 */
export async function updateImages(
  id: string | undefined,
  files: File[],
  imagesToDelete: { name: string; url: string | null }[]
) {
  if (!id) {
    throw new Error('Member ID is required');
  }

  const supabase = getClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) {
    logError("updateImages - auth", userError, { memberId: id });
    throw new Error("Usuário não autenticado! Abortando upload.");
  }

  // Delete old images
  for (const image of imagesToDelete) {
    const pathToDelete = `images/${id}/${image.name}`;
    const { error } = await supabase.storage.from('members').remove([pathToDelete]);
    if (error) {
      logError("updateImages - delete", error, { path: pathToDelete });
    }
  }

  // Upload new images
  for (const file of files) {
    const safeName = sanitizeFileName(file.name);
    const pathToUpload = `images/${id}/${safeName}`;

    const { error } = await supabase
      .storage
      .from('members')
      .upload(pathToUpload, file, { upsert: true });

    if (error) {
      logError("updateImages - upload", error, { path: pathToUpload });
      throw error;
  }
}
}

/**
 * Creates/upload images for a member
 * @param id - The member ID
 * @param files - Array of files to upload
 * @throws Error if upload fails
 */
export async function createImages(id: string, files: File[]) {
  const supabase = getClient();
  
  for (const file of files) {
    const safeName = sanitizeFileName(file.name);
    const pathToUpload = `images/${id}/${safeName}`;

    const { error } = await supabase
      .storage
      .from('members')
      .upload(pathToUpload, file, { upsert: true });

    if (error) {
      logError("createImages", error, { path: pathToUpload });
      throw error;
    }
  }
}