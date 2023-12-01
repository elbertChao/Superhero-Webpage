import React, { useState } from 'react';
import searchService from '../features/search/searchService';
import SuperheroDetails from './SuperheroDetails';

const SearchForm = () => {
  const [field, setField] = useState('');
  const [pattern, setPattern] = useState('');
  const [n, setN] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const matchedSuperheroes = await searchService.searchHeroes(field, pattern, n);
      setSearchResults(matchedSuperheroes);
    } catch (error) {
      console.error('Error performing search:', error.message);
      setSearchResults([]);
    }
  };

  return (
    <section className="form">
      <div className="form-group">
        <label htmlFor="field">Search Field</label>
        <input
          type="text"
          name="field"
          id="field"
          value={field}
          onChange={(e) => setField(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="pattern">Search Pattern</label>
        <input
          type="text"
          name="pattern"
          id="pattern"
          value={pattern}
          onChange={(e) => setPattern(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="n">Number of Results (optional)</label>
        <input
          type="text"
          name="n"
          id="n"
          value={n}
          onChange={(e) => setN(e.target.value)}
        />
      </div>

      <div className="form-group">
        <button className="btn btn-block" type="button" onClick={handleSearch}>
          Search
        </button>
      </div>

      {searchResults.length > 0 && (
        <div>
          <h2>Search Results:</h2>
          {searchResults.map((superheroID) => (
            <div key={superheroID}>
              <SuperheroDetails superheroID={superheroID} />
            </div>
          ))}
        </div>
      )}

      {searchResults.length === 0 && (
        <p>No matching superheroes found</p>
      )}
    </section>
  );
};

export default SearchForm;