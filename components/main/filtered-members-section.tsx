'use client'
import { useState, useEffect } from 'react';
import Carousel from './carousel';
import ServiceTagCarousel from './service-tag-carousel';
import { Service } from '@/model/Service';
import { fetchMembersByServiceId } from '@/service/memberServices';
import { Member } from '@/model/Member';

type FilteredMembersSectionProps = {
  services: Service[];
  allMembers: Member[] | null;
  pdcMembers: Member[] | null;
  andMembers: Member[] | null;
};

const FilteredMembersSection = ({ services, allMembers, pdcMembers, andMembers }: FilteredMembersSectionProps) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [filteredAllMembers, setFilteredAllMembers] = useState<Member[] | null>(allMembers);
  const [filteredPdcMembers, setFilteredPdcMembers] = useState<Member[] | null>(pdcMembers);
  const [filteredAndMembers, setFilteredAndMembers] = useState<Member[] | null>(andMembers);
  const [isLoading, setIsLoading] = useState(false);

  // Filter out services: doces, queijaria, turismo (but not enoturismo), hipismo
  const excludedServiceNames = ['doces', 'queijaria', 'hipismo'];
  const filteredServices = services.filter(service => {
    const serviceNameLower = service.name.toLowerCase();
    // Exclude exact matches or specific patterns, but allow enoturismo
    if (serviceNameLower === 'turismo' || 
        (serviceNameLower.includes('turismo') && !serviceNameLower.includes('enoturismo'))) {
      return false;
    }
    return !excludedServiceNames.some(excluded => 
      serviceNameLower.includes(excluded.toLowerCase())
    );
  });

  useEffect(() => {
    const filterMembers = async () => {
      if (!selectedServiceId) {
        // Reset to original members
        setFilteredAllMembers(allMembers);
        setFilteredPdcMembers(pdcMembers);
        setFilteredAndMembers(andMembers);
        return;
      }

      setIsLoading(true);
      try {
        const filtered = await fetchMembersByServiceId(selectedServiceId);
        
        // Filter the original member arrays
        const allFiltered = allMembers?.filter(member => 
          filtered.some(fm => fm.id === member.id)
        ) || null;
        
        const pdcFiltered = pdcMembers?.filter(member => 
          filtered.some(fm => fm.id === member.id)
        ) || null;
        
        const andFiltered = andMembers?.filter(member => 
          filtered.some(fm => fm.id === member.id)
        ) || null;

        setFilteredAllMembers(allFiltered);
        setFilteredPdcMembers(pdcFiltered);
        setFilteredAndMembers(andFiltered);
      } catch (error) {
        console.error('Error filtering members:', error);
        // On error, reset to original
        setFilteredAllMembers(allMembers);
        setFilteredPdcMembers(pdcMembers);
        setFilteredAndMembers(andMembers);
      } finally {
        setIsLoading(false);
      }
    };

    filterMembers();
  }, [selectedServiceId, allMembers, pdcMembers, andMembers]);

  return (
    <>
      <div role="category-selector" className="flex w-full">
        <ul className="flex items-center justify-center w-full">
          <ServiceTagCarousel 
            services={filteredServices}
            onServiceSelect={setSelectedServiceId}
            selectedServiceId={selectedServiceId}
            navigateToSearch={true}
          />
        </ul>
      </div>
      <div role="suggestion" className="mt-2 flex flex-col gap-8 w-full">
        <div className="flex flex-col w-full">
          <p className='text-3xl font-bold'>
            {selectedServiceId ? 'Filtrado por categoria' : 'Explore'}
          </p>
          {isLoading && (
            <p className='text-sm text-gray-500 mt-2'>Carregando...</p>
          )}
          <div className="mt-2 flex flex-row gap-10 w-full">
            <Carousel 
              title="Nossos afiliados" 
              members={filteredAllMembers || []}
            />
          </div>
          <div className="mt-8 flex flex-row gap-10 w-full">
            <Carousel 
              title="Em Poços de Caldas" 
              members={filteredPdcMembers || []}
            />
          </div>
          <div className="mt-8 flex flex-row gap-10 w-full">
            <Carousel 
              title="Em Andradas" 
              members={filteredAndMembers || []}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default FilteredMembersSection;

