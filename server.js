// server.js
// where your node app starts
// init project
var express = require('express');
var app = express();
var cors= require('cors');
var bodyParser = require('body-parser');
var multer=require('multer');
var upload =multer({dest : './uploads'});
var type = upload.single('upfile');
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.
// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.get('/',(req,res)=>{
  res.json('/');
});
app.post('/api/fileanalyse',type,(req,res)=>{
  console.log('body',req.body);
  console.log('files',req.files);
  console.log('file',req.file);
  console.log('params',req.params);
  //console.log('busboy',req.busboy);
  var upfile = req.file;;
  if(!upfile)
    return res.status(400).send('you must upload a file.');
  var result={ name:upfile.filename,
              type:upfile.mimetype,
              size:upfile.size,
             }
  res.json(result);
});
// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
