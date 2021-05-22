
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
                console.log(sessionStorage)
                   if (sessionStorage.length == 0) {
                    return;
                   }
                   else if(sessionStorage.getItem('action') == 'add_enigme'){
                    rect.attr('enigme',sessionStorage.getItem('enigme'));
                    sessionStorage.removeItem('action');
                    alert('OK!')

                    //
                    sessionStorage.removeItem('action');

                   }
                   else{
                    appendImg(this,height,width,rayon);
                   }
             });
          }
    }
              
}

 

function persistmodel(){
    var modele = savemodele(13,12);
    if(modele === -1){
        alert("Veuillez remplir votre damier entierement ")
        return;
    }
    var nom = document.getElementById("new").value
    
    $.ajax({url:"http://localhost:8000/niveau/"+nom, type:"POST", data:{data:modele}, dataType:"json"})
    alert('Done !');
}
function savemodele(nbcolonnes,nblignes){
var newmodele=[]
var newcolonnes =[]
var limite = 0
for (var j =0; j<nbcolonnes; j++){
    newcolonnes =[]
    for (var i = 0 +limite; i<=nblignes+limite-1; i++) {
         let k = 1;
         let chr = ""+j+","+i+""; 
         let rect = document.getElementById(chr);
         

         let elem = document.getElementsByName(chr);

         if (elem.length === 0){

            return -1;
         }
         let ncas = {};

         if(rect.getAttribute("enigme") != null)
            ncas.enigme = rect.getAttribute("enigme");

         compteur = 1;
         for(m=0;m<elem.length;m++){
            isObjet = elem[m].getAttribute("isObjet");
            type = elem[m].getAttribute("type");

            if(isObjet == 'true'){
                temp = 'objet'+compteur;
                compteur++;
                ncas[temp] = type
            }
            else
                ncas.type = type

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



