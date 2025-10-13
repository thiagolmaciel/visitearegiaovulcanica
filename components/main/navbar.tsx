'use client'
import Image from "next/image";
import Link from "next/link";
import { TbWorld } from "react-icons/tb";
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenu } from "../ui/dropdown-menu";
import { MdMenu, MdClose } from "react-icons/md";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [logged, setLogged] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getUser();
      setLogged(!error && !!data?.user);
      setIsLoading(false);
    };
    checkAuth();
  }, []);
  return (
    <div className="flex items-center px-4 sm:px-16 justify-center h-[6rem] bg-[var(--main-color)] text-white relative">
      <div className="flex items-center justify-between w-full max-w-[95rem]">
        <div>
          <Link href="/"><Image src='/logo.png' alt='' width={120} height={20} /></Link>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex">
          <ul className="flex items-center gap-3">
            {logged && (         
              <Link href={'/dashboard'} className="font-bold px-3 py-2 bg-[#3e523d] rounded-md hover:bg-[#4a5f49] transition-colors">
                Dashboard
              </Link>
            )}    
            <li className="flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger className="shadow-none hover:shadow-sm transition-all ease-in duration-300 bg-[#3e523d] p-3 rounded-full hover:bg-[#4a5f49]">
                  <TbWorld size={25} />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-[var(--main-color)] border-[#3e523d] text-white">
                  <DropdownMenuItem className="hover:bg-[#3e523d] focus:bg-[#3e523d] text-white">
                    <a href="" className="active">
                      Português - BR
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-[#3e523d] focus:bg-[#3e523d] text-white">
                    <a href="">English - USA</a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
            <li className="flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger className="shadow-none hover:shadow-sm transition-all ease-in duration-300 bg-[#3e523d] p-3 rounded-full hover:bg-[#4a5f49]">
                  <MdMenu size={25} />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-[var(--main-color)] border-[#3e523d] text-white">
                  <DropdownMenuItem className="hover:bg-[#3e523d] focus:bg-[#3e523d] text-white">
                    <Link href="/auth/login">Acessar conta</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-[#3e523d] focus:bg-[#3e523d] text-white">
                    <a href="">Suporte</a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
          </ul>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden bg-[#3e523d] p-3 rounded-full hover:bg-[#4a5f49] transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <MdClose size={25} /> : <MdMenu size={25} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[var(--main-color)] border-t border-[#3e523d] shadow-lg z-50">
          <div className="px-4 py-4 space-y-3">
            {logged && (
              <Link 
                href={'/dashboard'} 
                className="block font-bold px-3 py-2 bg-[#3e523d] rounded-md hover:bg-[#4a5f49] transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
            )}
            <Link 
              href="/auth/login" 
              className="block px-3 py-2 hover:bg-[#3e523d] rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Acessar conta
            </Link>
            <a 
              href="" 
              className="block px-3 py-2 hover:bg-[#3e523d] rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Suporte
            </a>
            <div className="border-t border-[#3e523d] pt-3">
              <p className="px-3 py-2 text-sm text-gray-300">Idioma</p>
              <button className="block px-3 py-2 hover:bg-[#3e523d] rounded-md transition-colors w-full text-left">
                Português - BR
              </button>
              <button className="block px-3 py-2 hover:bg-[#3e523d] rounded-md transition-colors w-full text-left">
                English - USA
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar;
