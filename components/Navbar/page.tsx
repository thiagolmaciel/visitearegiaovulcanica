import Image from "next/image";
import Link from "next/link";
import { MdMenu } from "react-icons/md";
import { TbWorld } from "react-icons/tb";

const Navbar = () => {
  return (
    <div className="flex items-center px-4 justify-center h-[6rem] bg-[var(--main-color)] text-white">
        <div className="flex items-center justify-between  w-[95rem]">
            <div>
            <Link href="/"><Image src='/logo.png' alt='' width={120} height={20}/></Link>
            </div>
            <div>
                <ul className="flex items-center gap-3">
                    <li className="flex items-center"><a href="/" className="shadow-none hover:shadow-sm transition-all ease-in duration-300 bg-[#3e523d] active  :bg-[#253025] p-3 rounded-full"><TbWorld size={25}/></a></li>
                    <li className="flex items-center"><a href="/" className="shadow-none hover:shadow-sm transition-all ease-in duration-300 bg-[#3e523d] active:bg-[#354635] p-3 rounded-full"><MdMenu size={25}/></a></li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Navbar;
