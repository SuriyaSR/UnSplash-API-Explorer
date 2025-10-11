interface SearchBarProps {
  query: string;
  setQuery: (value: string) => void;
  searchPhotos: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({query, setQuery, searchPhotos}) => {

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
     searchPhotos();
    }
  }
  
  return (
    <div>
      <p className="text-gray-600">Explore and search for stunning images from Unsplash.</p>
      <div className="flex rounded-md border-2 border-blue-500 mt-4 overflow-hidden max-w-3xl mx-auto">
          <input type="text" value={query} 
            placeholder="Search for images..." 
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-white text-gray-600 text-sm px-4 py-3 focus:outline-none focus:ring-0" />
            {query && (
              <button className="flex items-center justify-center px-3 text-gray-950 cursor-pointer hover:text-gray-600" 
              onClick={() => {setQuery("")}}>
                 x
              </button>
            )}
          <button className="flex items-center justify-center bg-[#007bff] px-5 cursor-pointer hover:bg-[#0069d9]" onClick={searchPhotos}>
              Search
          </button>                                
      </div>
    </div>
  )
}

export default SearchBar
