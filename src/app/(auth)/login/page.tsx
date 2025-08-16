import Image from 'next/image'
import React from 'react'
import LoginForm from '../components/LoginForm/page'

const Login = () => {
  return (
    <div className='bg-white flex grow max-w-[70rem] sm:min-h-[40rem]  rounded-lg shadow-md flex-col sm:flex-row overflow-clip'>
      <div role='left-side' className='flex-3  bg-emerald-900 hidden sm:flex items-center justify-center relative overlay-clip'>
        <Image src='/background_login.png' alt='Foto-Regiao-Vulcanica' fill className="object-cover selection-none pointer-events-none opacity-20"></Image>
        <div className="wrapper max-w-[30rem] text-center flex flex-col items-center justify-center text-white z-50">
          <div className="image-box h-40 w-60 relative">
            <Image src='/logo.png' alt='Foto-Regiao-Vulcanica' fill className=" selection-none object-contain pointer-events-none "></Image>
          </div>
        </div>
      </div>
      <div role='right-side' className='flex-2 flex items-center justify-center px-2 py-5'>
       <LoginForm></LoginForm>
      </div>
    </div>
  )
}

export default Login
