//Write a simple Node.js HTTP server that responds with "Welcome to Node.js HTTP module" on port 4000.

import http, { IncomingMessage, ServerResponse } from 'http';

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    res.writeHead(200, { 'content-type': 'text/plain' });
    res.write('Welcome to Node.js HTTP module');
    res.end();
});

const PORT = 4000;

server.listen(PORT, () => {
    console.log(`server is listening on Port ${PORT}  `);
});
