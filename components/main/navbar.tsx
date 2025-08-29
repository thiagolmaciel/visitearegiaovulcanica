import Image from "next/image";
import Link from "next/link";
import { TbWorld } from "react-icons/tb";
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenu } from "../ui/dropdown-menu";
import { MdMenu } from "react-icons/md";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";



const Navbar = async () => {
  var logged = false;
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims) {
    logged = false;
  }
  else{
    logged = true;
  }
  return (
    <div className="flex items-center px-4 justify-center h-[6rem] bg-[var(--main-color)] text-white">
      <div className="flex items-center justify-between  w-[95rem]">
        <div>
          <Link href="/"><Image src='/logo.png' alt='' width={120} height={20} /></Link>
        </div>
        <div>
          <ul className="flex items-center gap-3">
          { logged && (         
                  <Link href={'/dashboard'} className="font-bold px-3 py-2 bg-[#3e523d] rounded-md">Dashboard</Link>
                )
                }    
            <li className="flex items-center">
                <DropdownMenu>
                <DropdownMenuTrigger className="shadow-none hover:shadow-sm transition-all ease-in duration-300 bg-[#3e523d] p-3 rounded-full">
                  <TbWorld size={25} />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem className="flex flex-row items-center">
                    <a href="" className="active">
                      Português - BR
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <a href="">English - USA</a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
            <li className="flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger className="shadow-none hover:shadow-sm transition-all ease-in duration-300 bg-[#3e523d] p-3 rounded-full">
                  <MdMenu size={25} />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Link href="/auth/login">Acessar conta</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <a href="">Suporte</a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>

          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar;
