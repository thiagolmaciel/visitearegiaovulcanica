import React from 'react';
import { Member } from '../../model/Member';
import { getMemberLocation } from '../../service/memberServices';
import { Location } from '../../model/Location';



const MapComponent = async (member: Member) => {
  const location: Location | null = await getMemberLocation(member.id);
  if (!location) return null;

  return (
    
    <div className='mt-8'>
      <div className='mb-4'><p className='font-bold text-xl'>Onde eles estão?</p></div>
      <div className="rounded-xl overflow-clip" dangerouslySetInnerHTML={{ __html: location.google_maps_embed }} />
    </div>
  );
};

export default MapComponent;
