const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  // Get the URL of the requested resource
  const url = req.url === '/' ? '/home.html' : req.url;

  // Map the file extension to the appropriate content type
  const contentTypeMap = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    // Add more content types as needed
  };

  // Get the file extension
  const ext = path.extname(url);

  if (req.method === 'GET') {
    const filePath = path.join(__dirname, '/src', url);
    if (fs.existsSync(filePath)) {
      // Read the file and serve it with the appropriate content type
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Internal Server Error');
        } else {
          res.writeHead(200, { 'Content-Type': contentTypeMap[ext] || 'text/plain' });
          res.end(data);
        }
      });
    } else {
      // If the file does not exist, return a 404 response
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('File Not Found');
    }
  }
});

// Set the port number
const port = 3000;

// Start the server
server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/`);
});
