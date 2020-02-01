const express = require('express');

const router = express.Router();

const DUMMY_USERS = [
    {
        id: 'u1',
        name: 'Ryan Riesenberger',
        email: 'rjriesenberger@gmail.com',
        image: "https://www.bobross.com/v/vspfiles/templates/bobrossjoy/images/template/home_bob.png",
        password: "password"
    }
]

router.get('/', (req, res, next) => {
    console.log("GET router request in Users Routes");
});

module.exports = router;