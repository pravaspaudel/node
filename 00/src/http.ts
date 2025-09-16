import http from 'http';

const server = http.createServer((request, response) => {
  response.write('hello ');
  response.write('How are you');
  response.write('I am from http');
  response.end();
});

const PORT = 5000;

server.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
