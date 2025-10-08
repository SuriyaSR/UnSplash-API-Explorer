const SearchBar = () => {
  return (
    <div className="flex rounded-md border-2 border-blue-500 mt-4 overflow-hidden max-w-3xl mx-auto">
        <input type="text" placeholder="Search Something..."
            className="w-full bg-white text-gray-600 text-sm px-4 py-3" />
        <button className="flex items-center justify-center bg-[#007bff] px-5 cursor-pointer hover:bg-[#0069d9]">
            Search
        </button>
    </div>
  )
}

export default SearchBar
