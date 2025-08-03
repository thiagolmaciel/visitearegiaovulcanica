import { IoShareSocial } from 'react-icons/io5';
import Image from 'next/image';
import { getMemberServices } from '../../../../service/memberServices';
import ServiceTag from '../../../../components/ServiceTag/page';
import ContactArea from '../../../../components/ContactArea/page';
import { FaCircle, FaDotCircle, FaWhatsapp } from 'react-icons/fa';
import MapComponent from '../../../../components/MapComponent/page';
import { supabase } from '../../../../utils/supabaseClient';
import { headers } from 'next/headers';
import { getImages } from '../../../../service/imagesServices';
import { Service } from '../../../../model/Service';
import ImageCarousel from '../../../../components/ImageCarousel/page';
import { copyLink } from '../../../../utils/copyLink';
import { getCityByID } from '../../../../service/locationServices';
import { abrevToName } from '../../../../lib/textFunctions';

interface MemberPageProps {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function MemberPage({ params }: MemberPageProps) {
  const { slug } = await params;

  const { data: member, error: memberError } = await supabase
    .from('members')
    .select('*')
    .eq('slug', slug.trim())
    .single();

  if (memberError) {
    return <p>Erro</p>;
  }
  if (!member) {
    return <p>Não encontrado!</p>
  }
  const services = await getMemberServices(member.id);
  const images = await getImages(slug.trim())
  const city = await getCityByID(member.id);


  return (
    <div role='main' className="flex flex-col items-center ">
      <div className="flex flex-col justify-start w-[100vw] sm:w-[95rem] px-[1rem] sm:px-[4rem] py-[1rem] sm:py-[2rem] gap-4  mt-4 sm:mt-5 bg-[#fff] rounded-t-2xl shadow-lg">
        <div role="header" className="flex col items-center justify-between w-full">
          <p className='text-3xl font-bold'>{member.name}
          </p>
          <a href='' className='flex items-center gap-2 text-x'>
            <p className='hidden sm:visible'>Compartilhar </p>
            <IoShareSocial className='text-xl sm:text-x' />
          </a>
        </div>
        {images && images.length > 0 && (
          <>
            <div role="image_area" className='hidden sm:flex my-4 gap-1 sm:h-[40rem] w-full rounded-2xl overflow-clip'>
              {/* <div role='desktop-images' className='flex'> */}
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
              {/* </div> */}
              {/* <div role='mobile-images' className='block sm:hidden'>
      <ImageCarousel images={images} />
      <div className='flex gap-2 w-full items-center justify-center text-[#b7b7b7]'><FaCircle size={7}/><FaCircle size={7}/><FaCircle size={7}/></div>
    </div> */}
            </div>
            <div role='mobile-images' className='block sm:hidden'>
              <ImageCarousel images={images} />
              <div className='flex gap-2 w-full items-center justify-center text-[#b7b7b7]'><FaCircle size={7} /><FaCircle size={7} /><FaCircle size={7} /></div>
            </div>
          </>
        )}
        <div className='flex flex-col gap-2 sm:flex-row sm:justify-between items-center '>
          <div>
            <p className='flex items-center text-center text-2xl font-bold'>{member.name} {member.title ? ` - ${member.title}` : ''}</p>
            <p className='text-[#636363] text-center sm:text-left '>{city.name} - {abrevToName(city.state_id)}</p>
          </div>
          <a href={`https://wa.me/+55${member.whatsapp}`} target="_blank" role='whatsapp' className='translate-0 flex items-center gap-4 w-full sm:w-[20rem] px-2 py-2 text-xl rounded-xl sm:rounded-full text-white font-bold bg-[var(--main-color)] justify-center shadow-md hover:-translate-y-1 transition-all ease-in duration-100'>
            <p>Enviar Mensagem</p> <FaWhatsapp />
          </a>
        </div>
      </div>
      <div className='hline' />
      <div role='content' className='flex flex-col sm:flex-row gap-6 sm:gap-8 sm:w-[95rem]'>
        <div role='left-side' className='flex-3'>
          <div className="flex flex-col justify-start  px-[1rem] sm:px-[4rem] py-[1rem] sm:py-[2rem] gap-4  bg-[#fff] rounded-b-2xl shadow-lg">

            <div>
              <ul className='flex flex-row gap-8 mb-8 flex-wrap'>
                {services.map((service: Service) => (
                  <li key={service.id}><ServiceTag {...service} /></li>
                ))}
              </ul>
            </div>
            <span>
              <p className='text-xl font-bold mb-1'>Conheça o local</p>
              <p className='text-justify'>{member.description}</p>
            </span>
          </div>
        </div>
        <div role='right-side' className='flex-2'>
          <div className="flex flex-col justify-start px-[1rem] sm:px-[4rem] py-[1rem] sm:py-[2rem] gap-4  bg-[#fff] rounded-b-2xl shadow-lg">
            <ContactArea {...member} />
          </div>
        </div>

      </div>
      <div className="flex flex-col justify-start sm:w-[95rem] mt-5 mb-4 px-[1rem] sm:px-[4rem] py-[1rem] sm:py-[2rem] gap-4  bg-[#fff] rounded-2xl shadow-lg">
        <MapComponent {...member} />
      </div>
    </div>

  );
}
