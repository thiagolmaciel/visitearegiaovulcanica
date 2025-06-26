'use client'
import React, { useEffect, useState } from 'react';
import { searchMembers } from '../../../service/searchServices';
import SuggestionItem from '../../../components/SuggestionItem/page';
import SearchPageComponent from '../../../components/SearchPageComponent/page';
import { useSearchParams } from 'next/navigation';
import { FaQuestion } from 'react-icons/fa';
import { MdOutlineSearchOff } from 'react-icons/md';
import FilterComponent from '../../../components/FilterComponent/page';

interface SearchProps {
  searchParams?: Promise<{ query?: string }>;
}

const SearchPage = () => {
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
                <div className='flex items-center gap-2 text-gray-400'>Nenhum resultado encontrado!</div>
              ) : (
                <div className='w-full'>
                  <ul className='flex flex-row flex-wrap gap-6 justify-between'>
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

export default SearchPage;

// import React from 'react';
// import { searchMembers } from '../../../service/searchServices';
// import SuggestionItem from '../../../components/SuggestionItem/page';
// import SearchPageComponent from '../../../components/SearchPageComponent/page';

// interface SearchProps {
//   searchParams?: Promise<{ query?: string }>;
// }

// const SearchPage = async ({ searchParams }: SearchProps) => {
//   const { query } = (await searchParams) ?? {};

//   if (!query?.trim()) {
//     return <p>Nenhuma busca realizada</p>;
//   }

//   const searchResult = await searchMembers(query.trim());
//   console.log(searchResult)
//   if (!searchResult) return null;

//   return (

//     <div role='main' className="flex flex-col items-center">
//       <div className='flex flex-col w-[95rem]'>
//         <div className='flex sm:flex-row my-5 sm:justify-between gap-2'>
//           <div className='flex flex-col sm:flex-4 gap-2'>
//               <SearchPageComponent />
//             <div className="flex flex-col items-center  px-[2rem] py-[2rem] min-h-[50rem] bg-[#fff] rounded-2xl shadow-lg">
//               <div className='w-full'>
//                 <ul className='flex flex-row flex-wrap gap-6 justify-between'>
//                   {searchResult.map((result) => (
//                     <li key={result.id}>
//                       <SuggestionItem title={result.name} id={result.id} image_url={result.image} slug={result.slug} />
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           </div>
//           <div className="flex flex-col items-center sm:flex-1 px-[4rem] py-[2rem] min-h-[50rem] bg-[#fff] rounded-2xl shadow-lg">
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SearchPage;
