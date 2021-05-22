
var types = ["sol", "mur", "vide", "meuble", "escaliers", "porte_verrouiller", "porte_ouverte", "piege", "start"];
var images={};
var img = "../editeur/images/"
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

function genereModele(data,rayon, nbLignes, nbColonnes){    
    let width = nbColonnes*rayon;   
    let height = nbLignes*rayon;        
    var img = "../editeur/images/" 
    var svg = d3.select("#damier").select("svg").attr("width", width).attr("height", height);               
    svg.selectAll("image").remove() 
    for(var x=0; x<nbColonnes; x++){   
        var left=-1;
        var right=-1;
        var up=-1;
        var down=-1; 
        for(var y=0; y<nbLignes; y++){  
            var rotate ="";
            
            if (x>0 && x<nbColonnes-1){
                left = data[y][x-1];
                right = data[y][x+1];
            }
            if (y>0 && y<nbLignes-1){
                up = data[y+1][x];
                down = data[y-1][x];
            }
            if(data[y][x]==6 && up==1 && down==1){
                rotate = 'translate(' +rayon+ "," +0+ ') rotate(90, '+x*rayon+','+y*rayon+')';
            }
            if(data[y][x]==5 && left==1 && right==1){
                rotate = 'translate(' +rayon+ "," +0+ ') rotate(90, '+x*rayon+','+y*rayon+')';
            }
            svg.append("image") 
            .attr("xlink:href", img+types[data[y][x]]+".png")   
            .attr("width", rayon)   
            .attr("height", rayon)  
            .attr("x",x*rayon)  
            .attr("y",y*rayon)
            .attr('transform',rotate); 
            if(data[y][x]==8){ 
                var start = [x*rayon,y*rayon]   
            }   
                
            
        }   
    }   
    
    return start;           
}   
/*
 function savemodele(nbcolonnes,nblignes){
    var model = new Array(nblignes);
    for(var j=0;j<nblignes;j++){
        model[j] = new Array(nbcolonnes);
  }
    for(var i=0;i<lenght(id),i++){
        id[i][1]hamza123

    }

    }
*/
 

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
/*
function savemodele(nbcolonnes,nblignes){
    var normalized_positions = new Array(nblignes);
    for(var j=0;j<nblignes;j++){
        normalized_positions[j] = new Array(nbcolonnes);
    }
    // TODO
    // Complexity is too high in this code
    // Craft positions Array on the click event so you don't have to iterate again searching for positions and normalizing positions in a list.
    for(var i=0;i<nbcolonnes;i++){
        for(var j=0;j<nblignes;j++){
            for(let position of positions){
                //console.log('Comparing '+position.position + ' to '+ '('+i+','+j+')');
                if(position.position == '('+i+','+j+')'){
                    //console.log('hit')
                    normalized_positions[i][j] = position;
                    break;
                    console.log(normalized_positions)
                }
                else{
                    normalized_positions[i][j] = null;
                }
            }
        }
    }
    return normalized_positions;

}

*/

function ajouter_enigme() {
    let question = document.getElementById('question').value;
    let reponse = document.getElementById('reponse').value;
    sessionStorage.setItem("enigme",JSON.stringify({
        "question":question,
        "reponse": reponse
    }));
    sessionStorage.setItem('action', 'add_enigme')

}


const pas = 72; 
//  
function droit(){   
    var circle=d3.select("#avatar");    
   var newx = parseInt(circle.attr("cx"))+ pas; 
   var width = d3.select("#damier").select("svg").attr("width");    
   var r = parseInt(circle.attr("r"));  
   if (Math.min(newx,width-r)<width-r){ 
    circle.attr("cx",Math.min(newx,width-r));   
    }   
}   
//q 
function bas(){     
   var circle=d3.select("#avatar"); 
   var newy = parseInt(circle.attr("cy")) + pas;    
   //console.log(newy);   
   var height = d3.select("#damier").select("svg").attr("height");  
   var r = parseInt(circle.attr("r"));  
   if (Math.min(newy,height-r)<height-r){   
    circle.attr("cy",Math.min(newy,height-r));  
 }  
}   
//q 
function gauche(){  
    var circle=d3.select("#avatar");    
    var newx = parseInt(circle.attr("cx"))-(pas);    
    //console.log(newx);    
    var width = d3.select("#damier").select("svg").attr("width");    
    var r = parseInt(circle.attr("r"));  
    if (Math.min(newx,width-r)>0){   
        circle.attr("cx",Math.min(newx,width-r));    
    }   
}   
//x 
function haut(){    
    var circle=d3.select("#avatar");    
    var newy = parseInt(circle.attr("cy")) - (pas);  
    //console.log(newy);   
    var height = d3.select("#damier").select("svg").attr("height");  
    var r = parseInt(circle.attr("r"));  
    if (Math.min(newy,height-r)>0){  
        circle.attr("cy",Math.min(newy,height-r));   
    }   
}   
    
function genereInventaire(rayon,nbLignes,nbColonnes){
    let width = nbColonnes*rayon;   
    let height = nbLignes*rayon;
    var svg = d3.select("#inventaire").append("svg").attr("width", width).attr("height", height).attr("id","invent");
    for(var x=0; x<nbColonnes; x++){    
        for(var y=0; y<nbLignes; y++){    
           d3.select("#invent")   
           .append("rect")    
           .attr("x", rayon*x)    
           .attr("y", rayon*y)    
           .attr("width", rayon)  
           .attr("height", rayon) 
           .style("fill", "white")    
           .style("stroke", "black")
           .attr("id",couteau.nom);    
        } 
  } 
}


function genereInventaireCase(rayon,nbLignes,nbColonnes){
    let width = nbColonnes*rayon;   
    let height = nbLignes*rayon;
    var svg = d3.select("#inventaire_case").append("svg").attr("width", width).attr("height", height).attr("id","loot");
    for(var x=0; x<nbColonnes; x++){    
        for(var y=0; y<nbLignes; y++){    
           d3.select("#loot")   
           .append("rect")    
           .attr("x", rayon*x)    
           .attr("y", rayon*y)    
           .attr("width", rayon)  
           .attr("height", rayon) 
           .style("fill", "white")    
           .style("stroke", "black");    
        } 
  } 
}

function genereBarreVie(widthe,heighte){
    d3.select("#barreVie")
    .append("svg")
    .attr("width",widthe)
    .attr("height",heighte)
    .attr("id","vie")
    .style("fill", "green")    
    .style("stroke", "black"); 
}

function interaction(data){
     if (data==3){
        alert("meuble")   
     }
     if (data==7){
        alert("piege")
     }
     if (data==5){
        alert("porte verrouillée")
   
     }
   }
