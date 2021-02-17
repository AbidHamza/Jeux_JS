var express = require("express");
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (request, response, next) {
    response.setHeader("Content-type", "application/json");    
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    response.setHeader('Access-Control-Allow-Headers', '*');
    next();
});

app.listen(8888);

// Renvoie le JSON sur une route du type http://localhost:8888/niveau/<num>
// par exemple : http://localhost:8888/niveau/1
app.get('/niveau/:num', function(request, response) {
    console.log("GET /niveau/"+request.params.num);
    response.end(fs.readFileSync('niveau'+request.params.num+'.json','utf8'));
});

// Crée un fichier (dans le dossier dans lequel a été lancé le serveur)
app.post('/niveau/:num', function(request, response) {
    console.log("POST /niveau/"+request.params.num);
    console.dir(request.body.data);
    fs.writeFileSync('niveau'+request.params.num+'.json', JSON.stringify(request.body.data));
    response.end("Création effectuée");
});
