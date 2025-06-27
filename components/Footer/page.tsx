import { FaFacebook, FaInstagram } from "react-icons/fa6"

const Footer = () => {
    return (
        <div role='footer' className="flex justify-center w-full sm:h-[22rem] bg-[var(--main-color)] py-12 absolute bottom-0">
            <div role='footer-content' className="flex flex-col gap-4 px-4 sm:w-[95rem] text-[#ffffff]">
                <div role="top-side" className="flex flex-col gap-10 sm:flex-row sm:gap-20">
                    <div role="left-side" >
                        <h3 className="font-bold mb-2">Sobre o Projeto</h3>
                        <ul className="flex flex-col gap-1">
                            <li><a href="#">Agriturismo SP – edição maio 2025</a></li>
                            <li><a href="#">Notícias e atualizações</a></li>
                            <li><a href="#">Novas experiências disponíveis</a></li>
                            <li><a href="#">Trabalhe conosco</a></li>
                            <li><a href="#">Apoie comunidades locais</a></li>
                            <li><a href="#">Iniciativas sustentáveis</a></li>
                        </ul>
                    </div>
                    <div role="middle-side">
                        <h3 className="font-bold mb-2">Atendimento</h3>
                        <ul className="flex flex-col gap-1">
                            <li><a href="#">Central de Ajuda</a></li>
                            <li><a href="#">Suporte para dúvidas sobre reservas</a></li>
                            <li><a href="#">Segurança e confiança</a></li>
                            <li><a href="#">Política de cancelamento</a></li>
                            <li><a href="#">Acessibilidade e inclusão</a></li>
                            <li><a href="#">Reportar problema</a></li>
                        </ul>
                    </div>
                    <div role="right-side">
                        <h3 className="font-bold mb-2">Hospedagem & Experiências</h3>
                        <ul className="flex flex-col gap-1">
                            <li><a href="#">Anuncie seu agriturismo</a></li>
                            <li><a href="#">Guia de boas práticas</a></li>
                            <li><a href="#">Comunidade de anfitriões</a></li>
                            <li><a href="#">Aula gratuita de hospedagem rural</a></li>
                            <li><a href="#">Encontre um coanfitrião</a></li>
                        </ul>
                    </div>
                </div>
                <div role="bottom-side" className="flex flex-row justify-between border-t-1 pt-4 border-[#627460]">
                    <div role='left-side' className="flex flex-row gap-4">
                        <h3>© 2025, Região Vulcânica</h3>
                        <ul className="flex flex-row gap-4">
                            <li>·</li>
                            <li><a href="#">Termos de Uso</a></li>
                            <li>·   </li>
                            <li><a href="#">Privacidade</a></li>
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
