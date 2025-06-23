import { IoShareSocial } from 'react-icons/io5';
import Image from 'next/image';
import { getMemberServices, Service } from '../../../../service/memberServices';
import ServiceTag from '../../../../components/ServiceTag/page';
import ContactArea from '../../../../components/ContactArea/page';
import { FaWhatsapp } from 'react-icons/fa';
import MapComponent from '../../../../components/MapComponent/page';
import { supabase } from '../../../../utils/supabaseClient';
import { headers } from 'next/headers';
import { getImages } from '../../../../service/imagesServices';

interface MemberPageProps {
  params: Promise<{ slug: string }>;
}

export default async function MemberPage({ params }: MemberPageProps) {
  const { slug } = await params;

  const { data: member, error: memberError } = await supabase
    .from('members')
    .select('*')
    .eq('slug', slug.trim())
    .single();

  if (memberError ) {
    return <p>Erro</p>;
  }
  if (!member){
    return <p>Não encontrado!</p>
  }
  const services = await getMemberServices(member.id);
  const images = await getImages(slug.trim())

  return (
    <div role='main' className="flex flex-col items-center ">
      <div className="flex flex-col justify-start sm:w-[95rem] px-[4rem] py-[2rem] gap-4 min-h-[50rem] my-5 bg-[#fff] rounded-2xl shadow-lg">
        <div role="header" className="flex col items-center justify-between w-full">
          <p className='text-3xl font-bold'>{member.name}
          </p>
          <a href="#" className='flex items-center gap-2 text-x'>
            <p>Compartilhar </p>
            <IoShareSocial />
          </a>
        </div>
        {images && images.length > 0 && (
  <div role="image_area" className='flex my-4 gap-1 h-[40rem] w-full rounded-2xl overflow-clip'>
    <div role="image_box" className='relative overflow-clip flex-1'>
      <Image
        src={images[0].url}
        alt=""
        fill
        className='object-cover scale-100 hover:scale-110 transition-all ease-in-out duration-250'
      />
    </div>
    <div className='flex-1 grid grid-cols-2 grid-rows-2 gap-1 '>
    {[1, 2, 3, 4].map((idx) => (
        <div key={idx} role="image_box" className='relative overflow-clip'>
          {images[idx]?.url ? (
            <Image
              src={images[idx].url}
              alt=""
              fill
              className='object-cover scale-100 hover:scale-110 transition-all ease-in-out duration-250'
            />
          ) : (
            <div className="bg-gray-200 w-full h-full" />
          )}
        </div>
      ))}
    </div>
  </div>
)}
        <div className='flex justify-between items-center '>
          <div>
            <p className='flex items-center text-center text-2xl font-bold'>{member.name} - {member.title}</p>
          </div>
          <a href={`https://wa.me/+55${member.whatsapp}`} target="_blank" role='whatsapp' className='translate-0 flex items-center gap-4 w-[20rem] px-2 py-2 text-xl rounded-full text-white font-bold bg-[var(--main-color)] justify-center shadow-md hover:translate-1 transition-all ease-in duration-100'>
            <p>Enviar Mensagem</p> <FaWhatsapp />
          </a>
        </div>
        <div className='hline' />
        <div role='content' className='flex gap-20'>
          <div role='left-side' className='flex-3'>
            <div>
              <ul className='flex flex-row gap-4'>
              {services.map((service: Service) => (
                  <li key={service.id}><ServiceTag {...service} /></li>
                ))}
              </ul>

            </div>
            <p className='text-justify'>{member.description}</p>
          </div>
          <div role='right-side' className='flex-2'>
            <ContactArea {...member} />
            <div className="hline mt-4" />
            <MapComponent {...member} />
          </div>

        </div>
      </div>
    </div>
  );
}
