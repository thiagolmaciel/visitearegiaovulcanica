import Image from "next/image";
import { Metadata } from "next";

import { fetchAllMembers, fetchMembersByCityId } from "@/service/memberServices";
import { getAllServices } from "@/service/servicesServices";
import { getImagesByID } from "@/service/imagesServices";
import { getActiveEvents } from "@/service/eventServices";
import { Service } from "@/model/Service";
import MainPageSearch from "@/components/main/main-page-search";
import LoadingPage from "@/components/main/loading-page";
import FilteredMembersSection from "@/components/main/filtered-members-section";
import EventsCarousel from "@/components/main/events-carousel";
import HashFragmentHandler from "@/components/auth/hash-fragment-handler";

export default async function Home() {
  const allMembers = await fetchAllMembers();
  const pdcMembers = await fetchMembersByCityId('600f448c-da0f-49cf-8190-994630aab331');
  const andMembers = await fetchMembersByCityId('f1f58689-b3b2-461b-9da0-300d6d72b94b');
  const services: Service[] = await getAllServices() || [];
  const activeEvents = await getActiveEvents();

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
    <>
      <HashFragmentHandler />
      <div role='main' className="flex flex-col items-center">
        {/* Loading Page */}
        <LoadingPage />
        
        {/* Hero Section */}
        <div className="relative w-screen h-[27rem] sm:h-[45rem] overflow-hidden">
          <Image
            src="/regiao-vulcanica.jpg"
            alt="Região Vulcânica"
            fill
            className="object-cover z-10 select-none pointer-events-none"
            priority
            sizes="100vw"
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/80 z-10"></div>
          <MainPageSearch />
        </div>
        
        {/* Events Section - Separada */}
        {activeEvents.length > 0 && (
          <div className="flex flex-col items-center justify-start w-full max-w-[100vw] sm:max-w-[90vw] lg:max-w-[90vw] lg:w-[95rem] mx-auto lg:mx-2 bg-[#fff] rounded-2xl sm:-translate-y-[5rem] z-[999] shadow-lg overflow-clip mb-8">
            <EventsCarousel events={activeEvents} title="Próximos Eventos" />
          </div>
        )}
        
        {/* Main Content - Locais */}
        <div className="flex flex-col items-center justify-start w-full max-w-[100vw] sm:max-w-[90vw] lg:max-w-[90vw] lg:w-[95rem] mx-auto lg:mx-2  px-4 sm:px-16 py-4 sm:py-8 gap-4 min-h-[28rem] bg-[#fff] rounded-2xl sm:-translate-y-[5rem] z-[999] shadow-lg overflow-clip">
          <FilteredMembersSection 
            services={services}
            allMembers={allMembers}
            pdcMembers={pdcMembers}
            andMembers={andMembers}
          />
          <div className="mt-3 mb-2"><a href="/busca?query=*"><button className="btn-more shadow-lg">Explore mais destinos</button></a></div>
        </div>
      </div>
    </>
  );
}
