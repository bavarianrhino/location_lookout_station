
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