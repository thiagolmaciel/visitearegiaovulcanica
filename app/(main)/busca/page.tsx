'use client'
import FilterComponent from '@/components/main/filter-component';
import SuggestionItem from '@/components/main/suggestion-item';
import { fetchAllMembers } from '@/service/memberServices';
import React, { useEffect, useState, useMemo, Suspense } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useSearchParams } from 'next/navigation';
import { logError } from '@/lib/error-handler';

interface Member {
  id: string;
  name: string;
  description?: string;
  slug?: string;
  image?: string;
}

const SearchPageContent = () => {
  const searchParams = useSearchParams();
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [searchResult, setSearchResult] = useState<Member[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Initialize filters from URL parameters
  useEffect(() => {
    const serviceParam = searchParams.get('service');
    if (serviceParam) {
      const decodedService = decodeURIComponent(serviceParam);
      setSelectedFilters([decodedService]);
    }
  }, [searchParams]);

  // Load members on mount
  useEffect(() => {
    const loadMembers = async () => {
      try {
        setIsLoading(true);
        const result = await fetchAllMembers();
        setSearchResult(result ?? []);
      } catch (err) {
        logError("SearchPage - loadMembers", err);
      } finally {
        setIsLoading(false);
      }
    };
    loadMembers();
  }, []);

  // Filter members using React state (basic filtering for name/description)
  // Note: Service, city, and state filtering still relies on SuggestionItem's data attributes
  // This is a partial refactor - full refactor would require loading all member data upfront
  const filteredMembers = useMemo(() => {
    if (!searchResult || searchResult.length === 0) {
      return [];
    }

    const normalizedSearch = searchInput.toLowerCase().trim();
    
    // Basic filtering by name and description
    let filtered = searchResult;
    
    if (normalizedSearch) {
      filtered = filtered.filter((member) => {
        const searchableText = `${member.name} ${member.description || ''}`.toLowerCase();
        return searchableText.includes(normalizedSearch);
      });
    }

    return filtered;
  }, [searchResult, searchInput]);

  return (
    <div 
      className='flex flex-col sm:flex-row w-[100vw] sm:w-[95rem] min-h-[26rem] sm:min-h-[50rem] gap-4 my-3 sm:my-5'
    >
      <div className='flex flex-col flex-1 sm:basis-3/4 gap-2'>
        <div className='flex h-14 w-full'> {/*Search Component*/}
          <input 
            className='flex h-full w-full px-10 bg-white shadow-sm rounded-l-full' 
            placeholder='Pesquise por termos ou lugares'
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
          />
          <div className='flex items-center justify-center h-full w-24 bg-[var(--main-color)] rounded-r-full'>
            <FaSearch className='text-white' />
          </div>
        </div>
        {/* Mobile Filter Button */}
        <div className='sm:hidden'>
          <FilterComponent   
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
          />
        </div>
        <div className='flex flex-row bg-[#fff] rounded-xl h-max shadow-sm px-4 py-6'> {/*List Component*/}
          {isLoading ? (
            <div className='text-center py-8 w-full'>Carregando...</div>
          ) : filteredMembers.length === 0 ? (
            <div className='text-center py-8 w-full text-gray-500'>
              Nenhum resultado encontrado
            </div>
          ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 w-full">
              {filteredMembers.map((member) => (
                <li 
                  key={member.id} 
                  id={`member-${member.id}`}
                  className='flex justify-center h-full w-full'
                >
                <SuggestionItem
                  title={member.name}
                  description={member.description}
                  id={member.id}
                    image_url={member.image || '/house.jpg'}
                    slug={member.slug || ''}
                    selectedFilters={selectedFilters}
                />
              </li>
            ))}
          </ul>
          )}
        </div>
      </div>
      {/* Desktop Filter */}
      <div className='hidden sm:block'>
        <FilterComponent   
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
        />
      </div>
    </div>
  );
};

const SearchPage = () => {
  return (
    <Suspense fallback={
      <div className='flex flex-col sm:flex-row w-[100vw] sm:w-[95rem] min-h-[26rem] sm:min-h-[50rem] gap-4 my-3 sm:my-5'>
        <div className='flex flex-col flex-1 sm:basis-3/4 gap-2'>
          <div className='text-center py-8'>Carregando...</div>
        </div>
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  );
};

export default SearchPage;
