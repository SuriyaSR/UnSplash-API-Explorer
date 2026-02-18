import { SlidersHorizontal } from "lucide-react";
import { useState, useEffect } from "react";

interface SearchBarProps {
  query: string;
  setQuery: (value: string) => void;
  onRefineClick: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({query, setQuery, onRefineClick}) => {
  const [localQuery, setLocalQuery] = useState(query);

 useEffect(() => {
    const handler = setTimeout(() => {
      setQuery(localQuery);
    }, 300); 

    return () => clearTimeout(handler);
  }, [localQuery, setQuery]);

  useEffect(() => {
    setLocalQuery(query);
  }, [query]);

  return (
    <div>
      <p className="text-gray-600">Explore and search for stunning images from Unsplash.</p>
      <div className="flex rounded-md border-2 border-blue-500 mt-4 overflow-hidden max-w-3xl mx-auto">
          <input 
            id="search-input"
            type="text" 
            value={localQuery}
            placeholder="Search for images..." 
            onChange={(e) => setLocalQuery(e.target.value)}
            aria-label="Search images"
            className="w-full bg-white text-gray-600 text-sm px-4 py-3 focus:outline-none focus:ring-0" />
            {localQuery && (
              <button className="bg-white flex items-center justify-center px-3 text-gray-950 cursor-pointer hover:text-red-400" aria-label="Clear Input"
              onClick={() => {setLocalQuery("")}}> 
                 x
              </button>
            )}
            <button aria-label="Refine Results"
              className="px-3 flex items-center justify-center bg-gray-200 hover:bg-gray-400 text-gray-900 cursor-pointer hover:text-blue-700"
              onClick={()=>onRefineClick()}
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>
      </div>
    </div>
  )
}

export default SearchBar