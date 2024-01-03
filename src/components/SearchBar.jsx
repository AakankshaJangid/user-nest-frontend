import React from 'react';

const SearchBar = ({ setSearchQuery }) => {
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className='flex gap-6 justify-center items-center'>
      <h2>Search Bar</h2>
      <input type="text" placeholder="Search..." onChange={handleSearch} className='bg-transparent outline-none border-b-2 border-[#fa7b7b] text-[#fa7b7b]' />
    </div>
  );
};

export default SearchBar;
