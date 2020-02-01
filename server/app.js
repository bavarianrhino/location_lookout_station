const fs = require('fs'); //fs = file system module - only available in the node.js environment and not the browser
const userName = 'Ryan';

// this is an asynchronous process
fs.writeFile('user-data.txt', 'Name: ' + userName, (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('WROTE FILE');
});

const http = require('http');
const server = http.createServer((req, res) => {
    console.log('INCOMING REQUEST');
    console.log(req.method, req.url);
    
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>Success!</h1>');
});

server.listen(5000);