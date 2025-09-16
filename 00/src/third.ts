//Write a program using http.get() to fetch data from "" and print the response body.

import http, { IncomingMessage, ServerResponse } from 'http';

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  if (req.method == 'GET' && req.url == '/') {
    const response = getFromHTTP('http://jsonplaceholder.typicode.com/posts/1', (responseData) => {
      if (responseData != null) {
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(responseData);
        console.log('response send is ', responseData);
      } else {
        res.writeHead(500, { 'content-type': 'text/plain' });
        res.end('Not found');
        console.log('Not found hehe');
      }
    });
  }
});

const getFromHTTP = (url: string, callback: (data: string | null) => void) => {
  try {
    http.get(url, (response: IncomingMessage) => {
      let tempData = '';

      response.on('data', (datapackets) => {
        tempData += datapackets;
      });

      response.on('end', () => {
        callback(tempData);
      });

      response.on('error', (err) => {
        console.log('error : ', err);
        callback(null);
      });
    });
  } catch (error) {
    console.log('error in gethttp:', error);
    callback(null);
  }
};

const PORT = 2040;

server.listen(PORT, () => {
  console.log('server is running on port ', PORT);
});
