// "npm run server" TO BEGIN THE SERVER
// Initializing express and dotenv
const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const {errorHandler} = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;

// Initializing fs
const fs = require('fs');
const superheroInfoData = require('./heroData/superhero_info.json');
const superheroPowersData = require('./heroData/superhero_powers.json');

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/lists', require('./routes/listRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Using errorHandler middleware to overwrite default error handler
app.use(errorHandler);

const {body, param, query} = require('express-validator');

// ******************** Node.js and Express back-end for item #1 (Getting all superhero info for given ID) ******************** //

// Defining route for retriving superhero info by ID
app.get('/api/superhero/:id', [param('id').isInt().toInt(),], (req, res) => { // Would be like localhost:3000/api/superhero/0
    const superheroID = parseInt(req.params.id);
  
    const superhero = superheroInfoData.find(hero => hero.id === superheroID);
    if (superhero) { // superhero will be True once there is a match with the requested ID
      res.json(superhero);
    } else {
      res.status(404).json({message: 'Superhero not found!!!'});
    }
  });
  
  // ************************************************************ END ************************************************************ //
  
  // ******************** Node.js and Express back-end for item #2 (Getting all powers for given ID) ******************** //
  
  // Defining route for retriving powers
  app.get('/api/superhero/:id/powers',[param('id').isInt().toInt(),], (req, res) => {
    const superheroID = parseInt(req.params.id);
  
    try {
      // Search for a superhero by ID in superheroInfoData.json
      const shInfoFound = superheroInfoData.find(hero => hero.id === superheroID);
  
      if (shInfoFound) {
        const heroName = shInfoFound.name;
        // Get all the powers of that superhero
        const superheroPowers = superheroPowersData.find(hero => hero.hero_names === heroName);
  
        if (superheroPowers) {
          // Filtering through all the powers that contain the value 'True'
          const powersList = Object.keys(superheroPowers).filter(key => key !== 'hero_names' && superheroPowers[key] === 'True');
  
          // Returns the list of powers as a JSON object
          return res.json({powers: powersList});
        } else {
          return res.status(404).json({message: 'Superhero powers were not found'});
        }
      } else {
        return res.status(404).json({message: 'Superhero not found'});
      }
    } catch (error) {
      return res.status(500).json({message: 'Error parsing JSON data'});
    }
  });
  
  // ************************************************************ END ************************************************************ //
  
  // ******************** Node.js and Express back-end for item #3 (Getting all available publishers) ******************** //
  
  app.get('/api/publishers',[query().isEmpty(),], (req, res) => {
    try {
      // Use the map function to transform the array of just publishers
      // Also use new Set to prevent duplicate instances of publishers
      // '...' to convert the new created Set back into an array to be returned
      const publishers = [...new Set(superheroInfoData.map(hero => hero.Publisher))];
  
      // Removing empty strings from the publishers array
      const filteredPublishers = publishers.filter(publisher => publisher.trim() !== "");
  
      return res.json({publishers: filteredPublishers});
    } catch (error) {
      return res.status(500).json({message: 'Error processing JSON data'});
    }
  });
  
  // ************************************************************ END ************************************************************ //
  
  // ******************** Node.js and Express back-end for item #4 (Getting n results for given field and pattern) ******************** //
  
  // EXAMPLE URL to TEST: http://localhost:3000/api/match?field=Marvel%20Comics&pattern=Publisher&n=5
  // Define a new route for matching superheroes
  app.get('/api/match', [query('field').isString().trim(),query('pattern').isString().trim(),], (req, res) => {
    const field = req.query.field; // Get the field parameter from the query string (USER INPUT)
    const pattern = req.query.pattern; // Get the pattern parameter from the query string (Will be Name, Race, Publisher, or Power)
    const n = parseInt(req.query.n); // Get the n parameter from the query string
    console.log(field)
    console.log(pattern)
    // Check if the field and pattern parameters are provided
    if (!field || !pattern) {
      return res.status(400).json({message: 'Field and pattern parameters are required.'});
    }
  
    const matches = [];
    
    superheroInfoData.forEach(hero => {
      const patternValue = hero[pattern];
  
      if (patternValue && patternValue.includes(field)) {
        matches.push(hero.id);
      }
  
      if (n && matches.length >= n) {
        return;
      }
    });
  
    const matchedSuperheroes = matches.slice(0, n);
  
    return res.json({matchedSuperheroes});
  });
  
  // ************************************************************ END ************************************************************ //
  
  app.get('/api/search',[
    query('field').not().isEmpty().withMessage('Field parameter is required'),
    query('pattern').not().isEmpty().withMessage('Pattern parameter is required'),
    query('n').optional().isInt().withMessage('N must be an integer'),], (req, res) => {
    const field = req.query.field; // Get the search field (e.g., power)
    const pattern = req.query.pattern; // Get the search pattern (e.g., True)
    const n = parseInt(req.query.n); // Get the number of results (optional)
  
    if (!field || !pattern) {
      return res.status(400).json({ message: 'Field and pattern parameters are required.' });
    }
  
    const matchingHeroes = [];
  
    superheroPowersData.forEach(hero => {
      if (hero[field] === pattern) {
        const superheroInfo = superheroInfoData.find(info => info.name === hero.hero_names);
        if (superheroInfo) {
          matchingHeroes.push(superheroInfo);
        }
        if (n && matchingHeroes.length >= n) {
          return;
        }
      }
    });
  
    return res.json({ matchedHeroes: matchingHeroes });
  });

app.listen(port, ()=> console.log(`Listening on port ${port}`));