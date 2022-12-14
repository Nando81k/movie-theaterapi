// Description: This file contains all the routes for the user model
const express = require('express');
const app = express();
const port = 3000;

// express router
const router = express.Router();

// import models
const { Show } = require('../models/Show');
const { User } = require('../models/User');
const { db } = require('../db');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(express.static('public'));

// GET all users
router.get('/', async (req, res) => {
    const users = await User.findAll();
    res.json(users);
});

// GET one user
router.get('/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    res.json(user);
});

// GET all shows of a user
router.get('/:id/shows', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    const show = await user.getShows();
    res.json(show);
});

// `PUT` update and add a show if a user has watched it
router.put('/:id/shows/:showId', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    const show = await Show.findByPk(req.body.showId);
    await user.addShow(show);
    res.json(show);
});

module.exports = router;