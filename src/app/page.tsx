import Image from "next/image";
import { FaBed, FaFish, FaHorse, FaMountain, FaSearch } from "react-icons/fa";
import { PiCoffeeBeanFill, PiFlowerTulipBold } from "react-icons/pi";
import CategoryItem from "../../components/CategoryItem/page";
import { GiBullHorns, GiFishingPole, GiFlowerHat, GiFlowers, GiSoccerBall } from "react-icons/gi";
import { LuGrape } from "react-icons/lu";
import { IoFootball } from "react-icons/io5";
import { HiUserGroup } from "react-icons/hi";
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";
import SuggestionItem from "../../components/SuggestionItem/page";
import SectionTitle from "../../components/SectionTitle/page";
import Carousel from "../../components/Carousel/page";
import SuggestionModel from "../../components/SuggestionModel/page";

export default function Home() {
  return (
    <div role='main' className="flex flex-col items-center ">
      <div className="flex items-center justify-center relative w-full h-[45rem] overflow-clip">
        <div className="absolute top-0 h-[45rem] inset-0 bg-gradient-to-b from-transparent to-black z-10 selection-none"></div>
        <Image src='/regiao-vulcanica.jpg' alt='' fill className="object-cover selection-none" />
        <div className="flex items-center justify-center flex-col gap-2 relative z-10 text-white selection-none">
          <p className="font-bold text-2xl starting:mb-0 starting:opacity-0 mb-4 opacity-100 transition-all ease-in duration-300 selection-none">Visite e desfrute da Região Vulcânica!</p>
          <div className="flex items-center h-15 text-black bg-white rounded-full">
            <input required type="text" placeholder="Onde você deseja ir?" className="flex py-0 w-auto items-center text-center justify-center grow h-full hover:bg-gray-200 rounded-full focus:outline-none focus:w-[18rem] focus:text-left focus:px-4 transition-all duration-600  ease-in-out" />
            <input required type="text" placeholder="Quando?" className="flex py-0 w-auto items-center text-center justify-center grow h-full hover:bg-gray-200 rounded-full focus:outline-none focus:w-[18rem] focus:text-left focus:px-4 transition-all duration-600 ease-in-out" />
            <input required type="text" placeholder="Quantos vão?" className="flex py-0 w-auto items-center text-center justify-center grow h-full hover:bg-gray-200 rounded-full focus:outline-none focus:w-[18rem] focus:text-left focus:px-4 transition-all duration-600  ease-in-out" />
            <button type="submit" className="flex items-center justify-center px-3 h-full text-white rounded-r-full bg-[var(--main-color)] active:bg-[#3e523d] hover:px-5 transition-all ease-in duration:300 hover:cursor-pointer">
              <FaSearch />
            </button>
          </div>
        </div>
      </div>
      {/*Show Places*/}
      <div className="flex flex-col items-center justify-start sm:w-[95rem] py-4 gap-4 min-h-[35rem] bg-[#fff] rounded-2xl -translate-y-[5rem] z-11 shadow-lg">
        <div role="category-selector" className="flex justify-center w-[93rem]  h-max">
          <ul className="flex justify-between gap-5">
            <li className="flex items-center justify-center gap-1 text-md text-[#cacaca] font-semibold bg-[#eeeeee] py-2 px-3 rounded-full shadow-md hover:-translate-y-0.5 transition-all ease-in-out duration-100 cursor-pointer active:bg-[#f7f7f7]"><FaCircleChevronLeft /></li>
            <CategoryItem icon={PiCoffeeBeanFill} name='Café' />
            <CategoryItem icon={GiBullHorns} name='Agropecuária' />
            <CategoryItem icon={LuGrape} name='Vinícola' />
            <CategoryItem icon={FaMountain} name='Montanha' />
            <CategoryItem icon={FaFish} name='Pesca' />
            <CategoryItem icon={FaHorse} name='Equitação  ' />
            <CategoryItem icon={FaBed} name='Hospedagem' />
            <CategoryItem icon={PiFlowerTulipBold} name='Floricultura' />
            <CategoryItem icon={IoFootball} name='Esportes' />
            <CategoryItem icon={HiUserGroup} name='Experiências' />
            <li className="flex items-center justify-center gap-1 text-md text-[#cacaca] font-semibold bg-[#eeeeee] py-2 px-3 rounded-full shadow-md hover:-translate-y-0.5 transition-all ease-in-out duration-100 cursor-pointer active:bg-[#f7f7f7]"><FaCircleChevronRight /></li>
          </ul>
        </div>
        <div role="suggestion" className="mt-8 flex flex-col gap-8 w-[90rem]">
          <div className="flex flex-col">
            <SectionTitle title="Teste Exibição" />
            <div className="mt-2 flex flex-row gap-10">
              <SuggestionItem title="Fazenda" star="4.5" />
              <SuggestionItem title="Fazenda" star="4.5" />
              <SuggestionItem title="Fazenda" star="4.5" />
              <SuggestionItem title="Fazenda" star="4.5" />
            </div>
          </div>
          <div>
            <SectionTitle title="Visitas em Águas da Prata" />
            <div className="mt-2 flex flex-row gap-10">
              <SuggestionItem title="Fazenda" star="4.5" />
              <SuggestionItem title="Fazenda" star="4.5" />
              <SuggestionItem title="Fazenda" star="4.5" />
              <SuggestionItem title="Fazenda" star="4.5" />
            </div>
          </div>
          <div>
            <SectionTitle title="Visitas em Poços de Caldas" />
            <div className="mt-2 flex flex-row gap-10">
              <SuggestionItem title="Fazenda" star="4.5" />
              <SuggestionItem title="Fazenda" star="4.5" />
              <SuggestionItem title="Fazenda" star="4.5" />
              <SuggestionItem title="Fazenda" star="4.5" />
            </div>
          </div>
        </div>
        <div>
          <SectionTitle title="Visitas em Águas da Prata" />
          <div className="mt-2 flex flex-row gap-10">
            <Carousel></Carousel>
          </div>
        </div>
        <div>
         <SuggestionModel></SuggestionModel>
        </div>
      </div>
    </div>
  );
}
