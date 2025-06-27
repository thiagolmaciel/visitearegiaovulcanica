import { FaSearch } from "react-icons/fa"
interface Props {
  query: string;
  setQuery: (value: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const SearchPageComponent = ({ query, setQuery, onSubmit }: Props) => {
  return (
    <form
      className="flex items-center flex-1 h-15 transition-all ease-in duration-600 text-black  rounded-full"
      onSubmit={onSubmit}
    >
      <input
        type="search"
        required
        placeholder="Onde você deseja ir?"
        className="flex py-0 w-auto h-15 items-center text-left px-4 justify-center grow   bg-white rounded-l-full focus:outline-none focus:px-5 transition-all duration-50 ease-in-out"
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
  )
}

export default SearchPageComponent
