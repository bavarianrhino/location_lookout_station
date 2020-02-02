const express = require('express');
const bodyParser = require('body-parser');

const placesRoutes = require('./routes/places-routes');
const HttpError = require('./models/http-error')
const usersRoutes = require('./routes/users-routes');

const app = express();

app.use(bodyParser.json())

app.use('/api/places', placesRoutes); // => /api/places...

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

app.listen(5000);