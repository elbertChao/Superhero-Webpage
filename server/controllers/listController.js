const asyncHandler = require('express-async-handler');
const List = require('../models/listModel');

// @Desc Gets a specific user's lists
// @Route GET /api/lists
// @Access Private
const getLists = asyncHandler(async (req, res) => {
    const lists = await List.find({ user: req.user.id });

    res.status(200).json(lists);
});

// @Desc Set a list
// @Route POST /api/lists
// @Access Private if logged in, Public if not logged in
const setList = asyncHandler(async (req, res) => {
    if (!req.body.title || !req.body.superheroIds) {
        res.status(400);
        throw new Error('Please provide both title and superheroIds');
    }

    let list;

    // Check if the user is logged in
    if (req.user) {
        list = await List.create({
            title: req.body.title,
            superheroIds: req.body.superheroIds,
            user: req.user.id,
        });
    } else {
        // If no user is logged in, create a public list
        list = await List.create({
            title: req.body.title,
            superheroIds: req.body.superheroIds,
        });
    }

    res.status(200).json(list);
});

// @Desc Update a list
// @Route PUT /api/lists/:id
// @Access Private
const updateList = asyncHandler(async (req, res) => {
    const list = await List.findById(req.params.id);

    if (!list) {
        res.status(400);
        throw new Error('List not found');
    }

    // Checks for user, if an ID was found
    if (!req.user) {
        res.status(401);
        throw new Error('User not found!');
    }

    // if the list's user id is not equal to the user that is trying to view the list
    // Make sure logged in user matches the same as the one that created the list
    if (list.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    const updatedList = await List.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        superheroIds: req.body.superheroIds,
    }, {
        new: true,
    });

    res.status(200).json(updatedList);
});

// @Desc Delete a list
// @Route DELETE /api/lists/:id
// @Access Private
const deleteList = asyncHandler(async (req, res) => {
    const list = await List.findById(req.params.id);

    if (!list) {
        res.status(400);
        throw new Error('List not found');
    }

    // Checks for user, if an ID was found
    if (!req.user) {
        res.status(401);
        throw new Error('User not found!');
    }

    // if the list's user id is not equal to the user that is trying to view the list
    // Make sure logged in user matches the same as the one that created the list
    if (list.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    await list.deleteOne();

    res.status(200).json({ id: req.params.id });
});

module.exports = {
    getLists, setList, updateList, deleteList,
};
