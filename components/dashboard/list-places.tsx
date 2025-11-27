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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <p className="text-gray-600">Gerencie e visualize seus locais de agriturismo aqui</p>
        <CreateMemberButton 
          id={id} 
          onUpdate={fetchMembers}/>
      </div>
      
      {members.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum local cadastrado</h3>
          <p className="text-gray-500 mb-4">Comece criando seu primeiro agriturismo</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {members.map((member) => (
            <div key={member.id} className="group relative">
              <div className="relative">
                <SuggestionItem
                  title={member.name}
                  id={member.id}
                  image_url={member.image}
                  slug={member.slug}
                />
                
                {/* Options Button - Top Left Corner - Always Visible */}
                <div className="absolute top-3 left-3 z-10">
                  <OptionsButton
                    member_id={member.id}
                    member_name={member.name}
                    onUpdate={fetchMembers}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListPlaces;
