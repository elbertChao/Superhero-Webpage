import React, { useEffect, useState } from 'react';
import searchService from '../features/search/searchService';

const SuperheroDetails = ({ superheroID }) => {
  const [superheroInfo, setSuperheroInfo] = useState({});
  const [superheroPowers, setSuperheroPowers] = useState([]);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const fetchSuperheroInfo = async () => {
      try {
        const info = await searchService.getSuperheroInfo(superheroID);
        setSuperheroInfo(info);

        const powers = await searchService.getSuperheroPowers(superheroID);
        setSuperheroPowers(powers);
      } catch (error) {
        console.error('Error fetching superhero details:', error.message);
      }
    };

    fetchSuperheroInfo();
  }, [superheroID]);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  // Function to generate DuckDuckGo search link for DDG LINK
  const generateSearchLink = (searchQuery) => {
    return `https://duckduckgo.com/?q=${encodeURIComponent(searchQuery)}`;
  };

  return (
    <div>
      <h3>{`ID: ${superheroID}`}</h3>
      <p>{`Name: ${superheroInfo.name}`}</p>
      {showDetails && (
        <div>
          <p>{`Race: ${superheroInfo.Race || 'Not found'}`}</p>
          <p>{`Publisher: ${superheroInfo.Publisher || 'Not found'}`}</p>
          {superheroPowers.length > 0 && (
            <p>{`Powers: ${superheroPowers.join(', ')}`}</p>
          )}
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
      <button onClick={toggleDetails}>
        {showDetails ? 'Hide Details' : 'Show Details'}
      </button>
    </div>
  );
};

export default SuperheroDetails;
