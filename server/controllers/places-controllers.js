const uuid = require('uuid/v4') //v4 gives a timestamp along with a unique id
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error')

let DUMMY_PLACES = [
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
const getPlacesByUserId = (req, res, next) => {
    console.log("GET PLACES for USER /:uid");
    const userId = req.params.uid; // { uid: 'u1' }
    const places = DUMMY_PLACES.filter(p => {
        return p.creator === userId;
    })
    if (!places || places.length === 0) {
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
    const errors = validationResult(req);//

    if (!errors.isEmpty()) {
        console.log(errors)
        throw new HttpError('Invalid inputs passed, please try again!', 422)
    }

    const { title, description, coordinates, address, creator } = req.body
    // Above is shorthand for const title = req.body.title;
    const createdPlace = {
        id: uuid(),
        title: title,
        description: description,
        location: coordinates,
        address: address,
        creator: creator
    };

    DUMMY_PLACES.push(createdPlace)
    
    res.status(201).json({ place: createdPlace })
};

const updatePlaceById = (req, res, next) => {
    const errors = validationResult(req);//

    if (!errors.isEmpty()) {
        console.log(errors)
        throw new HttpError('Invalid inputs passed, please try again!', 422)
    }
    
    console.log("EDIT PLACE /:pid");
    const { title, description } = req.body // Only allowing user to edit title and description.
    const placeId = req.params.pid; // { pid: 'p1' }

    // Want to update in an immutable way
    const updatedPlace = { ...DUMMY_PLACES.find(p => p.id === placeId) };
    const placeIndex = DUMMY_PLACES.findIndex(p => p.id === placeId);
    updatedPlace.title = title;
    updatedPlace.description = description;

    DUMMY_PLACES[placeIndex] = updatedPlace;

    res.status(200).json({ place: updatedPlace })
}


const deletePlaceById = (req, res, next) => {
    console.log("DELETE PLACE /:pid");
    const placeId = req.params.pid; // { pid: 'place1' }
    // Filter returns new array for every condition that is true
    // In order to remove, we return all places that dont have the placeId of the deleted place using !==
    DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== placeId)

    res.status(200).json({ message: "Deleted place!"})
}


exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlaceById = updatePlaceById;
exports.deletePlaceById = deletePlaceById;