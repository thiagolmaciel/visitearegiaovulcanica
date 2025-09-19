'use client'
import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { searchMembers } from '@/service/searchServices';
import { MdOutlineSearchOff } from 'react-icons/md';
import SearchPageComponent from '@/components/main/search-page-component';
import SuggestionItem from '@/components/main/suggestion-item';
import FilterComponent from '@/components/main/filter-component';

const SearchPageContent = () => {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('query') || '';
  const [query, setQuery] = useState(initialQuery);
  const [searchResult, setSearchResult] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (q: string) => {
    if (!q.trim()) return;
    setLoading(true);
    const result = await searchMembers(q.trim());
    setSearchResult(result ?? []);
    setLoading(false);
  };

  useEffect(() => {
    if (initialQuery.trim()) {
      handleSearch(initialQuery);
    }
  }, [initialQuery]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch(query);
  };

  return (
    <div role='main' className="flex flex-col items-center">
      <div className='flex flex-col w-[100vw] sm:w-[95rem]'>
        <div className='flex flex-col sm:flex-row my-3 sm:my-5 sm:justify-between gap-2 '>
          <div className='flex flex-col sm:flex-4 gap-2'>
            <SearchPageComponent query={query} setQuery={setQuery} onSubmit={onSubmit} />
            <div className="flex flex-col items-center sm:px-[2rem] py-[2rem] min-h-[26rem] sm:min-h-[50rem] bg-[#fff] rounded-t-2xl sm:rounded-2xl shadow-lg">
              {loading ? (
                <div className="flex justify-center items-center w-full h-40">
                  <div className="animate-spin rounded-full h-10 w-10 border-4 border-[var(--main-color)] border-t-transparent" />
                </div>
              ) : searchResult.length === 0 ? (
                <div className='flex items-center gap-2 text-gray-400'>
                  <MdOutlineSearchOff /> Nenhum resultado encontrado!
                </div>
              ) : (
                <div className='w-full flex'>
                  <ul className='flex flex-col justify-center sm:flex-row sm:flex-wrap gap-x-16 gap-y-8 w-full sm:justify-between'>
                    {searchResult.map((result) => (
                      <li key={result.id} className='flex  justify-center'>
                        <SuggestionItem
                          title={result.name}
                          id={result.id}
                          image_url={result.image}
                          slug={result.slug}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <FilterComponent />
        </div>
      </div>
    </div>
  );
};

const SearchPage = () => (
  <Suspense
    fallback={
      <div className="flex justify-center items-center w-full h-40">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-[var(--main-color)] border-t-transparent" />
      </div>
    }
  >
    <SearchPageContent />
  </Suspense>
);

export default SearchPage;
