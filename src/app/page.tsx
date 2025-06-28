import Image from "next/image";
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";
import Carousel from "../../components/Carousel/page";
import SearchForm from "../../components/SearchForm/page";
import { Suspense } from "react";
import { fetchAllMembers, fetchMembersByCityId } from "../../service/memberServices";
import ServiceTagCarousel from "../../components/ServiceTagCarousel/page";
import { getAllServices } from "../../service/servicesServices";
import { Service } from "../../model/Service";

export default async function Home() {
  const allMembers = await fetchAllMembers();
  const pdcMembers = await fetchMembersByCityId(1);
  const andMembers = await fetchMembersByCityId(3);
  const services: Service[] = await getAllServices() || [];

  return (
    <div role='main' className="flex flex-col items-center ">
      <div className="flex items-center justify-center relative w-full h-[27rem] sm:h-[45rem] overflow-clip">
        <div className="absolute top-0 h-[27rem] sm:h-[45rem] inset-0 bg-gradient-to-b from-transparent to-black z-10 selection-none"></div>
        <Image src='/regiao-vulcanica.jpg' alt='' fill className="object-cover selection-none" />
        <div className="flex items-center justify-center flex-col gap-2 relative z-10 text-white selection-none">
          <p className="font-bold text-2xl text-center starting:mb-0 mx-4 sm:mx-0 starting:opacity-0 mb-4 opacity-100 transition-all ease-in duration-300 selection-none">Visite e desfrute da Região Vulcânica!</p>
          <Suspense fallback={<p>...</p>}>
            <SearchForm />
          </Suspense>
        </div>
      </div>  
      {/*Show Places*/}
      <div className="flex flex-col items-center justify-start w-[100vw] sm:w-[95rem] px-[5rem] py-[2rem] gap-4 min-h-[28rem] bg-[#fff] rounded-2xl sm:-translate-y-[5rem] z-11 shadow-lg overflow-clip">
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
