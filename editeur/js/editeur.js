const rayon = 72;
const lignes = 12;
const colonnes = 13;
var types = ["sol", "mur", "vide", "meuble", "escaliers", "porte_verrouiller", "porte_ouverte", "piege", "start"];
var images={};
var img = "images/"
for(let type of types){
    images[type]=type+".png";}

function appendattr(image){
    if (sessionStorage.getItem("objet") == null ){
        let attribut = sessionStorage.getItem("objet");
    }
    let attribut = sessionStorage.getItem("type")
    let svg = d3.select(image).attr("objet1",types.indexOf(attribut));
}
function appendImg(rect,height,width,rayon){
    isObj = false;
    if (sessionStorage.getItem("type") == null ){
        var type = sessionStorage.getItem("objet");
        isObj = true;
    }
    else{
        var type = sessionStorage.getItem("type");
    }

    let x = d3.select(rect).attr("x")
    var y = d3.select(rect).attr("y")
    var svg = d3.select("#damier").select("svg").attr("width", width).attr("height", height);
    var img_toadd = svg.append("image")
        .attr("xlink:href", img+type+".png")
        .attr("width", rayon)
        .attr("height", rayon)
        .attr("x",x)
        .attr("y",y)
        .attr("isObjet",isObj)
        .attr("id",[x/rayon,y/rayon])
        .attr("name",[x/rayon,y/rayon])
        .attr("type",types.indexOf(type))
        .on("click",function(){
            if(sessionStorage.getItem('action') == 'add_enigme'){
                let id_rect = ""+x/rayon+","+y/rayon+"";
                let tmp_rect = document.getElementById(id_rect)
                tmp_rect.setAttribute('enigme',sessionStorage.getItem('enigme'));
                sessionStorage.removeItem('action');
                alert('OK!');
            }
            else{
                appendImg(this,height,width,rayon);
                appendattr(this)
            }

        })

    // TODO : Update this
    // Each (x,y) is now a list of images
    // positions[i][j].images
    //var feed ={position:"("+x/rayon+","+y/rayon+")", image:types.indexOf(type)}
    // positions.push(feed)
    //poisitons =[" position" image ]
}

function genereDamier(rayon, nbLignes, nbColonnes) {
    let width = nbColonnes*rayon;
    let height = nbLignes*rayon;
    d3.select("#damier").append("svg").attr("width", width).attr("height", height);
    for(var x=0; x<nbColonnes; x++){
        for(var y=0; y<nbLignes; y++){
            let rect = d3.select("svg")
                .append("rect")

            rect.attr("class","board")
                .attr("x", rayon*x)
                .attr("y", rayon*y)
                .attr("id", x+','+y)
                .attr("width", rayon)
                .attr("height", rayon)
                .style("fill", "white")
                .style("stroke", "black")
                .attr("type","mur")
                //.attr("id",[x,y])
                .on ("click", function() {
                    /*
                    Le damier est generé carré par carré, chaque carré contient
                    des attributs.
                    Dès qu'un utilisateur clique sur un carré, la fonction JS
                    ci-dessous est executé.
                    */
                    console.log(sessionStorage)
                    /*
                    Cette fonction JS va vérifié ce est stocké dans sessionStorage
                    pour savoir qu'était la dernière action : ajout d'un énigme ou  bien d'une image
                    ou bien aucune quand la page est chargée au début.
                    */
                    if (sessionStorage.length == 0) {
                        return;
                    }
                    else if(sessionStorage.getItem('action') == 'add_enigme'){
                        /*
                        S'il s'agit de l'ajout d'un énigme, je vais tout simplement ajouté ce qui
                        est stocké dans le sessionStorage préalablement et le mettre
                        dans un attribut.
                        l faut savori que ce qui est stocké dans le sessionStorage est un objet JSON contenant
                        la question et réponse.
                        */
                        rect.attr('enigme',sessionStorage.getItem('enigme'));
                        sessionStorage.removeItem('action');
                        alert('OK!')

                        //
                        sessionStorage.removeItem('action');

                    }
                    else{
                        // Sinon, ajouter une image
                        // la récursivité ici est necessaire pour l'ajout d'un listener onclick
                        // sur le rectangle ainsi que tout les images inserées ausein du rectangle.
                        appendImg(this,height,width,rayon);
                    }
                });
        }
    }

}



function persistmodel(){
    var modele = savemodele(colonnes,lignes);
    if(modele === -1){
        // vérifier que le damier est totalement rempli
        alert("Veuillez remplir votre damier entierement ")
        return;
    }
    var nom = document.getElementById("new").value
    // Il est interessant de revoir la partie backend pour renvoyer un code
    // retour 200 si l'ajout a été effectué coté serveur avec succès et un autre code
    // 500 par exemple, pour indiquer qu'une erreur coté serveur a empeché la persistence.
    $.ajax({url:"http://localhost:8000/niveau/"+nom, type:"POST", data:{data:modele}, dataType:"json"})
    alert('Done !');
}
function savemodele(nbcolonnes,nblignes){
    /*
    Je comprend que cette fonction est sans interet, parce qu'il aurait fallu tout
    simplement stocké un objet JSON dans sessionStorage contenant tout le detail du damier et
    de le modifier au fur et à mesure, au lieu de surcharger le DOM de données logiques ( données
    logique du damier) pour à la fin réparser le DOM pour construire un objet JSON valide ... dommage
    */
    var newmodele=[]
    var newcolonnes =[]
    var limite = 0
    for (var j =0; j<nbcolonnes; j++){
        newcolonnes =[]
        for (var i = 0 +limite; i<=nblignes+limite-1; i++) {
            let k = 1;
            let chr = ""+j+","+i+"";
            /*
            la variable rect pointe sur un rectangle
            prenons l'exemple du premier rectangle
            <rect class="board" x="0" y="0" id="0,0" width="50" height="50" type="mur" style="fill: white; stroke: black;"></rect>
            */
            let rect = document.getElementById(chr);
            /*
            elem contient une liste des images
            prenons l'exemple du premier rectangle contenant 2 images
            <image xlink:href="../editeur/images/sol.png" width="50" height="50" x="0" y="0" isObjet="false" id="0,0" name="0,0" type="0" objet1="-1"></image>
            <image xlink:href="../editeur/images/sol.png" width="50" height="50" x="0" y="0" isObjet="true" id="0,0" name="0,0" type="0"></image>
            */
            let elem = document.getElementsByName(chr);

            if (elem.length === 0){
                // s'il n'y a pas d'image dans le rectangle, c'est qu'il est vide
                // du coup je retourne -1
                // la fonction qui permet de persister les données va recuperer la valeur
                // que retourne cette fonction, si c'est un -, rien ne va etre persisté et un message
                // d'erreur sera affiché à l'utilisateur.

                return -1;
            }
            let ncas = {};
            // je recupère l'énigme depuis l'attribut enigme du rectangle, s'il y en a
            // exemple d'un rectangle contenant un énigme
            // <rect class="board" x="50" y="0" id="1,0" width="50" height="50" type="mur" style="fill: white; stroke: black;" enigme="{"question":"a","reponse":"a"}"></rect>

            if(rect.getAttribute("enigme") != null)
                ncas.enigme = rect.getAttribute("enigme");

            /*
            Ici je forge l'objet JSON {"type":"","objet1":"","objet2":"","objet3":"","objet4":""}
            */
            compteur = 1;
            for(m=0;m<elem.length;m++){
                // je fais la difference entre objet et type en ajoutant un attribut à chaque image
                // lors de l'insertion : isObjet=false ou isObjet=true
                isObjet = elem[m].getAttribute("isObjet");
                type = elem[m].getAttribute("type");

                if(isObjet == 'true'){
                    // si c'est un objet( images du deuxième panel, j'incremente le compte et j'ajoute la key->value)
                    temp = 'objet'+compteur;
                    compteur++;
                    ncas[temp] = type
                }
                else
                    ncas.type = type // sinon j'ajoute l'image de la page principale

            }

            newcolonnes.push(ncas)
        }
        newmodele.push(newcolonnes)
    }
    console.log(newmodele)
    return newmodele
}

function ajouter_enigme() {
    let question = document.getElementById('question').value;
    let reponse = document.getElementById('reponse').value;
    sessionStorage.setItem("enigme",JSON.stringify({
        "question":question,
        "reponse": reponse
    }));
    sessionStorage.setItem('action', 'add_enigme')

}


