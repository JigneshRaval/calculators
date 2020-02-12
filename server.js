var http = require('http');
var fs = require('fs');
var path = require('path');

const port = process.env.PORT || 3002;

console.log("PORTS --> ", port);

http.createServer(function (request, response) {
    // console.log('Request ...: ', __dirname + request.url);

    var filePath = '.' + request.url;
    if (filePath == './')
        filePath = './index.html';

    var extname = path.extname(filePath);

    var contentType = 'text/html';

    switch (extname) {
        case '.js':
        case '.mjs':
            contentType = 'text/javascript';
            break;
        case '.ts':
            contentType = 'text/javascript';
            break;
        case 'typescript':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.svg':
            contentType = 'image/svg+xml';
            break;
        case '.xht':
            contentType = 'application/xhtml+xml';
            break;
        case '.xhtml':
            contentType = 'application/xhtml+xml';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.wav':
            contentType = 'audio/wav';
            break;
    }

    // console.log(" Type : ", contentType);

    fs.readFile(filePath, function (error, content) {
        if (error) {
            if (error.code == 'ENOENT') {
                fs.readFile('./404.html', function (error, content) {
                    response.writeHead(200, {
                        'Content-Type': contentType
                    });
                    response.end(content, 'utf-8');
                });
            } else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
                response.end();
            }
        } else {
            response.writeHead(200, {
                'Content-Type': contentType
            });
            response.end(content, 'utf-8');
        }
    });

}).listen(port);

console.log(`Server running at http://localhost:${port}/`);
