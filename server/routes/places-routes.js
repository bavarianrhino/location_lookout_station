const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    console.log("GET router request in Places Routes");
    res.json({ message: 'It Works!' });
});

module.exports = router;