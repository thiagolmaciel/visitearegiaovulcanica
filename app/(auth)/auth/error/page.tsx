import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>;
}) {
  const params = await searchParams;
  const errorMessage = params?.error 
    ? decodeURIComponent(params.error) 
    : "Ocorreu um erro não especificado";

  return (
    <div className='bg-white flex grow max-w-[70rem] sm:min-h-[40rem] rounded-lg shadow-md flex-col sm:flex-row overflow-clip relative'>
      <div role='left-side' className='bg-emerald-900 flex sm:w-3/5 py-4 sm:py-0 items-center justify-center relative overlay-clip'>
        <Image src='/background_login.png' alt='Foto-Regiao-Vulcanica' fill className="object-cover selection-none pointer-events-none opacity-20"></Image>
        <div className="wrapper max-w-[30rem] text-center flex flex-col items-center justify-center text-white z-50">
          <div className="image-box h-40 w-60 relative">
            <Image src='/logo.png' alt='Foto-Regiao-Vulcanica' fill className="selection-none object-contain pointer-events-none"></Image>
          </div>
        </div>
      </div>
      <div role='right-side' className='flex items-center sm:w-2/5 justify-center px-2 py-5 relative'>
        <div className="flex flex-col items-center justify-center gap-4 w-full">
          <div className="self-start">
            <h2 className="text-2xl font-bold text-red-600">
              Ops, algo deu errado
            </h2>
            <h3 className="text-gray-500">Ocorreu um erro durante a autenticação</h3>
          </div>

          <div className="w-full bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-800">
              {errorMessage}
            </p>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <Link href={'/auth/login'} className="w-full">
              <Button className="w-full font-bold">
                Voltar para Login
              </Button>
            </Link>
            <Link href={'/'} className="w-full">
              <Button variant="outline" className="w-full font-bold">
                Voltar ao Site
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
