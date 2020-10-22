var http = require('http');
var querystring = require('querystring');
var formidable = require('formidable');

function processPost(request, response, callback) {
    var queryData = "";
    if(typeof callback !== 'function') return null;

    if(request.method == 'POST') {
        var form = new formidable.IncomingForm();
        form.parse(request, function (err, fields, files) {
            var oldpath = files.filetoupload.path;
            console.log("qqqq", oldpath, files.length);
        });
/*
        request.on('data', function(data) {
            queryData += data;
	        console.log(queryData);
            if(queryData.length > 1e6) {
            	response.write(queryData);
                queryData = "";
                response.writeHead(413, {'Content-Type': 'text/plain'}).end();
                request.connection.destroy();
            }
        });
*/
        request.on('end', function() {
            request.post = querystring.parse(queryData);
            callback();
        });

    } else {
        response.writeHead(405, {'Content-Type': 'text/plain'});
        response.end();
    }
}

http.createServer(function(request, response) {
    if(request.method == 'POST') {
        processPost(request, response, function() {
            console.log(request.post.Content-Type);
            // Use request.post here

            response.writeHead(200, "OK", {'Content-Type': 'text/plain'});
            response.end();
        });
    } else {
        response.writeHead(200, "OK", {'Content-Type': 'text/plain'});
        response.end();
    }

}).listen(8080);