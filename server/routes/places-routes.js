const express = require('express');

const router = express.Router();

const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'Famous sky scraper in New York City!',
        location: {
            lat: 40.7484474,
            lng: -73.9871516
        },
        address: '20 W 34th St, New York, NY 10001',
        creator: 'u1'
    }
]

// Routes need to ordered least to more specific // 

router.get('/:pid', (req, res, next) => {
    console.log("GET PLACE /:pid");
    const placeId = req.params.pid; // { pid: 'place1' }
    const place = DUMMY_PLACES.find(p => {
        return p.id === placeId;
    })
    // res.json({ message: 'It Works!' });
    // res.json({ place: place }); // Which is then shortened to...
    res.json({place}); // => { place } => { place: place }
});

router.get('/user/:uid', (req, res, next) => {
    console.log("GET PLACES for USER /:uid");
    const userId = req.params.uid; // { uid: 'u1' }
    const places = DUMMY_PLACES.find(p => {
        return p.creator === userId;
    })
    res.json({places});
});

module.exports = router;