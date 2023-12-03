const express = require('express');
const router = express.Router();
// Getting the methods from listController.js
const {
    getLists,
    setList,
    updateList,
    deleteList,
} = require('../controllers/listController');

const { protect } = require('../middleware/authMiddleware');

const {body, param, query} = require('express-validator');

// Combine common routes, to clean code
router.route('/').get(protect, getLists).post(protect, setList);
router.route('/:id').delete(protect, deleteList).put(protect, updateList);

// ******************** Node.js and Express back-end for item #5 (Create lists with given names) ******************** //

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
  
  // ************************************************************ END ************************************************************ //
  
  // ******************** Node.js and Express back-end for item #6 (Save list data) ******************** //
  
  // Creating route to save hero IDs to given list name
  router.post('/api/lists/save/:listName',[
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
  router.get('/api/lists/:listName',[param('listName').not().isEmpty().withMessage('List name is required'),], (req, res) => {
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
  router.delete('/api/lists/delete/:listName', (req, res) => {
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