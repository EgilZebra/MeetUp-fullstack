import React from 'react';
import SearchBar from "@/components/ui/SearchBar";

function Search() {
  const handleSearch = async (searchTerm) => {
    console.log('Searching for:', searchTerm);
    
    try {
      // Make a GET request to fetch meetups based on the search term
      const response = await fetch(`https://glgh7httw0.execute-api.eu-north-1.amazonaws.com/Search-meetups?query=${encodeURIComponent(searchTerm)}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch search results');
      }

      const data = await response.json();
      console.log('Search results:', data);
      // Here you could set the data to state and render results on the page
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h1>Search Meetups</h1>
      <SearchBar placeholder="Search for meetups..." onSearch={handleSearch} />
      {/* Render search results here, if needed */}
    </div>
  );
}

export default Search;
