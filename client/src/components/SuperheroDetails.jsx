import React, { useEffect, useState } from 'react';
import searchService from '../features/search/searchService';

const SuperheroDetails = ({ superheroID }) => {
  const [superheroInfo, setSuperheroInfo] = useState({});
  const [superheroPowers, setSuperheroPowers] = useState([]);

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

  return (
    <div>
      <h3>{`ID: ${superheroID}`}</h3>
      <p>{`Name: ${superheroInfo.name}`}</p>
      {/* Add other superhero properties as needed */}
      {superheroPowers.length > 0 && (
        <p>{`Powers: ${superheroPowers.join(', ')}`}</p>
      )}
      {/* Add other superhero details as needed */}
    </div>
  );
};

export default SuperheroDetails;
