/*
Définir un objet JSON contenant
l'ensemble des catégories images et les images de chaque catégorie.

const images = {
    "Cuisine" : [
    "images/cuisol.png","images/sol.png"
    ],
    "X" : [
    ],
    "Y" : [
    ]
}

faire appel à l'api via /images par exemple. Dans ce cas ces images seront stocké dans une base de donnée ou autre chose.

*/


var types = ["sol", "mur", "vide", "meuble", "escaliers", "porte_verrouiller", "porte_ouverte", "piège", "start"];
var images={};
var img = "../editeur/images/"
for(let type of types){
    images[type]=type+".png";}
var positions = [];
function appendImg(rect,height,width,rayon){

    var type = sessionStorage.getItem("type")
                var x = d3.select(rect).attr("x")
                var y = d3.select(rect).attr("y")
                var svg = d3.select("#damier").select("svg").attr("width", width).attr("height", height);
                svg.append("image")
                    .attr("xlink:href", img+type+".png")
                    .attr("width", rayon)
                    .attr("height", rayon)
                    .attr("x",x)
                    .attr("y",y)
                    .on("click",function(){
                        appendImg(this,height,width,rayon)
                    })
                // TODO : Update this
                // Each (x,y) is now a list of images
                // positions[i][j].images
                var feed =JSON.stringify({position:"("+x/rayon+","+y/rayon+")", image:types.indexOf(type)})
                positions.push(feed);
}
function genereDamier(rayon, nbLignes, nbColonnes) {
    let width = nbColonnes*rayon;
    let height = nbLignes*rayon;
    d3.select("#damier").append("svg").attr("width", width).attr("height", height);   
    for(var x=0; x<nbColonnes; x++){
          for(var y=0; y<nbLignes; y++){   
             d3.select("svg")
             .append("rect")
             .attr("class","board")
             .attr("x", rayon*x)
             .attr("y", rayon*y)
             .attr("width", rayon)
             .attr("height", rayon)
             .style("fill", "white")
             .style("stroke", "black")
             .attr("type","mur")
             .on ("click", function() {
                appendImg(this,height,width,rayon);
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

        

function savemodele(nbcolonnes,nblignes){
    var normalized_positions = new Array(nblignes);
    for(var j=0;j<nblignes;j++){
        normalized_positions[j] = new Array(nbcolonnes);
    }
    // TODO
    // Complexity is too high in this code
    // Craft positions Array on the click event so you don't have to iterate again searching for positions and normalizing positions in a list.
    for(var i=0;i<nblignes;i++){
        for(var j=0;j<nbcolonnes;j++){
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

function enigme_to_json() {
    let enigme = document.getElementById('enigme').value;
    let rep1 = document.getElementById('rep1').value;
    let rep2 = document.getElementById('rep2').value;
    let rep3 = document.getElementById('rep3').value;
    if(enigme != "" && rep1 != "" && rep2 != "" && rep3 != ""){
        
    }
    else
        alert("Veuillez remplir tous les champsss de l'énigme !")
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