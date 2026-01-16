import { useState, useEffect } from "react";

interface SearchBarProps {
  query: string;
  setQuery: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({query, setQuery}) => {
  // 1. Local state to hold the input value immediately
  const [localQuery, setLocalQuery] = useState(query);

  // 2. useEffect to update the parent only after a delay (Debounce)
  useEffect(() => {
    const handler = setTimeout(() => {
      setQuery(localQuery);
    }, 300); // Wait 300ms after typing stops

    return () => clearTimeout(handler);
  }, [localQuery, setQuery]);

  // 3. Sync if parent updates query
  useEffect(() => {
    setLocalQuery(query);
  }, [query]);

  return (
    <div>
      <p className="text-gray-600">Explore and search for stunning images from Unsplash.</p>
      <div className="flex rounded-md border-2 border-blue-500 mt-4 overflow-hidden max-w-3xl mx-auto">
          <input type="text" 
            value={localQuery}
            placeholder="Search for images..." 
            onChange={(e) => setLocalQuery(e.target.value)}
            aria-label="Search images"
            className="w-full bg-white text-gray-600 text-sm px-4 py-3 focus:outline-none focus:ring-0" />
            {localQuery && (
              <button className="focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center justify-center px-3 text-gray-950 cursor-pointer hover:text-gray-600" aria-label="Clear Input"
              onClick={() => {setLocalQuery("")}}> 
                 x
              </button>
            )}                                
      </div>
    </div>
  )
}

export default SearchBar