const express = require('express');
const controller = require('../controllers/storyController');
const {isLoggedIn, isAuthor} = require('../middlewares/auth');


const router = express.Router();

//GET /stories: send all stories to the user

router.get('/', controller.index);

//GET /stories/new: send html form for creating a new story

router.get('/new', isLoggedIn, controller.new);

//POST /stories: create a new story

router.post('/',isLoggedIn, controller.create);

//GET /stories/:id: send details of story identified by id
router.get('/:id', controller.show);

//GET /stories/:id/edit: send html form for editing an exising story
router.get('/:id/edit', isLoggedIn,isAuthor,controller.edit);

//PUT /stories/:id: update the story identified by id
router.put('/:id',isLoggedIn,isAuthor, controller.update);

//DELETE /stories/:id, delete the story identified by id
router.delete('/:id', isLoggedIn,isAuthor,controller.delete);

module.exports = router;