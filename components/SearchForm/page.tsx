'use client'

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaSearch } from 'react-icons/fa';

const SearchForm = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const q = searchParams.get('query') || '';
    setQuery(q);
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?query=${encodeURIComponent(query.trim())}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center h-15 w-[35rem] hover:w-[40rem] transition-all ease-in duration-600 text-black bg-white rounded-full"
    >
      <input
        type="search"
        required
        placeholder="Onde você deseja ir?"
        className="flex py-0 w-auto items-center text-left px-4 justify-center grow h-full hover:bg-gray-200 rounded-full focus:outline-none focus:px-5 transition-all duration-50 ease-in-out"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        type="submit"
        className="flex items-center justify-center p-5 h-full text-white rounded-r-full bg-[var(--main-color)] active:bg-[#3e523d] hover:p-5 transition-all ease-in duration-50 hover:cursor-pointer"
      >
        <FaSearch />
      </button>
    </form>
  );
};

export default SearchForm;
