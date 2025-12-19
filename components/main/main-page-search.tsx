'use client'
import { redirect } from 'next/navigation'
import React from 'react'
import { FaSearch } from 'react-icons/fa'

function redirectToSearch(){
    redirect('/busca')
}

const MainPageSearch = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center flex-col gap-2 z-20 text-white">
      <p className="text-2xl sm:text-3xl font-bold text-center px-4 drop-shadow-2xl">
        Visite e desfrute da Região Vulcânica!
      </p>
      
      {/* Mobile Search Button */}
      <div 
        className="
        sm:hidden
        mt-5 w-16 h-16 
        flex items-center justify-center
        rounded-full bg-[var(--main-color)]
        hover:-translate-y-1 transition-all ease-in 
        cursor-pointer shadow-lg
        hover:shadow-xl"
        onClick={redirectToSearch}
      >
        <FaSearch className="text-white text-xl" />
      </div>

      {/* Desktop Search Bar */}
      <div 
        className="
        hidden sm:flex
        items-center justify-around 
        mt-5 w-[30rem] h-[4rem] 
        hover:-translate-y-1 transition-all ease-in 
        cursor-pointer"
        onClick={redirectToSearch}
      >
        <div className="flex items-center justify-center grow rounded-l-full h-full px-5 py-3 bg-[var(--main-color)]">
          <FaSearch /> 
        </div>
        <div className="flex items-center rounded-r-full pr-5 w-full h-full pl-3 py-3 bg-white grow">
          <p className="text-gray-400 text-x">Explore lugares incríveis!</p>
        </div>
      </div>
    </div>
  )
}

export default MainPageSearch
