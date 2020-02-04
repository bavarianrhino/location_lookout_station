
// ================== REQUIRED MODULES ==================//
const express = require('express');
// const mongoose = require('mongoose')
const bodyParser = require('body-parser');

// ================== REQUIRED MODELS ==================//
const placesRoutes = require('./routes/places-routes');
const HttpError = require('./models/http-error')
const usersRoutes = require('./routes/users-routes');
const keys = require('./config/keys')

// ================== SCHEMA IMPORT ==================//
// require('./models/User'); 
// require('./models/Place');

// mongoose.Promise = global.Promise;
// mongoose.connect(keys.mongoURI)

// ================== CREATE APPLICATION ==================//
const app = express();

// ================== CREATE MODEL ==================//
// const Survey = mongoose.model('places');
// const User = mongoose.model('users');

// ================== AUTH & COOKIES ==================//
app.use(bodyParser.json());
// app.use(cookieSession({ maxAge: 30 * 24 * 60 * 1000, keys: [keys.cookieKey] }));
// app.use(passport.initialize());
// app.use(passport.session());

// ================== ROUTES ==================//
// require('./routes/authRoutes')(app); Or use this syntax.
app.use('/api/places', placesRoutes); // => /api/places...
app.use('/api/users', usersRoutes); // => /api/places...
// Handles unknown route
app.use((req, res, next) => {
    const error = new HttpError("Could not find this route!", 404)
    throw error;
})
// Express knows when you pass a use function 4 parameters, it knows to use it as an error middleware.
app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500)
    res.json({ message: error.message || "An unknown error has occurred!"})
});

// ================== CONNECT ==================//
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))

    // const path = require('path')
    // app.get('*', (req, res) => {
        // res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    // })
}

// ================== SET PORT ==================//
const PORT = process.env.PORT || 5000; 
app.listen(PORT)