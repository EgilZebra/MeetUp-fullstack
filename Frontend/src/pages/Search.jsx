import React, { useState } from 'react';
import SearchBar from "@/components/ui/SearchBar";

function Search() {
  const [results, setResults] = useState([]); // State to store search results
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (searchTerm) => {
    console.log('Searching for:', searchTerm);
    setLoading(true);
    setError(null); // Reset error state

    try {
      const response = await fetch(`https://glgh7httw0.execute-api.eu-north-1.amazonaws.com/Search-meetups?query=${encodeURIComponent(searchTerm)}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch search results');
      }

      const data = await response.json();
      console.log('Full search results:', data); // Log full response data
      
      // Check if data is an array and set results
      if (Array.isArray(data.data)) {
        const filteredResults = data.data.filter(meeting =>
          meeting.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          meeting.city.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setResults(filteredResults); // Store filtered results in state
        console.log('Filtered search results:', filteredResults); // Log filtered results
      } else {
        console.error('Unexpected data format:', data);
        setResults([]); // Reset results if not an array
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.message); // Set error message for display
    } finally {
      setLoading(false); // Set loading to false after the request
    }
  };

  return (
    <div>
      <h1>Search Meetups</h1>
      <SearchBar placeholder="Search for meetups..." onSearch={handleSearch} />
      {loading && <p>Loading...</p>} {/* Display loading state */}
      {error && <p>Error: {error}</p>} {/* Display error state */}
      <ul>
        {results.map((result) => (
          <li key={result.MeetingId}>
            {result.name} - {result.city} - {result.starttime} {/* Adjust to display other properties as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Search;