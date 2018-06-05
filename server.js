var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 1000000}));
app.use(bodyParser.json({limit: '50mb', parameterLimit: 1000000}));

app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/login', getMovieList);

app.use('/', express.static(__dirname + '/'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/src', express.static(__dirname + '/src'));

app.use('*', function(req, res){
    console.log(__dirname);
    res.send(path.join(__dirname, 'dist/index.html'));
})

app.listen(3000, function() {
    console.log("Server is running at port: 3000");
})

function getMovieList() {
    console.log("------------1");
}