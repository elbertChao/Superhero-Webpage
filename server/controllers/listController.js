const asyncHandler = require('express-async-handler');

// @Desc Gets the lists stored
// @Route GET /api/lists
// @Access Private
const getLists = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Get lists' });
});

// @Desc Set a list
// @Route POST /api/lists
// @Access Private
const setList = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400);
        throw new Error('Please add text field');
    }

    res.status(200).json({ message: 'Set list' });
});

// @Desc Update a list
// @Route PUT /api/lists/:id
// @Access Private
const updateList = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Update list ${req.params.id}` });
});

// @Desc Delete a list
// @Route DELETE /api/lists/:id
// @Access Private
const deleteList = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Delete list ${req.params.id}` });
});

module.exports = {
    getLists, setList, updateList, deleteList,
}