import React from 'react';
import { Member } from '@/model/Member';
import { getMemberLocation } from '@/service/memberServices';
import { Location } from '@/model/Location';



const MapComponent = async (member: Member) => {
  if (!member.id) return null;
  const location: Location | null = await getMemberLocation(member.id);
  
  if (!location) return null;

  return (
      <div className="flex flex-col justify-start w-full sm:w-[95rem]  mt-5 px-[1rem] sm:px-[4rem] py-[1rem] sm:py-[2rem] gap-4  bg-[#fff] rounded-2xl shadow-lg">
      <div className='mb-4'><p className='font-bold text-xl'>Onde eles estão?</p></div>
      <div className="rounded-xl overflow-clip" dangerouslySetInnerHTML={{ __html: location.google_maps_embed }} />
    </div>
  );
};

export default MapComponent;
