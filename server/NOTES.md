
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