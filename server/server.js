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
  
  // GET ALL HEROES IF SEARCH IS EMPTY
  // app.get('/api/superheroes/all', (req, res) => {
  //   const allSuperheroes = superheroInfoData; // Assuming superheroInfoData contains all superhero information
  //   res.json(allSuperheroes);
  // });


  // ******************** Node.js and Express back-end for item #4 (Getting n results for given field and pattern) ******************** //
  
  // EXAMPLE URL to TEST: http://localhost:3000/api/match?field=Marvel%20Comics&pattern=Publisher&n=5
  // Define a new route for matching superheroes
  app.get('/api/match', [query('field').isString().trim(),query('pattern').isString().trim(),], (req, res) => {
    const field = req.query.field; // Get the field parameter from the query string (USER INPUT)
    const pattern = req.query.pattern; // Get the pattern parameter from the query string (Will be Name, Race, Publisher, or Power)
    const n = parseInt(req.query.n); // Get the n parameter from the query string
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

  // ******************** Node.js and Express back-end for item #5 (Create lists with given names) ******************** //

// Define a new route for creating new lists
app.post('/api/lists/create', [body('name').isString().isLength({ min: 1, max: 20 }).trim(),], (req, res) => {
  const listName = req.body.name; // Get the list name from the request body

  // listExists becomes true if list already exists
  const listExists = listDB.get('superheroLists').some({name: listName}).value();

  if (listExists) { // Check if list already exists, return error msg
    return res.status(400).json({message: 'List name already exists'});
  }

  // Creates new empty lists, preparing to store superheroes in
  const newList = {
    // Name of the list itself
    name: listName, 
    superheroes: [],  // empty array of superheroes
  };

  // Add the new list to the lowdb database, writing to lists.json
  listDB.get('superheroLists').push(newList).write();

  return res.status(201).json(newList);
});

// ************************************************************ END ************************************************************ //

// ******************** Node.js and Express back-end for item #6 (Save list data) ******************** //

// Creating route to save hero IDs to given list name
app.post('/api/lists/save/:listName',[
  param('listName').not().isEmpty().withMessage('List name is required'),
  body('superheroes').isArray().withMessage('Superheroes must be array'),
  body('superheroes.*').isInt().withMessage('Superhero IDs must be integers'),
], (req, res) => {
  const listName = req.params.listName; // Gets the list name from the URL request parameter

  // Finds the list by name in the database of previously created lists
  const existingList = listDB.get('superheroLists').find({name: listName}).value();

  if (!existingList) {
    // Return an error if the list name does not exist
    return res.status(404).json({message: 'List not found'});
  }

  const superheroIDs = req.body.superheroes; // Get the array of superhero IDs from the request body (content body of a JSON)

  // Update the superheroes attribute in the existing list in json file
  existingList.superheroes = superheroIDs;

  // Write the updated list back to the database (assuming you're using lowdb)
  listDB.write();

  return res.status(200).json(existingList);
});

// ************************************************************ END ************************************************************ //

// ******************** Node.js and Express back-end for item #7 (Get list data) ******************** //

// Creating route to get list hero IDs
app.get('/api/lists/:listName',[param('listName').not().isEmpty().withMessage('List name is required'),], (req, res) => {
  const listName = req.params.listName; // Get the list name from the URL parameter

  // Search database for list
  const existingList = listDB.get('superheroLists').find({name: listName}).value();

  if (!existingList) {
    // List not found, return error 404
    return res.status(404).json({ message: 'List not found' });
  }

  // Get all IDs
  const superheroes = existingList.superheroes;

  return res.status(200).json({superheroes});
});

// ************************************************************ END ************************************************************ //

// ******************** Node.js and Express back-end for item #8 (Delete list) ******************** //

// Creating route for deleting lists
app.delete('/api/lists/delete/:listName', (req, res) => {
  const listName = req.params.listName; // Get list name from the URL

  // Search for the list in database by the name given in URL
  const existingList = listDB.get('superheroLists').find({ name: listName }).value();

  if (!existingList) {
    // Already doesn't exist so return error 404
    return res.status(404).json({message: 'List not found'});
  }

  // Delete the existing list from the database
  listDB.get('superheroLists').remove({name: listName}).write();

  return res.status(204).send(); // Code 204 indicates successful delete
});

// ************************************************************ END ************************************************************ //

// ******************** Node.js and Express back-end for item #9 (Get all superhero data) ******************** //

// Create a route to get the names, information, and true powers of superheroes in a given list
app.get('/api/lists/:listName/superheroes',[param('listName').isString().notEmpty(),], (req, res) => {
  const listName = req.params.listName; // Get the list name from the URL parameter

  // Find the list by name in the database
  const existingList = listDB.get('superheroLists').find({ name: listName }).value();

  if (!existingList) {
    // Return an error if the list name does not exist
    return res.status(404).json({ message: 'List not found' });
  }

  // Get the superhero IDs from the existing list
  const superheroIDs = existingList.superheroes;

  // Find superheroes with matching IDs in superheroInfoData and get their details
  const superheroes = superheroInfoData.filter(hero => superheroIDs.includes(hero.id));

  // Retrieve superhero powers for each superhero
  const superheroPowers = {}; // Create object type to include into the json object for powers
  superheroes.forEach(hero => {
    const heroPowers = superheroPowersData.find(powers => powers.hero_names === hero.name);
    if (heroPowers) {
      // Only add powers that are not the hero's name itself and has value True
      const filteredPowers = Object.entries(heroPowers).filter(([key, value]) => key !== 'hero_names' && value === 'True').map(([key]) => key);

      superheroPowers[hero.name] = filteredPowers; // Adds powers to their corresponding hero.name field
    }
  });

  // Mapping hero info, to display hero data
  const superHeroesWithInfoAndPowers = superheroes.map(hero => ({
    name: hero.name,
    info: {
      Gender: hero.Gender,
      "Eye color": hero["Eye color"],
      Race: hero.Race,
      "Hair color": hero["Hair color"],
      Height: hero.Height,
      Publisher: hero.Publisher,
      "Skin color": hero["Skin color"],
      Alignment: hero.Alignment,
      Weight: hero.Weight,
    },
    powers: superheroPowers[hero.name] || [], // List all the corresponding powers
  }));

  return res.status(200).json(superHeroesWithInfoAndPowers);
});

app.listen(port, ()=> console.log(`Listening on port ${port}`));