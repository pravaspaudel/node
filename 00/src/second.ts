//Create a server that checks the request method and responds with:
//You used GET" if method is GET and "You used post" if method is post

import http, { IncomingMessage, ServerResponse } from 'http';

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  if (req.method == 'GET') {
    res.writeHead(200, { 'content-type': 'text/plain' });
    res.write('You used GET method');
    res.end();
  } else if (req.method == 'POST') {
    res.writeHead(200, 'POST METHOD IHEHHEHE', { 'content-type': 'text/plain' });
    res.write('YOu used post method');
    res.end();
  }
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
