import React, { useState } from 'react';
import searchService from '../features/search/searchService';
import SuperheroDetails from './SuperheroDetails';

// SearchForm component for searching superheroes
const SearchForm = () => {
  // State hooks for form input values and search results
  const [field, setField] = useState('');
  const [pattern, setPattern] = useState('');
  const [n, setN] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Function to handle superhero search
  const handleSearch = async () => {
    try {
      // Call the searchHeroes method from searchService
      const matchedSuperheroes = await searchService.searchHeroes(field, pattern, n);
      
      // Update the searchResults state with the matched superheroes
      setSearchResults(matchedSuperheroes);
    } catch (error) {
      // Handle errors by logging to the console and setting searchResults to an empty array
      console.error('Error performing search:', error.message);
      setSearchResults([]);
    }
  };

  // Render the search form component
  return (
    <section className="form">
      {/* Input field for search field */}
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

      {/* Dropdown for selecting search pattern */}
      <div className="form-group">
        <label htmlFor="pattern">Search Pattern</label>
        <select
          name="pattern"
          id="pattern"
          value={pattern}
          onChange={(e) => setPattern(e.target.value)}
        >
          <option value="">Select a pattern</option>
          <option value="name">Name</option>
          <option value="Race">Race</option>
          <option value="Publisher">Publisher</option>
          <option value="Powers">Powers</option>
        </select>
      </div>
      
      {/* Input field for specifying the number of results (optional) */}
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

      {/* Button to trigger the search */}
      <div className="form-group">
        <button className="btn btn-block" type="button" onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* Display search results if available */}
      {searchResults.length > 0 && (
        <div>
          <h2>Search Results:</h2>
          {searchResults.map((superheroID) => (
            <div key={superheroID}>
              {/* Display SuperheroDetails component for each matching superhero */}
              <SuperheroDetails superheroID={superheroID} />
            </div>
          ))}
        </div>
      )}

      {/* Display message if no matching superheroes found */}
      {searchResults.length === 0 && (
        <p>No matching superheroes found</p>
      )}
    </section>
  );
};

// Exporting the SearchForm component as the default export
export default SearchForm;
