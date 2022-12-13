// initialize the server
const express = require('express');
const seed = require('./seed');
const app = express();
const port = 3000;

// import models
const { Show } = require('./models/Show');
const { User } = require('./models/User');
const { db } = require('./db');
const {router} = require('./routes/routes');

// express router
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


// const router = express.Router();
// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

// app.get('/shows', async (req, res) => {
//     const shows = await Show.findAll();
//     res.json(shows);
// });

// app.get('/users', async (req, res) => {
//     const users = await User.findAll();
//     res.json(users);
// });

// app.get('/users/:id', async (req, res) => {
//     const user = await User.findByPk(req.params.id);
//     res.json(user);
// });

// app.post('/users', async (req, res) => {
//     const user = await User.create(req.body);
//     res.json(user);
// });

// app.put('/users/:id', async (req, res) => {
//     const user = await User.update(req.body, {
//         where: { id: req.params.id }
//     });
//     res.json(user);
// });



// start the server
app.listen(port, () => {
    db.sync()
    console.log(`Example app listening at http://localhost:${port}`);
});


