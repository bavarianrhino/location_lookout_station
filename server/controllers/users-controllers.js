const uuid = require('uuid/v4') //v4 gives a timestamp along with a unique id
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error')

const DUMMY_USERS = [
    {
        id: 'u1',
        name: 'Ryan Riesenberger',
        email: 'rjriesenberger@gmail.com',
        image: "https://www.bobross.com/v/vspfiles/templates/bobrossjoy/images/template/home_bob.png",
        password: "password"
    },
    {
        id: 'u2',
        name: 'Woody Harrelson',
        email: 'rjriesenberger@gmail.com',
        image: "https://realdealbrazil.com/img/pages/about/zombieland/poll/woody-rdb-hat.jpg",
        password: "password"
    }
]

const getUsers = (req, res, next) => {
    console.log("GET all Users - /");
    const users = DUMMY_USERS
    if (!users || users.length === 0) {
        return next(new HttpError('Could not find any users.', 401))
    }
    res.status(200).json({users});
}


const signupNewUser = (req, res, next) => {
    const errors = validationResult(req);//

    if (!errors.isEmpty()) {
        console.log(errors)
        throw new HttpError('Invalid inputs passed, please try again!', 422)
    }
    console.log("Signup New User - /signup");
    const { name, email, password } = req.body
    const user = DUMMY_USERS.find(u => {
        return u.email === email;
    })
    if (!!user) {
        throw new HttpError('User with these credentials already exists.', 422)
    }
    const createdUser = {
        id: uuid(),
        name: name,
        email: email,
        password: password
    };

    DUMMY_USERS.push(createdUser)
    
    res.status(201).json({ user: createdUser })
}

const loginUser = (req, res, next) => {
    console.log("Login User - /login");
    const { email, password } = req.body
    const identifiedUser = DUMMY_USERS.find(u => u.email === email)
    if (!identifiedUser) {
        throw new HttpError('Could not identify user, please check credentials', 401)
    }
    res.json({ message: "Logged In!"});
}
exports.getUsers = getUsers;
exports.signupNewUser = signupNewUser;
exports.loginUser = loginUser;