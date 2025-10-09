'use client'
import FilterComponent from '@/components/main/filter-component';
import SuggestionItem from '@/components/main/suggestion-item';
import { fetchAllMembers } from '@/service/memberServices';
import { searchMembers } from '@/service/searchServices';
import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchPage = () => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [searchResult, setSearchResult] = useState<any[]>([]);
  const [searchInput, setSearchInput] = useState("");

  
  function handleSearchInput(value: string){
    setSearchInput(value)
    value = value.toLowerCase();
    const allItems = document.querySelectorAll<HTMLDivElement>("[id^='member-']");
    if(value !== ""){
      allItems.forEach(item => {
        const text = item.textContent?.toLowerCase() || "";
        if(text.includes(value)){
          item.style.display = "flex";
        }
        else{
          item.style.display = "none";
        }
      });
    }
    else{
      allItems.forEach(item => {
        item.style.display = "flex";
      });
    }
  }

  useEffect(() => {
    const allItems = document.querySelectorAll<HTMLDivElement>("[id^='member-']");
    
    allItems.forEach(item => {
      const text = item.textContent?.toLowerCase() || "";
      const searchMatch = text.includes(searchInput.toLowerCase());
      const filterMatch = selectedFilters.length === 0 
        ? true 
        : selectedFilters.some(filter => text.includes(filter.toLowerCase()));
  
      item.style.display = searchMatch && filterMatch ? "flex" : "none";
    });
  }, [selectedFilters, searchInput]);

  useEffect(() => {
    const loadMembers = async () => {
      try {
        const result = await fetchAllMembers();
        setSearchResult(result ?? []);
      } catch (err) {
        console.error("Erro ao buscar membros:", err);
      }
    };
    loadMembers();
  }, []);

  return (
    <div 
      className='flex flex-row w-[100vw] sm:w-[95rem] min-h-[26rem] sm:min-h-[50rem] gap-4 my-3 sm:my-5'
    >
      <div className='flex flex-col flex-1 sm:basis-4/5 gap-2 '>
        <div className='flex h-14 w-full'> {/*Search Component*/}
          <input 
            className='flex h-full w-full px-10 bg-white shadow-sm rounded-l-full' 
            placeholder='Pesquise por termos ou lugares'
            onChange={(e) => handleSearchInput(e.target.value)}
            value={searchInput ?? ""}
          />
          <div className='flex items-center justify-center h-full w-24 bg-[var(--main-color)] rounded-r-full'>
            <FaSearch className='text-white' />
          </div>
        </div>
        <div className='flex flex-row bg-[#fff] rounded-xl h-max shadow-sm px-4 py-6'> {/*List Component*/}
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 w-full">
                      {searchResult.map((member, idx) => (
                <li key={member.id} id={`member-${member.id}`}  className='flex  justify-center'>
                <SuggestionItem
                  title={member.name}
                  description={member.description}
                  id={member.id}
                  image_url={member.image}
                  slug={member.slug}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <FilterComponent   
      selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}  />
     
    </div>
  );
};

export default SearchPage;
