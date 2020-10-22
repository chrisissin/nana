const http = require('http');
inspect = require('util').inspect;

const { Storage } = require('@google-cloud/storage');
    const projectId = 'nana-kingnanaho';
    const storage = new Storage({
        projectId: projectId,
    });



http.createServer((req, res) => {
  const { headers, method, url } = req;
  let body = [];
    var busboy = new Busboy({ headers: req.headers });
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
      console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
      file.on('data', function(data) {
        console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
      });
      file.on('end', function() {
        console.log('File [' + fieldname + '] Finished');
      });
    });
    busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
      console.log('Field [' + fieldname + ']: value: ' + inspect(val));
    });
    busboy.on('finish', function() {
      console.log('Done parsing form!');
      res.writeHead(303, { Connection: 'close', Location: '/' });
      res.end();
    });
    req.pipe(busboy);
}).listen(8080);

async function upload2bucket() {
    var bucketName = 'nanatestpublic'
    fileRes = await storage.bucket(bucketName).upload(file);
    fs.unlinkSync(file);
    console.log('fileRes',fileRes)
    console.log(`Finish: Processed file ${file}`);
    res.send(fileRes);
}