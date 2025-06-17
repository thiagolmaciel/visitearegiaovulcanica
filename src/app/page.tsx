import Image from "next/image";
import { FaBed, FaHorse, FaMountain, FaSearch } from "react-icons/fa";
import { PiBeerBottleBold, PiCoffeeBeanFill, PiFlowerTulipBold } from "react-icons/pi";
import CategoryItem from "../../components/CategoryItem/page";
import { LuCandy, LuGrape } from "react-icons/lu";
import { HiUserGroup } from "react-icons/hi";
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";
import Carousel from "../../components/Carousel/page";
import { supabase } from "../../utils/supabaseClient";
import { BiSolidCheese, BiSolidCoffee } from "react-icons/bi";

export default async function Home() {
  const { data: members, error } = await supabase.from('members').select('*');
  console.log(error)

  return (
    <div role='main' className="flex flex-col items-center ">
      <div className="flex items-center justify-center relative w-full h-[45rem] overflow-clip">
        <div className="absolute top-0 h-[45rem] inset-0 bg-gradient-to-b from-transparent to-black z-10 selection-none"></div>
        <Image src='/regiao-vulcanica.jpg' alt='' fill className="object-cover selection-none" />
        <div className="flex items-center justify-center flex-col gap-2 relative z-10 text-white selection-none">
          <p className="font-bold text-2xl starting:mb-0 starting:opacity-0 mb-4 opacity-100 transition-all ease-in duration-300 selection-none">Visite e desfrute da Região Vulcânica!</p>
          <div className="flex items-center h-15 w-[35rem] hover:w-[40rem] transition-all ease-in duration-600 text-black bg-white rounded-full">
            <input required type="text" placeholder="Onde você deseja ir?" className="flex py-0 w-auto items-center text-left px-4 justify-center grow h-full hover:bg-gray-200 rounded-full focus:outline-none focus:px-5 transition-all duration-600  ease-in-out" />
                        <button type="submit" className="flex items-center justify-center px-3 h-full text-white rounded-r-full bg-[var(--main-color)] active:bg-[#3e523d] hover:px-5 transition-all ease-in duration:300 hover:cursor-pointer">
              <FaSearch />
            </button>
          </div>
        </div>
      </div>  
      {/*Show Places*/}
      <div className="flex flex-col items-center justify-start sm:w-[95rem] px-[5rem] py-[2rem] gap-4 min-h-[28rem] bg-[#fff] rounded-2xl -translate-y-[5rem] z-11 shadow-lg">
        <div role="category-selector" className="flex">
          <ul className="flex justify-between min-w-[90rem]">
            <li className="flex items-center justify-center gap-1 text-md text-[#cacaca] font-semibold bg-[#eeeeee] py-2 px-3 rounded-full shadow-md hover:-translate-y-0.5 transition-all ease-in-out duration-100 cursor-pointer active:bg-[#f7f7f7]"><FaCircleChevronLeft /></li>
            <CategoryItem icon={PiCoffeeBeanFill} name='Café' />
            <CategoryItem icon={BiSolidCoffee} name='Cafeteria' />
            <CategoryItem icon={LuGrape} name='Enoturismo' />
            <CategoryItem icon={FaMountain} name='Visita' />
            <CategoryItem icon={FaHorse} name='Hipismo  ' />
            <CategoryItem icon={FaBed} name='Pousada' />
            <CategoryItem icon={PiBeerBottleBold} name='Cachaça' />
            <CategoryItem icon={LuCandy} name='Doces' />
            <CategoryItem icon={BiSolidCheese} name='Queijaria' />
            <CategoryItem icon={HiUserGroup} name='Turismo' />
            <li className="flex items-center justify-center gap-1 text-md text-[#cacaca] font-semibold bg-[#eeeeee] py-2 px-3 rounded-full shadow-md hover:-translate-y-0.5 transition-all ease-in-out duration-100 cursor-pointer active:bg-[#f7f7f7]"><FaCircleChevronRight /></li>
          </ul>
        </div>

        <div role="suggestion" className="mt-4 flex flex-col gap-8">
          <div className="flex flex-col">
           
            <div className="mt-2 flex flex-row gap-10">
            <Carousel title="Explore" members={members || []}></Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
