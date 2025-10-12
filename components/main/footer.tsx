import Image from "next/image"
import { FaFacebook, FaInstagram } from "react-icons/fa6"

const Footer = () => {
    return (
        <div role='footer' className="flex justify-center w-full bg-[var(--main-color)] py-8 sm:py-12 absolute bottom-0">
            <div role='footer-content' className="flex flex-col gap-4 px-4 sm:px-8 w-full max-w-[95rem] text-[#ffffff]">
                <div role="top-side" className="flex flex-col gap-6 sm:flex-row sm:gap-20 sm:mb-5">
                    <div role="left-side" >
                        <h3 className="font-bold mb-2">Sobre o Projeto</h3>
                        <ul className="flex flex-col gap-1">
                            <li><a href="/sobre/conheca-a-iniciativa">Conheça a iniciativa</a></li>
                            <li><a href="#">Apoie comunidades locais</a></li>
                            <li><a href="#">Notícias e atualizações</a></li>
                        </ul>
                    </div>
                    <div role="middle-side">
                        <h3 className="font-bold mb-2">Atendimento</h3>
                        <ul className="flex flex-col gap-1">
                            <li><a href="#">Contato</a></li>
                            <li><a href="#">Anuncie seu agriturismo</a></li>
                            <li><a href="#">Outros afiliados comerciais</a></li>
                        </ul>
                    </div>
                    <div role="right-side">
                        <h3 className="font-bold mb-2">Destinos</h3>
                        <ul className="flex flex-col gap-1">
                            <li><a href="#">São Paulo</a></li>
                            <li><a href="#">Minas Gerais</a></li>
                            <li><a href="#">Todos os locais</a></li>
                        </ul>
                    </div>
                </div>
                <div role="bottom-side" className="flex flex-col sm:flex-row sm:justify-between gap-4 border-t pt-4 border-[#627460]">
                    <div role='left-side' className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                        <ul className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm sm:text-base">
                            <li>© 2025, Região Vulcânica</li>
                            <li className="hidden sm:inline">·</li>
                            <li><a href="#" className="break-all sm:break-normal">contato@regiaovulcanica.org.br</a></li>
                            <li className="hidden sm:inline">·</li>
                            <li><a href="#">+55 (35) 99819 6519</a></li>
                        </ul>
                    </div>
                    <div role='right-side' className="flex items-center justify-center sm:justify-end flex-row gap-4">
                        <a href="https://www.instagram.com/visitearegiaovulcanica/" target="_blank" className="text-xl"><FaInstagram></FaInstagram></a>
                        <a href="https://www.facebook.com/regiaovulcanica" target="_blank" className="text-xl"><FaFacebook></FaFacebook></a>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Footer
