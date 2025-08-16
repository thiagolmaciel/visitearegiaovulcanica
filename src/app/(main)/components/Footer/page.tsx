import Image from "next/image"
import { FaFacebook, FaInstagram } from "react-icons/fa6"

const Footer = () => {
    return (
        <div role='footer' className="flex justify-center w-full  bg-[var(--main-color)] py-12 absolute bottom-0">
            <div role='footer-content' className="flex flex-col gap-4 px-4 sm:w-[95rem] text-[#ffffff]">
                <div role="top-side" className="flex flex-col gap-10 sm:flex-row sm:gap-20 sm:mb-5">
                    <div role="left-side" >
                        <h3 className="font-bold mb-2">Sobre o Projeto</h3>
                        <ul className="flex flex-col gap-1">
                            <li><a href="#">Conheça a iniciativa</a></li>
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
                <div role="bottom-side" className="flex flex-row justify-between border-t-1 pt-4 border-[#627460]">
                    <div role='left-side' className="flex flex-row gap-4">
                        <ul className="flex flex-row gap-4">
                            <li>© 2025, Região Vulcânica</li>
                            <li>·</li>
                            <li><a href="#">contato@regiaovulcanica.org.br</a></li>
                            <li>·   </li>
                            <li><a href="#">+55 (35) 99819 6519</a></li>
                        </ul>
                    </div>
                    <div role='right-side' className="flex items-center flex-row gap-4">
                        <a href="https://www.instagram.com/visitearegiaovulcanica/" target="_blank"><FaInstagram></FaInstagram></a>
                        <a href="https://www.facebook.com/regiaovulcanica" target="_blank"><FaFacebook></FaFacebook></a>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Footer
