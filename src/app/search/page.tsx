import React from 'react'
import { supabase } from '../../../utils/supabaseClient';
import searchServices from '../../../service/searchServices';

interface SearchProps {
  searchParams?: { query?: string };
}



const search = async ({ searchParams }: { searchParams?: { query?: string } }) => {
  const query = await searchParams?.query?.trim(); 

  if (!query) {
    return <p>Nenhuma busca realizada</p>;
  }

  const searchResult = await searchServices(query);
  return (
    <div>
       {searchResult.map((result) => (
          <li key={result.id} className="bg-gray-100 p-3 rounded">
            {result.name}
          </li>
        ))}
    </div>
  )
}

export default search
