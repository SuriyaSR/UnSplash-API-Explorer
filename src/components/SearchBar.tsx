interface SearchBarProps {
  query: string;
  setQuery: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({query, setQuery}) => {

  return (
    <div>
      <p className="text-gray-600">Explore and search for stunning images from Unsplash.</p>
      <div className="flex rounded-md border-2 border-blue-500 mt-4 overflow-hidden max-w-3xl mx-auto">
          <input type="text" value={query} 
            placeholder="Search for images..." 
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search images"
            className="w-full bg-white text-gray-600 text-sm px-4 py-3 focus:outline-none focus:ring-0" />
            {query && (
              <button className="focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center justify-center px-3 text-gray-950 cursor-pointer hover:text-gray-600" aria-label="Clear Input"
              onClick={() => {setQuery("")}}>
                 x
              </button>
            )}                                
      </div>
    </div>
  )
}

export default SearchBar
