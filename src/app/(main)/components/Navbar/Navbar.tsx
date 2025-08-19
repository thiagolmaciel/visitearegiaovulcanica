'use client'
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdMenu } from "react-icons/md";
import { TbWorld } from "react-icons/tb";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  return (
    <div className="flex items-center px-4 justify-center h-[6rem] bg-[var(--main-color)] text-white">
      <div className="flex items-center justify-between  w-[95rem]">
        <div>
          <Link href="/"><Image src='/logo.png' alt='' width={120} height={20} /></Link>
        </div>
        <div>
          <ul className="flex items-center gap-3">
            <li className="flex items-center">
              <div className="dropdown dropdown-center">
                <div role="button" tabIndex={0} onClick={toggleDropdown} className="shadow-none hover:shadow-sm transition-all ease-in duration-300 bg-[#3e523d] p-3 rounded-full"><TbWorld size={25} /></div>
                <ul className="dropdown-content mt-2 menu bg-[#3e523d] rounded-box z-1 w-35 p-2  shadow-sm">
                <li className="flex flex-row items-center ">
                  <a href="" className="active">Português - BR</a>
                </li>
                <li>
                  <a href="">English - USA</a>
                </li>
              </ul>
              </div>
            </li>
            <li className="flex items-center">
            <div className="dropdown dropdown-center">
              <div role="button" tabIndex={0} className="shadow-none hover:shadow-sm transition-all ease-in duration-300 bg-[#3e523d] active:bg-[#354635] p-3 rounded-full"><MdMenu size={25} /></div>
              <ul className="dropdown-content mt-2 menu bg-[#3e523d] rounded-box z-1 w-35 p-2 shadow-sm">
                <li className="flex flex-row items-center ">
                  <a href="/login">Acessar conta</a>
                </li>
                <li>
                  <a href="">Suporte</a>
                </li>
              </ul>
            </div>
            </li>

          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar;
