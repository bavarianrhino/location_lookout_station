const express = require('express')
const bodyParser = require('body-parser') // Gives us ready made middlewares

const app = express();

// Use method is provided by express for middleware
// next is called when you want to forward the response to another middleware
app.use((req, res, next) => {
    console.log('MIDDLEWARE')
    next();
})

app.use((req, res, next) => {
    let body = '';
    req.on('end', () => {
        // console.log(body);
        const userName = body.split('=')[1]
        if (userName) {
            req.body = { name: userName };
        }
        next();
    })
    req.on('data', (chunk) => {
        body += chunk
    });
})

app.use((req, res, next) => {
    if (req.body) {
        return res.send('<h1>' + req.body.name + '</h1>')
    }
    res.send('<form method="POST"><input type="text" name="username"><button type="submit">Create User</button></form>')
})

app.listen(5000);