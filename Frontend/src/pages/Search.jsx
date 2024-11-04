import { useState } from "react";
import SearchBar from "@/components/ui/Searchbar";
import Overlay from "../components/overlay/Overlay";
const API_URL_BASE =
  process.env.VITE_API_URL == undefined
    ? import.meta.env.VITE_API_URL
    : process.env.VITE_API_URL;
const Search = () => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null); //

  const [results, setResults] = useState([]); // State to store search results
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const handleSearch = async (searchTerm) => {
    console.log("Searching for:", searchTerm);
    setLoading(true);
    setError(null); // Reset error state

    try {
      const response = await fetch(
        `${API_URL_BASE}/Search-meetups?query=${encodeURIComponent(
          searchTerm
        )}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }

      const data = await response.json();
      console.log("Full search results:", data); // Log full response data

      // Check if data is an array and set results
      if (Array.isArray(data.data)) {
        const filteredResults = data.data.filter(
          (meeting) =>
            meeting.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            meeting.city.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setResults(filteredResults); // Store filtered results in state
        console.log("Filtered search results:", filteredResults); // Log filtered results
      } else {
        console.error("Unexpected data format:", data);
        setResults([]); // Reset results if not an array
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message); // Set error message for display
    } finally {
      setLoading(false); // Set loading to false after the request
    }
  };

  const handleMoreInfoClick = (data) => {
    setSelectedData(data);
    console.log("data", data);
    setIsOverlayOpen(true);
  };

  const closeOverlay = () => {
    setIsOverlayOpen(false);
    setSelectedData(null);
  };

  return (
    <>
      <div>
        <h1>Search Meetups</h1>
        <SearchBar
          placeholder="Search for meetups..."
          onSearch={handleSearch}
        />
        {loading && <p>Loading...</p>} {/* Display loading state */}
        {error && <p>Error: {error}</p>} {/* Display error state */}
        <ul>
          {results.map((result) => (
            <li key={result.MeetingId}>
              {result.name} - {result.city} - {result.starttime} -{" "}
              <button onClick={() => handleMoreInfoClick(result)}>
                More Info
              </button>
              {/* Adjust to display other properties as needed */}
            </li>
          ))}
        </ul>
      </div>
      <Overlay
        isOpen={isOverlayOpen}
        selectedMeetup={selectedData}
        onClose={closeOverlay}
      />
    </>
  );
};

export default Search;
