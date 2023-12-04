// pages/Home.jsx
import React from 'react';
import SearchForm from '../components/SearchForm';

const Home = () => {
  return (
    <div>
      <h1>SuperheroQuest Hub</h1>
      <p>Here you will find a WebApp that allows you to search for superheroes, along with creating public and private lists of superheroes.</p>

      {/* Include the SearchForm component */}
      <SearchForm />
    </div>
  );
};

export default Home;
