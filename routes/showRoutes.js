// Description: This file contains all the routes for the show model
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



// GET all shows
router.get('/', async (req, res) => {
    const shows = await Show.findAll();
    res.json(shows);
});


// GET one show
router.get('/:id', async (req, res) => {
    const show = await Show.findByPk(req.params.id);
    res.json(show);
});

// GET shows of a particular genre (genre in req.params)
router.get('/:id/shows/genre/:genre', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    const shows = await user.getShows({
        where: { genre: req.params.genre }
    });
    res.json(shows);
});

// PUT update rating of a show that has been watched
router.put('/:id/shows/:showId/rating', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    const show = await Show.findByPk(req.params.showId);
    await user.updateShow(show, { rating: req.body.rating });
    res.json(show);
});

// PUT update the status of a show 
router.put('/:id/shows/:showId/status', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    const show = await Show.findByPk(req.params.showId);
    await user.updateShow(show, { status: req.body.status });
    res.json(show);
});

// DELETE a show
router.delete('/:id/shows/:showId', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    const show = await Show.findByPk(req.params.showId);
    await user.removeShow(show);
    res.json(show);
});

module.exports = router;




