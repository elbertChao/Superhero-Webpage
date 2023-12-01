const searchHeroes = async (field, pattern, n) => {
    const matchedAPIURL = `/api/match?field=${field}&pattern=${pattern}&n=${n || 5}`;
  
    try {
      const res = await fetch(matchedAPIURL);
      if (!res.ok) {
        throw new Error('Matched superheroes not found');
      }
  
      const data = await res.json();
      return data.matchedSuperheroes;
    } catch (error) {
      throw new Error('Error searching for superheroes: ' + error.message);
    }
  };
  
  const getSuperheroInfo = async (superheroID) => {
    const superheroInfoAPIURL = `/api/superhero/${superheroID}`;
  
    try {
      const infoResponse = await fetch(superheroInfoAPIURL);
      if (infoResponse.ok) {
        const superhero = await infoResponse.json();
        return superhero;
      } else {
        throw new Error('Error fetching superhero information');
      }
    } catch (error) {
      throw new Error('Error fetching superhero information: ' + error.message);
    }
  };
  
  const getSuperheroPowers = async (superheroID) => {
    const superheroPowersAPIURL = `/api/superhero/${superheroID}/powers`;
  
    try {
      const powersResponse = await fetch(superheroPowersAPIURL);
      if (powersResponse.ok) {
        const powersData = await powersResponse.json();
        return powersData.powers;
      } else {
        throw new Error('Superhero has no powers');
      }
    } catch (error) {
      throw new Error('Error fetching superhero powers: ' + error.message);
    }
  };
  
  const searchService = {
    searchHeroes,
    getSuperheroInfo,
    getSuperheroPowers,
  };
  
  export default searchService;
  