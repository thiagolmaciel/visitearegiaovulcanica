import { getMembersByProfileID } from '@/service/profileServices';
import React from 'react'
import SuggestionItem from '../main/suggestion-item';
import OptionsButton from './options-button';

interface ListPlacesProps {
    id: string;
  }

const ListPlaces = async ({id} : ListPlacesProps) => {
    const members = await getMembersByProfileID(id)

  return (
    <ul className='flex mt-2 gap-10 w-full'>
     {members?.map(member => (
        <div key={member.id} className='flex gap-2'>
          <SuggestionItem  title={member.name} id={member.id} image_url={member.image} slug={member.slug}/>
          <OptionsButton member_id={member.id} />
        </div>
        
    ))}
    </ul>
  )
}

export default ListPlaces
