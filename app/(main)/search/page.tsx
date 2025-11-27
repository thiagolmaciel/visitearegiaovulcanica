'use client'
import FilterComponent from '@/components/main/filter-component';
import SuggestionItem from '@/components/main/suggestion-item';
import { fetchAllMembers } from '@/service/memberServices';
import { searchMembers } from '@/service/searchServices';
import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useSearchParams } from 'next/navigation';

const SearchPage = () => {
  const searchParams = useSearchParams();
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [searchResult, setSearchResult] = useState<any[]>([]);
  const [searchInput, setSearchInput] = useState("");

  // Initialize filters from URL parameters
  useEffect(() => {
    const serviceParam = searchParams.get('service');
    if (serviceParam) {
      const decodedService = decodeURIComponent(serviceParam);
      setSelectedFilters([decodedService]);
    }
  }, [searchParams]);

  
  function handleSearchInput(value: string){
    setSearchInput(value);
    // The filter effect will handle the display logic
  }

  const applyFilters = () => {
    const allItems = document.querySelectorAll<HTMLLIElement>("[id^='member-']");
    const states = ['São Paulo', 'Minas Gerais'];
    
    if (allItems.length === 0) {
      return false; // Items not rendered yet
    }
    
    let allDataLoaded = true;
    
    allItems.forEach(item => {
      // Get all filter data elements
      const filterData = item.querySelectorAll<HTMLElement>("[data-filter-type]");
      
      // If no filter data exists yet (still loading), mark as not ready
      if (filterData.length === 0) {
        allDataLoaded = false;
        // Hide items that are still loading if filters are active
        if (selectedFilters.length > 0 || searchInput !== "") {
          item.style.display = "none";
        } else {
          item.style.display = "flex";
        }
        return;
      }
      
      // Build searchable text from description and name
      const memberName = item.querySelector("[data-member-name]")?.getAttribute("data-member-name") || "";
      const description = Array.from(filterData)
        .find(el => el.getAttribute("data-filter-type") === "description")?.textContent?.toLowerCase() || "";
      const searchableText = `${memberName} ${description}`;
      
      // Check search input match
      const searchMatch = searchInput === "" || searchableText.includes(searchInput.toLowerCase());
      
      // Check filter match - check each filter against appropriate data-filter-type
      let filterMatch = true;
      if (selectedFilters.length > 0) {
        // Check each filter - it must match at least one data-filter-type
        filterMatch = selectedFilters.every(filter => {
          const filterLower = filter.toLowerCase().trim();
          
          // Check if it's a state filter
          if (states.includes(filter)) {
            const stateEl = Array.from(filterData).find(el => 
              el.getAttribute("data-filter-type") === "state"
            );
            const stateText = stateEl?.textContent?.toLowerCase().trim() || "";
            return stateText === filterLower;
          }
          
          // Check if it's a city filter
          const cityEl = Array.from(filterData).find(el => 
            el.getAttribute("data-filter-type") === "city"
          );
          const cityText = cityEl?.textContent?.toLowerCase().trim() || "";
          if (cityText === filterLower) {
            return true;
          }
          
          // Check if it's a service filter
          const serviceMatch = Array.from(filterData).some(el => {
            const filterType = el.getAttribute("data-filter-type");
            const text = el.textContent?.toLowerCase().trim() || "";
            return filterType === "service" && text === filterLower;
          });
          if (serviceMatch) {
            return true;
          }
          
          // If none match, this filter doesn't match
          return false;
        });
      }
  
      item.style.display = searchMatch && filterMatch ? "flex" : "none";
    });
    
    return allDataLoaded;
  };

  useEffect(() => {
    // Initial attempt
    let attemptCount = 0;
    const maxAttempts = 10;
    
    const tryApplyFilters = () => {
      attemptCount++;
      const allLoaded = applyFilters();
      
      // If data not all loaded and we haven't exceeded max attempts, try again
      if (!allLoaded && attemptCount < maxAttempts) {
        setTimeout(tryApplyFilters, 200);
      }
    };
    
    // Start with a small delay to let DOM render
    const timer = setTimeout(tryApplyFilters, 100);
    
    return () => clearTimeout(timer);
  }, [selectedFilters, searchInput, searchResult]);

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
      className='flex flex-col sm:flex-row w-[100vw] sm:w-[95rem] min-h-[26rem] sm:min-h-[50rem] gap-4 my-3 sm:my-5'
    >
      <div className='flex flex-col flex-1 sm:basis-3/4 gap-2'>
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
        {/* Mobile Filter Button */}
        <div className='sm:hidden'>
          <FilterComponent   
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
          />
        </div>
        <div className='flex flex-row bg-[#fff] rounded-xl h-max shadow-sm px-4 py-6'> {/*List Component*/}
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 w-full">
            {searchResult.map((member, idx) => (
              <li key={member.id} id={`member-${member.id}`} className='flex justify-center h-full w-full'>
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

export default SearchPage;
