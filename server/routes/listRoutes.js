const express = require('express');
const router = express.Router();

const {body, param, query} = require('express-validator');

// Define a new route for creating new lists
router.post('/api/lists/create', [body('name').isString().isLength({ min: 1, max: 20 }).trim(),], (req, res) => {
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

// Create a route to get the names, information, and true powers of superheroes in a given list
router.get('/api/lists/:listName/superheroes',[param('listName').isString().notEmpty(),], (req, res) => {
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

module.exports = router;