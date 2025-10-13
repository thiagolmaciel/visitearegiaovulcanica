import Image from "next/image";
import { Metadata } from "next";

import { fetchAllMembers, fetchMembersByCityId } from "@/service/memberServices";
import { getAllServices } from "@/service/servicesServices";
import { getImagesByID } from "@/service/imagesServices";
import { Service } from "@/model/Service";
import Carousel from "@/components/main/carousel";
import ServiceTagCarousel from "@/components/main/service-tag-carousel";

import MainPageSearch from "@/components/main/main-page-search";

export const metadata: Metadata = {
  title: "VisiteRV - Explore a Região Vulcânica",
  description: "Descubra lugares incríveis na Região Vulcânica de Poços de Caldas e Andradas",
  openGraph: {
    title: "VisiteRV - Explore a Região Vulcânica",
    description: "Descubra lugares incríveis na Região Vulcânica de Poços de Caldas e Andradas",
    images: [
      {
        url: "/regiao-vulcanica.jpg",
        width: 1200,
        height: 630,
        alt: "Região Vulcânica",
      },
    ],
  },
};

export default async function Home() {
  const allMembers = await fetchAllMembers();
  const pdcMembers = await fetchMembersByCityId('600f448c-da0f-49cf-8190-994630aab331');
  const andMembers = await fetchMembersByCityId('f1f58689-b3b2-461b-9da0-300d6d72b94b');
  const services: Service[] = await getAllServices() || [];

  // Get images from the first few members for preloading
  const preloadImageUrls: string[] = [];
  const membersToPreload = [...(allMembers || []), ...(pdcMembers || []), ...(andMembers || [])].slice(0, 6);
  
  for (const member of membersToPreload) {
    try {
      const images = await getImagesByID(member.id);
      if (images.length > 0) {
        preloadImageUrls.push(images[0].url);
      }
    } catch (error) {
      console.log('Error preloading images for member:', member.id);
    }
  }

  return (
    <div role='main' className="flex flex-col items-center">
      {/* Hero Section */}
      <div className="relative w-screen h-[27rem] sm:h-[45rem] overflow-hidden">
        <Image
          src="/regiao-vulcanica.jpg"
          alt="Região Vulcânica"
          fill
          className="object-cover z-10"
          priority
          sizes="100vw"
          quality={85}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/80 z-10"></div>
        <MainPageSearch />
      </div>
      
      {/* Main Content */}
      <div className="flex flex-col items-center justify-start w-full max-w-[100vw] sm:max-w-[95rem] mx-auto px-4 sm:px-16 py-4 sm:py-8 gap-4 min-h-[28rem] bg-[#fff] rounded-2xl sm:-translate-y-[5rem] z-[999] shadow-lg overflow-clip">
        <div role="category-selector" className="flex w-full">
          <ul className="flex items-center justify-center w-full">
            <ServiceTagCarousel services={services}/>
          </ul>
        </div>
        <div role="suggestion" className="mt-2 flex flex-col gap-8 w-full">
          <div className="flex flex-col w-full">
            <p className='text-3xl font-bold'>Explore</p>
            <div className="mt-2 flex flex-row gap-10 w-full">
              <Carousel title="Nossos afiliados" members={allMembers || []}></Carousel>
            </div>
            <div className="mt-8 flex flex-row gap-10 w-full">
              <Carousel title="Em Poços de Caldas" members={pdcMembers || []}></Carousel>
            </div>
            <div className="mt-8 flex flex-row gap-10 w-full">
              <Carousel title="Em Andradas" members={andMembers || []}></Carousel>
            </div>
          </div>
        </div>
        <div className="mt-3 mb-2"><a href="/search?query=*"><button className="btn-more shadow-lg">Explore mais destinos</button></a></div>
      </div>
    </div>
  );
}
