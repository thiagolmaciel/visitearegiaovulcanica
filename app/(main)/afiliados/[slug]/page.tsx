import { IoShareSocial } from 'react-icons/io5';
import { getMemberServices, fetchAllMembers } from '@/service/memberServices';
import { FaCircle, FaDotCircle, FaWhatsapp } from 'react-icons/fa';
import { getImages } from '@/service/imagesServices';
import { Service } from '@/model/Service';
import { getCityByID } from '@/service/locationServices';
import { abrevToName } from '@/lib/textFunctions';
import { createClient } from '@/lib/supabase/client';
import DesktopMainImages from '@/components/main/desktop-main-images';
import ServiceTag from '@/components/main/service-tag';
import ContactArea from '@/components/main/contact-area';
import MapComponent from '@/components/main/map-component';
import Carousel from '@/components/main/carousel';
import ExploreButton from '@/components/main/explore-button';

interface MemberPageProps {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function MemberPage({ params }: MemberPageProps) {
  const supabase = createClient()
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
  const city = await getCityByID(member.id);
  const allMembers = await fetchAllMembers();

  if (allMembers) {
    allMembers.sort(() => Math.random() - 0.5)
  }


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
        <DesktopMainImages member_id={member.id as string}></DesktopMainImages>
        <div className='flex flex-col gap-2 sm:flex-row sm:justify-between items-center '>
          <div>
            <p className='flex items-center text-center text-2xl font-bold'>{member.name} {member.title ? ` - ${member.title}` : ''}</p>
            {city && (
              <p className='text-[#636363] text-center sm:text-left '>{city.name} - {abrevToName(city.state_id)}</p>
            )}
          </div>
          <a href={`https://wa.me/+55${member.whatsapp}`} target="_blank" role='whatsapp' className='translate-0 flex items-center gap-4 w-full sm:w-[20rem] px-2 py-2 text-xl rounded-xl sm:rounded-full text-white font-bold bg-[var(--main-color)] justify-center shadow-md hover:-translate-y-1 transition-all ease-in duration-100'>
            <p>Enviar Mensagem</p> <FaWhatsapp />
          </a>
        </div>
      </div>
      <div className='hline' />
      <div role='content' className='flex flex-col sm:flex-row gap-1 w-[100vw] sm:gap-8 sm:w-[95rem]'>
        <div role='left-side' className='flex-3'>
          <div className="flex flex-col justify-start px-[1rem] sm:px-[4rem] py-[1rem] sm:py-[2rem] gap-4  bg-[#fff] sm:rounded-b-2xl shadow-lg">
            <div>
              <p className='text-xl font-bold mb-1'>Aqui você encontra...</p>

              <ul className='flex flex-row gap-8 my-8 flex-wrap'>
                {services.map((service: Service) => (
                  <li key={service.id}><ServiceTag {...service} /></li>
                ))}
              </ul>
            </div>
            <span>
              <p className='text-xl font-bold mb-1'>Conheça o local</p>
              <p className='text-justify leading-7'>{member.description}</p>
            </span>
          </div>
        </div>
        <div role='right-side' className='flex-2'>
          <div className="flex flex-col justify-start px-[1rem] sm:px-[4rem] py-[1rem] sm:py-[2rem] gap-4  bg-[#fff] sm:rounded-b-2xl shadow-lg">
            <ContactArea {...member} />
          </div>
        </div>
      </div>
        <MapComponent {...member} />
      <div className="flex flex-col justify-center items-center w-full sm:w-[95rem]  mt-5 mb-5 px-[1rem] sm:px-[4rem] py-[1rem] sm:py-[2rem] gap-4  bg-[#fff] rounded-2xl shadow-lg">
        <Carousel title="Veja mais" members={allMembers || []} />
        <ExploreButton />
      </div>
    </div>

  );
}
