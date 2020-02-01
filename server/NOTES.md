
# Node.JS Notes
- Below is vanilla node without express

```javascript
const fs = require('fs'); //fs = file system module - only available in the node.js environment and not the browser
const name = 'Ryan';
// this is an asynchronous process
fs.writeFile('user-data.txt', 'Name: ' + name, (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('WROTE FILE');
});

const http = require('http');
const server = http.createServer((req, res) => {
    console.log('INCOMING REQUEST');
    console.log(`method: ${req.method}`, `URL: ${req.url}`);

    if (req.method === 'POST') {
        let body = '';

        req.on('end', () => {
            console.log(body);
            const userName = body.split('=')[1]
            res.end(`<h1> Got the POST request!...${userName}</h1>`)
        })
        req.on('data', (chunk) => {
            body += chunk
        });
    } else {    
        res.setHeader('Content-Type', 'text/html');
        res.end('<form method="POST"><input type="text" name="username"><button type="submit">Create User</button></form>');
    }
});

server.listen(5000);
```

- Above is then refactored using express to...
```javascript
const express = require('express')
const bodyParser = require('body-parser')
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
// Above code is replaced by app.use(bodyParser.urlencoded({ extended: false }))


app.use((req, res, next) => {
    if (req.body) {
        return res.send('<h1>' + req.body.name + '</h1>')
    }
    res.send('<form method="POST"><input type="text" name="username"><button type="submit">Create User</button></form>')
})

app.listen(5000);
```

- Eventually our code is refactored to below...
```javascript
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
    console.log('POST MIDDLEWARE EXECUTED AT /user')
    return res.send('<h1>' + req.body.username + '</h1>') // The username is found within the html input...(see below)
    // res.send('<form method="POST"><input type="text" name="username"><button type="submit">Create User</button></form>')
})

app.get('/', (req, res, next) => { // action='/user' connects above app.post
    console.log('GET MIDDLEWARE EXECUTED AT /')
    res.send('<form action="/user" method="POST"><input type="text" name="username"><button type="submit">Create User</button></form>')
})

app.listen(5000);
```

# Error handling within Routes to be replaced by error module
```javascript
router.get('/:pid', (req, res, next) => {
    console.log("GET PLACE /:pid");
    const placeId = req.params.pid; // { pid: 'place1' }
    const place = DUMMY_PLACES.find(p => {
        return p.id === placeId;
    })
    if (!place) {
        // Below replaces...return res.status(404).json({ message: "Could not find a place for the provided id."})
        // Use throw for synchronous and next() for asynchronous
        const error = new Error('Could not find a place for the provided id.')
        error.code = 404;
        throw error; // Don't need to use 'return'
    }
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
    if (!places) {
        // Below replaces...return res.status(404).json({ message: "Could not find a place for the provided id."})
        // Use throw for synchronous and next() for asynchronous
        const error = new Error('Could not find a place for the provided id.')
        error.code = 404;
        return next(error) // Need to use return with next()
    }
    res.json({places});
```