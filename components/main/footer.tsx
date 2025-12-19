import { FaFacebook, FaInstagram } from "react-icons/fa6"
import Link from "next/link"
import Image from "next/image"

const Footer = () => {
    return (
        <div role='footer' className="flex justify-center w-full bg-[var(--main-color)] py-8 sm:py-12 mt-auto">
            <div role='footer-content' className="flex flex-col gap-4 px-4 sm:px-8 w-full max-w-[95rem] text-[#ffffff]">
                <div role="top-side" className="flex flex-col gap-6 sm:flex-row sm:justify-between sm:mb-5">
                    <div className="flex flex-col gap-6 sm:flex-row sm:gap-8 lg:gap-12">
                        <div role="left-side" >
                            <h3 className="font-bold mb-2">Sobre o Projeto</h3>
                            <ul className="flex flex-col gap-1">
                                <li><Link href="/sobre/conheca-a-iniciativa">Conheça a iniciativa</Link></li>
                                <li><Link href="/sobre">Sobre a plataforma</Link></li>
                                <li><a href="https://regiaovulcanica.org.br/noticias.php" target="_blank" rel="noopener noreferrer">Notícias e atualizações</a></li>
                            </ul>
                        </div>
                        <div role="middle-side">
                            <h3 className="font-bold mb-2">Atendimento</h3>
                            <ul className="flex flex-col gap-1">
                                <li><Link href="/sobre/contato">Contato</Link></li>
                                <li><Link href="/sobre/anuncie-seu-agriturismo">Anuncie seu agriturismo</Link></li>
                                <li><a href="https://regiaovulcanica.org.br/associados.php" target="_blank" rel="noopener noreferrer">Outros afiliados comerciais</a></li>
                            </ul>
                        </div>
                        <div role="right-side">
                            <h3 className="font-bold mb-2">Destinos</h3>
                            <ul className="flex flex-col gap-1">
                                <li><Link href="/busca?query=*&city=Poços de Caldas">Poços de Caldas</Link></li>
                                <li><Link href="/busca?query=*&city=Andradas">Andradas</Link></li>
                                <li><Link href="/busca">Todos os locais</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div role="logos-side" className="flex items-center gap-4 sm:gap-6">
                        <Image
                            src="/logo_instituto_federal.png"
                            alt="Instituto Federal"
                            width={120}
                            height={60}
                            className="h-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
                        />
                        <Image
                            src="/logo_vulcanica_branco.png"
                            alt="Região Vulcânica"
                            width={120}
                            height={60}
                            className="h-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
                        />
                        <Image
                            src="/ministerio_desenvolvimento_agrario.png"
                            alt="Ministério do Desenvolvimento Agrário"
                            width={180}
                            height={90}
                            className="h-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
                        />
                    </div>
                </div>
                <div role="bottom-side" className="flex flex-col gap-4 border-t pt-4 border-[#627460]">
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-4 items-center">
                        <div role='left-side' className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center sm:items-start">
                            <ul className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm sm:text-base">
                                <li>© 2025, Região Vulcânica</li>
                                <li className="hidden sm:inline">·</li>
                                <li><a href="mailto:contato@regiaovulcanica.org.br" className="break-all sm:break-normal">contato@regiaovulcanica.org.br</a></li>
                                <li className="hidden sm:inline">·</li>
                                <li><a href="tel:+5535998196519">+55 (35) 99819 6519</a></li>
                            </ul>
                        </div>
                        <div role='right-side' className="flex items-center justify-center sm:justify-end flex-row gap-4">
                            <a href="https://www.instagram.com/visitearegiaovulcanica/" target="_blank" className="text-xl"><FaInstagram></FaInstagram></a>
                            <a href="https://www.facebook.com/regiaovulcanica" target="_blank" className="text-xl"><FaFacebook></FaFacebook></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Footer
