const express = require("express");
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(8000);
// Renvoie le JSON sur une route du type http://localhost:8888/niveau/<snum>
// par exemple : http://localhost:8888/niveau/1
app.get('/niveau/:num', function(request, response) {
    console.log("GET /niveau/"+request.params.num);
    response.setHeader("Content-type", "application/json");
    response.end(fs.readFileSync('niveaux/niveau'+request.params.num+'.json','utf8'));
});
// Crée un fichier (dans le dossier dans lequel a été lancé le serveur)
app.post('/niveau/:num', (request, response) =>{
    console.log("POST /niveau/"+request.params.num);
    console.dir(request.body.data);
    fs.writeFileSync('niveaux/niveau'+request.params.num+'.json', JSON.stringify(request.body.data));
    response.end("Création effectuée");
});
app.use('/game', express.static(__dirname + '/jeu'));
app.use('/editeur', express.static(__dirname + '/editeur'));
app.get('/', (req, res) => {
    res.redirect('/game');
  });


app.post('/enigme', (req, res)=> {

    let res_body = JSON.stringify(req.body)
    //fs.writeFileSync('../editeur/enigmes.json', JSON.stringify(res_body));
    res.end(res_body);
});

