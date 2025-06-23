import React from 'react';
import searchServices from '../../../service/searchServices';

interface SearchProps {
  searchParams?: Promise<{ query?: string }>;
}

// Função recebe searchParams como Promise
const SearchPage = async ({ searchParams }: SearchProps) => {
  const { query } = (await searchParams) ?? {};

  if (!query?.trim()) {
    return <p>Nenhuma busca realizada</p>;
  }

  const searchResult = await searchServices(query.trim());

  return (
    <div>
      {searchResult.map((result) => (
        <li key={result.id} className="bg-gray-100 p-3 rounded">
          {result.name}
        </li>
      ))}
    </div>
  );
};

export default SearchPage;
