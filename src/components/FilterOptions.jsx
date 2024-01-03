import React from 'react';

const FilterOptions = ({ setFilterType }) => {
  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
  };

  return (
    <div className='flex gap-4 items-center justify-center'>
      <h2>Filter Options</h2>
      <select onChange={handleFilterChange} className='p-2 text-xs bg-transparent outline-none text-[#fa7b7b]'>
        <option value="A-Z">A-Z</option>
        <option value="Z-A">Z-A</option>
      </select>
    </div>
  );
};

export default FilterOptions;
