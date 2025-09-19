import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

const ConhecaAIniciativa = () => {
  return (
      <div className="flex flex-col px-10 py-6 grow bg-white max-w-[95rem] min-h-[40rem]">
              <div className='border-b-2 border-solid pb-5 border-[#e0e0e0]'>
                <p className='text-3xl font-bold'>Conheça a iniciativa</p>
              </div>
            <div className='text-x leading-7 mt-4'>
              <p>A iniciativa da plataforma <strong>Visite a Região Vulcânica</strong> nasce no âmbito do <strong>
                Programa Institucional
                  de Apoio a Ações de Extensão do IFSP
              </strong>. O projeto tem como objetivo unir tecnologia e sustentabilidade para fortalecer o turismo local, valorizando a <strong>
                região
                  vulcânica
              </strong> e promovendo experiências que respeitem o meio ambiente e a cultura regional.</p>
              <p>Coordenado pelo professor <strong>João Paulo Pereira</strong> e desenvolvido pelo estudante bolsista do IFSP, <strong>Thiago Laranjeira Maciel</strong>,
                o projeto consiste nesta plataforma digital, que facilita a divulgação de atrativos turísticos, práticas sustentáveis e informações
                úteis para visitantes e moradores.
              </p>
              <p>Mais do que um recurso tecnológico, a iniciativa representa um espaço de integração entre comunidade, academia e setor turístico.
                Ao mesmo tempo em que contribui para a formação prática dos estudantes, também busca fomentar o desenvolvimento socioeconômico regional
                e incentivar um turismo ágil e transparente.</p>
            </div>
      </div>
  )
}

export default ConhecaAIniciativa
