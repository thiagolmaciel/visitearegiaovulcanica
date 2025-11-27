import { getMemberServices, fetchAllMembers } from '@/service/memberServices';
import { FaCircle, FaDotCircle, FaWhatsapp } from 'react-icons/fa';
import { getImages, getImagesByID } from '@/service/imagesServices';
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
import ShareButton from '@/components/main/share-button';
import { Metadata } from 'next';

interface MemberPageProps {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

const defaultUrl = process.env.NEXT_PUBLIC_SITE_URL 
  || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export async function generateMetadata({ params }: MemberPageProps): Promise<Metadata> {
  const supabase = createClient();
  const { slug } = await params;

  const { data: member } = await supabase
    .from('members')
    .select('*')
    .eq('slug', slug.trim())
    .single();

  if (!member) {
    return {
      title: 'Afiliado não encontrado',
    };
  }

  const city = await getCityByID(member.id);
  const images = await getImagesByID(member.id);
  const firstImageRaw = images.length > 0 ? images[0].url : '/regiao-vulcanica.jpg';
  // Ensure image URL is absolute (Supabase URLs are already absolute, local images need base URL)
  const firstImage = firstImageRaw.startsWith('http://') || firstImageRaw.startsWith('https://')
    ? firstImageRaw 
    : `${defaultUrl}${firstImageRaw.startsWith('/') ? firstImageRaw : '/' + firstImageRaw}`;
  const location = city ? `${city.name} - ${abrevToName(city.state_id)}` : '';
  const description = member.description 
    ? `${member.description.substring(0, 150)}${member.description.length > 150 ? '...' : ''}`
    : `Conheça ${member.name}${location ? ` em ${location}` : ''}`;
  const title = `${member.name}${member.title ? ` - ${member.title}` : ''}${location ? ` | ${location}` : ''}`;

  return {
    metadataBase: new URL(defaultUrl),
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${defaultUrl}/afiliados/${slug}`,
      siteName: 'Visite a Região Vulcânica',
      images: [
        {
          url: firstImage,
          width: 1200,
          height: 630,
          alt: member.name,
        },
      ],
      locale: 'pt_BR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [firstImage],
    },
  };
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
  const images = await getImagesByID(member.id);
  const firstImage = images.length > 0 ? images[0].url : '/regiao-vulcanica.jpg';
  const location = city ? `${city.name} - ${abrevToName(city.state_id)}` : '';
  const shareTitle = `${member.name}${member.title ? ` - ${member.title}` : ''}${location ? ` | ${location}` : ''}`;
  const shareDescription = member.description 
    ? `${member.description.substring(0, 200)}${member.description.length > 200 ? '...' : ''}`
    : `Conheça ${member.name}${location ? ` em ${location}` : ''}`;

  if (allMembers) {
    allMembers.sort(() => Math.random() - 0.5)
  }


  return (
    <div role='main' className="flex flex-col items-center">
      <div className="flex flex-col justify-start w-full max-w-[100vw] sm:max-w-[90vw] sm:mx-2 lg:w-[95rem] lg:max-w-[90vw] lg:mx-2 mx-auto lg:mx-2  px-4 sm:px-8 lg:px-16 py-4 sm:py-8 gap-4 mt-4 sm:mt-5 bg-[#fff] rounded-t-2xl shadow-lg">
        <div role="header" className="flex flex-row items-center justify-between w-full gap-4">
          <p className='text-2xl sm:text-3xl lg:text-4xl font-bold break-words flex-1'>{member.name}</p>
          <ShareButton 
            title={shareTitle}
            description={shareDescription}
            image={firstImage}
          />
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
      <div role='content' className='flex flex-col sm:flex-row gap-4 sm:gap-8 w-full max-w-[100vw] sm:max-w-[90vw] lg:max-w-[90vw] lg:w-[95rem] mx-auto lg:mx-2'>
        <div role='left-side' className='flex-1 sm:flex-[3]'>
          <div className="flex flex-col justify-start px-4 sm:px-16 py-4 sm:py-8 gap-4 bg-[#fff] sm:rounded-b-2xl shadow-lg">
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
        <div role='right-side' className='flex-1 sm:flex-[2]'>
          <div className="flex flex-col justify-start px-4 sm:px-16 py-4 sm:py-8 gap-4 bg-[#fff] sm:rounded-b-2xl shadow-lg">
            <ContactArea {...member} />
          </div>
        </div>
      </div>
        <MapComponent {...member} />
      <div className="flex flex-col justify-center items-center w-full max-w-[100vw] sm:max-w-[90vw] lg:max-w-[90vw] lg:w-[95rem] mx-auto lg:mx-2 mt-5 mb-5 px-4 sm:px-16 py-4 sm:py-8 gap-4 bg-[#fff] rounded-2xl shadow-lg">
        <Carousel title="Veja mais" members={allMembers || []} />
        <ExploreButton />
      </div>
    </div>

  );
}
