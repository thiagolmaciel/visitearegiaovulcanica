import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import Image from "next/image";

export default function Page() {
  return (
    <div className='bg-white flex grow max-w-[70rem] sm:min-h-[40rem]  rounded-lg shadow-md flex-col sm:flex-row overflow-clip relative'>
    <div role='left-side' className='bg-emerald-900 flex sm:w-3/5  py-4 sm:py-0 items-center justify-center relative overlay-clip'>
      <Image src='/background_login.png' alt='Foto-Regiao-Vulcanica' fill className="object-cover selection-none pointer-events-none opacity-20"></Image>
      <div className="wrapper max-w-[30rem] text-center flex flex-col items-center justify-center text-white z-50">
        <div className="image-box h-40 w-60 relative">
          <Image src='/logo.png' alt='Foto-Regiao-Vulcanica' fill className=" selection-none object-contain pointer-events-none "></Image>
        </div>
      </div>
    </div>
    <div role='right-side' className='flex items-center sm:w-2/5 justify-center px-2 py-5'>
     <ForgotPasswordForm />
    </div>
    </div>
  );
}
