'use client'
import { getMembersByProfileID } from '@/service/profileServices';
import React, { useEffect, useState } from 'react';
import SuggestionItem from '../main/suggestion-item';
import OptionsButton from './options-button';
import CreateMemberButton from './create-member-button';
import EditMemberButton from './edit-member-button';

interface ListPlacesProps {
  id: string;
}

const ListPlaces = ({ id }: ListPlacesProps) => {
  const [members, setMembers] = useState<any[]>([]);

  const fetchMembers = async () => {
    try {
      const data = await getMembersByProfileID(id);
      setMembers(data || []);
    } catch (error) {
      console.error('Erro ao buscar membros:', error);
      setMembers([]);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [id]); 

  return (
    <div className='w-full'>
      <div className="flex w-full items-center justify-between">
      <p className="text-[#747474]">Gerencie e visualize seus locais de agriturismo aqui</p>
      <CreateMemberButton 
        id={id} 
        onUpdate={fetchMembers}/>
        </div>
      <ul className="flex sm:flex-row flex-col mt-6 gap-10 w-full flex-wrap">
        {members.map((member) => (
          <div key={member.id} className="flex sm:flex-1 sm:flex-row flex-col gap-3">
            <SuggestionItem
              title={member.name}
              id={member.id}
              image_url={member.image}
              slug={member.slug}
            />
            <OptionsButton
              member_id={member.id}
              member_name={member.name}
              onUpdate={fetchMembers}
            />
          </div>
        ))}
      </ul>
    </div>
  );
};

export default ListPlaces;
