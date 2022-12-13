

const express = require('express');
const seed = require('./seed');
const app = express();
const port = 3000;

const router = express.Router();

// import models
const { Show } = require('./models/Show');
const { User } = require('./models/User');
const { db } = require('./db');


router.get('/', async (req, res) => {
    const users = await User.findAll();
    res.json(users);
});

router.get('/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    res.json(user);
});

router.post('/', async (req, res) => {
    const user = await User.create(req.body);
    res.json(user);
});

router.put('/:id', async (req, res) => {
    const user = await User.update(req.body, {
        where: { id: req.params.id }
    });
    res.json(user);
});

router.get('/:id/shows', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    const shows = await user.getShows();
    res.json(shows);
});

router.post('/:id/shows', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    const show = await Show.findByPk(req.body.showId);
    await user.addShow(show);
    res.json(show);
});

router.delete('/:id/shows/:showId', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    const show = await Show.findByPk(req.params.showId);
    await user.removeShow(show);
    res.json(show);
});

router.get('/:id/shows/:showId', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    const show = await Show.findByPk(req.params.showId);
    const userShow = await user.hasShow(show);
    res.json(userShow);
});

module.exports = {router};