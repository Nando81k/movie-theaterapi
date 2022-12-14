// initialize the server
const express = require('express');
const app = express();
const port = 3000;

// initialize server-sided validation
const { check, validationResult } = require('express-validator');

// server-sided validation rules
app.post('/users', [check ('username').not().isEmpty().trim()], 
    (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({error: errors.array()})
    }
    else {
        Object.User.push(req.body);
    }
});


// import models
const { Show } = require('./models/Show');
const { User } = require('./models/User');
const { db } = require('./db');

// import routes
const userRoutes = require('./routes/userRoutes');
const showRoutes = require('./routes/showRoutes');

// express router
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/users', userRoutes);
app.use('/shows', showRoutes);

// server side validation for user input



// start the server
app.listen(port, () => {
    db.sync()
    console.log(`Example app listening at http://localhost:${port}`);
});


