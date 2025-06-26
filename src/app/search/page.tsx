'use client'
import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { searchMembers } from '../../../service/searchServices';
import SuggestionItem from '../../../components/SuggestionItem/page';
import SearchPageComponent from '../../../components/SearchPageComponent/page';
import { MdOutlineSearchOff } from 'react-icons/md';
import FilterComponent from '../../../components/FilterComponent/page';

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
      <div className='flex flex-col w-[95rem]'>
        <div className='flex sm:flex-row my-5 sm:justify-between gap-2'>
          <div className='flex flex-col sm:flex-4 gap-2'>
            <SearchPageComponent query={query} setQuery={setQuery} onSubmit={onSubmit} />
            <div className="flex flex-col items-center px-[2rem] py-[2rem] min-h-[50rem] bg-[#fff] rounded-2xl shadow-lg">
              {loading ? (
                <div className="flex justify-center items-center w-full h-40">
                  <div className="animate-spin rounded-full h-10 w-10 border-4 border-[var(--main-color)] border-t-transparent" />
                </div>
              ) : searchResult.length === 0 ? (
                <div className='flex items-center gap-2 text-gray-400'>
                  <MdOutlineSearchOff /> Nenhum resultado encontrado!
                </div>
              ) : (
                <div className='w-full'>
                  <ul className='flex flex-row flex-wrap gap-x-16 gap-y-8'>
                    {searchResult.map((result) => (
                      <li key={result.id}>
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
