import React, { useEffect, useState } from 'react';
import searchService from '../features/search/searchService';

// SuperheroDetails component to display details of a superhero
const SuperheroDetails = ({ superheroID }) => {
  // State hooks for superhero information, powers, and visibility of details
  const [superheroInfo, setSuperheroInfo] = useState({});
  const [superheroPowers, setSuperheroPowers] = useState([]);
  const [showDetails, setShowDetails] = useState(false);

  // useEffect hook to fetch superhero information and powers on component mount
  useEffect(() => {
    // Function to fetch superhero information and powers
    const fetchSuperheroInfo = async () => {
      try {
        // Call the getSuperheroInfo method from searchService
        const info = await searchService.getSuperheroInfo(superheroID);
        // Update the superheroInfo state with the fetched information
        setSuperheroInfo(info);

        // Call the getSuperheroPowers method from searchService
        const powers = await searchService.getSuperheroPowers(superheroID);
        // Update the superheroPowers state with the fetched powers
        setSuperheroPowers(powers);
      } catch (error) {
        // Handle errors by logging to the console
        console.error('Error fetching superhero details:', error.message);
      }
    };

    // Call the fetchSuperheroInfo function
    fetchSuperheroInfo();
  }, [superheroID]); // Run the effect when the superheroID changes

  // Function to toggle the visibility of details
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  // Function to generate DuckDuckGo search link for DDG LINK
  const generateSearchLink = (searchQuery) => {
    return `https://duckduckgo.com/?q=${encodeURIComponent(searchQuery)}`;
  };

  // Render the SuperheroDetails component
  return (
    <div>
      {/* Display superhero ID and name */}
      <h3>{`ID: ${superheroID}`}</h3>
      <p>{`Name: ${superheroInfo.name}`}</p>

      {/* Display additional details if showDetails is true */}
      {showDetails && (
        <div>
          <p>{`Race: ${superheroInfo.Race || 'Not found'}`}</p>
          <p>{`Publisher: ${superheroInfo.Publisher || 'Not found'}`}</p>

          {/* Display powers if available */}
          {superheroPowers.length > 0 && (
            <p>{`Powers: ${superheroPowers.join(', ')}`}</p>
          )}

          {/* Display DDG search link */}
          <h4>
            <a
              href={generateSearchLink(superheroInfo.name)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Click here for DDG Search
            </a>
          </h4>
        </div>
      )}

      {/* Button to toggle the visibility of details */}
      <button onClick={toggleDetails}>
        {showDetails ? 'Hide Details' : 'Show Details'}
      </button>
    </div>
  );
};

// Exporting the SuperheroDetails component as the default export
export default SuperheroDetails;
