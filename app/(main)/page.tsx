import Image from "next/image";

import { fetchAllMembers, fetchMembersByCityId } from "@/service/memberServices";
import { getAllServices } from "@/service/servicesServices";
import { Service } from "@/model/Service";
import Carousel from "@/components/main/carousel";
import ServiceTagCarousel from "@/components/main/service-tag-carousel";

import MainPageSearch from "@/components/main/main-page-search";

export default async function Home() {
  const allMembers = await fetchAllMembers();
  const pdcMembers = await fetchMembersByCityId(1);
  const andMembers = await fetchMembersByCityId(3);
  const services: Service[] = await getAllServices() || [];

  return (
    <div role='main' className="flex flex-col items-center ">
    <div className="relative w-screen h-[27rem] sm:h-[45rem] overflow-hidden">
  <Image
    src="/regiao-vulcanica.jpg"
    alt="Região Vulcânica"
    fill
    className="object-cover z-10"
  />
  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black z-10"></div>
  <MainPageSearch />
</div>
      <div className="flex flex-col items-center justify-start w-[100vw] sm:w-[95rem] sm:max-w-screen px-[5rem] py-[2rem] gap-4 min-h-[28rem] bg-[#fff] rounded-2xl sm:-translate-y-[5rem] z-[999] shadow-lg overflow-clip">
        <div role="category-selector" className="flex ">
          <ul className="flex items-center justify-center sm:mx-0 max-w-[100vw] sm:max-w-[90rem] ">
            <ServiceTagCarousel services={services}/>
          </ul>
        </div>
        <div role="suggestion" className="mt-2 flex flex-col gap-8">
          <div className="flex flex-col">
          <p className='text-3xl font-bold'>Explore</p>
            <div className="mt-2 flex flex-row gap-10">
            <Carousel title="Nossos afiliados" members={allMembers || []}></Carousel>
            </div>
            <div className="mt-8 flex flex-row gap-10">
            <Carousel title="Em Poços de Caldas" members={pdcMembers || []}></Carousel>
            </div>
            <div className="mt-8 flex flex-row gap-10">
            <Carousel title="Em Andradas" members={andMembers || []}></Carousel>
            </div>
          </div>
          
        </div>
        <div className="mt-3 mb-2"><a href="/search?query=*"><button className="btn-more shadow-lg">Explore mais destinos</button></a></div>
      </div>
    </div>
  );
}
