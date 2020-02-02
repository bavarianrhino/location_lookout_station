// const uuid = require('uuid/v4')
const HttpError = require('../models/http-error')

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


// router.get('/:pid', (req, res, next) => {
const getPlaceById = (req, res, next) => {
    console.log("GET PLACE /:pid");
    const placeId = req.params.pid; // { pid: 'place1' }
    const place = DUMMY_PLACES.find(p => {
        return p.id === placeId;
    })
    if (!place) {
        // Below replaces...return res.status(404).json({ message: "Could not find a place for the provided id."})
        // Use throw for synchronous and next() for asynchronous
        // const error = new Error('Could not find a place for the provided id.')
        // error.code = 404;
        // throw error; // Don't need to use 'return'
        throw new HttpError('Could not find a place for the provided id.', 404)
    }
    // res.json({ message: 'It Works!' });
    // res.json({ place: place }); // Which is then shortened to...
    res.json({place}); // => { place } => { place: place }
};


// router.get('/user/:uid', (req, res, next) => {
const getPlaceByUserId = (req, res, next) => {
    console.log("GET PLACES for USER /:uid");
    const userId = req.params.uid; // { uid: 'u1' }
    const places = DUMMY_PLACES.find(p => {
        return p.creator === userId;
    })
    if (!places) {
        // Below replaces...return res.status(404).json({ message: "Could not find a place for the provided id."})
        // Use throw for synchronous and next() for asynchronous
        // const error = new Error('Could not find a place for the provided id.')
        // error.code = 404;
        // return next(error) // Need to use return with next()
        return next(new HttpError('Could not find a place for the provided id.', 404))
    }
    res.json({places});
};


// To test this controller and route, use Postman
// http://localhost:5000/api/places
// In the body pick raw, and use json
// { 
//    "title": "New York Stock Exchange",
//    "description": "Where the money lives",
//    "creator": "u2",
//    "address": "11 Wall St, New York, NY 10005",
//    "coordinates": {
//          "lat": 40.7063069,
//          "lng": -74.010329
//    }
// }
const createPlace = (req, res, next) => {
    const { title, description, coordinates, address, creator } = req.body
    // Above is shorthand for const title = req.body.title;
    const createdPlace = {
        title: title,
        description: description,
        location: coordinates,
        address: address,
        creator: creator
    };

    DUMMY_PLACES.push(createdPlace)
    
    res.status(201).json({ place: createdPlace })
};

exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace = createPlace;