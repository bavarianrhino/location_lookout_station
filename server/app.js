const express = require('express')
const bodyParser = require('body-parser') // Gives us ready made middlewares

const app = express();

// Use method is provided by express for middleware
// next is called when you want to forward the response to another middleware
app.use((req, res, next) => {
    console.log('MIDDLEWARE')
    next();
})

app.use(bodyParser.urlencoded({ extended: false })) // Automatically calls next() for us.

app.post('/user', (req, res, next) => {
    return res.send('<h1>' + req.body.username + '</h1>') // The username is found within the html input...(see below)
    // res.send('<form method="POST"><input type="text" name="username"><button type="submit">Create User</button></form>')
})

app.get('/', (req, res, next) => { // action='/user' connects above app.post
    res.send('<form action="/user" method="POST"><input type="text" name="username"><button type="submit">Create User</button></form>')
})

app.listen(5000);