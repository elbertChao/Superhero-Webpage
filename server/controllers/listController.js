const asyncHandler = require('express-async-handler');

const List = require('../models/listModel');

// @Desc Gets the lists stored
// @Route GET /api/lists
// @Access Private
const getLists = asyncHandler(async (req, res) => {
    const lists = await List.find();

    res.status(200).json(lists);
});

// @Desc Set a list
// @Route POST /api/lists
// @Access Private
const setList = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400);
        throw new Error('Please add text field');
    }

    const list = await List.create({
        text: req.body.text
    });

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

    const updatedList = await List.findByIdAndUpdate(req.params.id, req.body,
        {
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

    await list.deleteOne()

    res.status(200).json({ id: req.params.id });
});

module.exports = {
    getLists, setList, updateList, deleteList,
}