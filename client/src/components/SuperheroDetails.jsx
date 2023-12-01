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

  return (
    <div>
      <h3>{`ID: ${superheroID}`}</h3>
      <p>{`Name: ${superheroInfo.name}`}</p>
      {showDetails && (
        <div>
          <p>{`Race: ${superheroInfo.race || 'Unknown'}`}</p>
          <p>{`Publisher: ${superheroInfo.publisher || 'Unknown'}`}</p>
          {superheroPowers.length > 0 && (
            <p>{`Powers: ${superheroPowers.join(', ')}`}</p>
          )}
          {/* Add other superhero details as needed */}
        </div>
      )}
      <button onClick={toggleDetails}>
        {showDetails ? 'Hide Details' : 'Show Details'}
      </button>
    </div>
  );
};

export default SuperheroDetails;
