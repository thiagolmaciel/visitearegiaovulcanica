import React from 'react';
import { supabase } from '../../../../utils/supabaseClient';
import { IoShareSocial } from 'react-icons/io5';
import Image from 'next/image';

type Props = {
  params: {
    slug: string;
  };
};

const MemberPage = async ({ params }: Props) => {
  const { slug } = params;

  const { data, error } = await supabase
    .from('members')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    return <p>Erro ao receber {slug}</p>;
  }

  if (!data) {
    return <p>Member not found</p>;
  }

  return (
    <div role='main' className="flex flex-col items-center ">
      <div className="flex flex-col justify-start sm:w-[95rem] px-[4rem] py-[2rem] gap-4 min-h-[50rem] my-5 bg-[#fff] rounded-2xl shadow-lg">
        <div role="header" className="flex col items-center justify-between w-full">
          <p className='text-3xl font-bold'>{data.name}</p>
          <a href="#" className='flex items-center gap-2 text-x'>
          <p>Compartilhar </p>
          <IoShareSocial />
          </a>
        </div>
        <div role="image_area" className='flex gap-1 h-[40rem] w-full'>
          <div role="image_box" className='relative flex-1'> 
          <Image src={data.image} alt="" fill className='object-cover'/>
          </div>
          <div className='flex-1 grid grid-cols-2 grid-rows-2 gap-1 '>
          <div role="image_box" className='relative'> 
          <Image src={data.image} alt="" fill className='object-cover'/>
          </div>
          <div role="image_box" className='relative'> 
          <Image src={data.image} alt="" fill className='object-cover'/>
          </div>
          <div role="image_box" className='relative'> 
          <Image src={data.image} alt="" fill className='object-cover'/>
          </div>
          <div role="image_box" className='relative'> 
          <Image src={data.image} alt="" fill className='object-cover'/>
          </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MemberPage;
