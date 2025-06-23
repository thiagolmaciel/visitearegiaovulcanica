import Image from 'next/image';
import { supabase } from '../../../utils/supabaseClient';

const ImageTest = async () => {
  const { data, error } = await supabase
    .storage
    .from('afiliados')
    .list('images/tradicafe', {
      limit: 100,
      offset: 0,
      sortBy: { column: 'name', order: 'asc' },
    });

  if (error || !data) {
    return <p>Erro ao carregar imagens.</p>;
  }

  const images_links = data.map((image) => {
    const { data: publicUrlData } = supabase
      .storage
      .from('afiliados')
      .getPublicUrl(`images/tradicafe/${image.name}`);

    return {
      name: image.name,
      url: publicUrlData.publicUrl,
    };
  });
  console.log(images_links);
  return (
    <div className="grid grid-cols-2 gap-4">
      {images_links.map((item) => (
        <>        <Image
          key={item.name}
          src={item.url}
          alt={item.name}
          height={400}
          width={400}
          unoptimized
        />
        <p>{item.url}</p>
        </>

      ))}
      <Image
          src='https://kdwpecddwtaczhoorylb.supabase.co/storage/v1/object/public/afiliados/images/tradicafe/tradicafe-1.jpeg'
          alt=''
          height={40}
          width={40}

        />
    </div>
    
  );
};

export default ImageTest;
