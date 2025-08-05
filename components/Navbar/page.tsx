'use client'
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MdMenu } from "react-icons/md";
import { TbWorld } from "react-icons/tb";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  return (
    <div className="flex items-center px-4 justify-center h-[6rem] bg-[var(--main-color)] text-white">
        <div className="flex items-center justify-between  w-[95rem]">
            <div>
            <Link href="/"><Image src='/logo.png' alt='' width={120} height={20}/></Link>
            </div>
            <div>
                <ul className="flex items-center gap-3">
                    <div className="relative">
                      <li className="flex items-center"><div onClick={toggleDropdown} className="shadow-none hover:shadow-sm transition-all ease-in duration-300 bg-[#3e523d] p-3 rounded-full"><TbWorld size={25}/></div></li>
                      {isOpen && (
                        <div className="absolute left-0 flex sm:w-[13rem] mt-1 -translate-x-7 z-100 border-1   bg-[var(--main-color)] border-[#3e523d]">
                        <ul className="h-full w-full">
                          <li className="px-3 py-1 font-bold bg-[#3e523d]">Português - PT-BR</li>
                          <li className="px-3 py-1 hover:bg-[#4b624b]">English - ENG</li>
                        </ul>
                        </div>
                      )}
                    </div>
                    <li className="flex items-center"><div className="shadow-none hover:shadow-sm transition-all ease-in duration-300 bg-[#3e523d] active:bg-[#354635] p-3 rounded-full"><MdMenu size={25}/></div></li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Navbar;
