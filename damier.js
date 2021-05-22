var types = ["sol", "mur", "vide", "meuble", "escaliers", "porte_verrouiller", "porte_ouverte", "piège", "start","porte_fermee"];
var objets = [couteau,baton,armure,pillules,bandages,kit,zombie,piege_ours,piques,cle,aide1]
var images={};  
for(let type of types){ 
    images[type]=type+".png";}  


//Création du Damier sur lequel reposera le niveau
function genereDamier(rayon, nbLignes, nbColonnes) {    
    let width = nbColonnes*rayon;   
    let height = nbLignes*rayon;    
    d3.select("#damier").append("svg").attr("width", width).attr("height", height);     
    for(var x=0; x<nbColonnes; x++){    
          for(var y=0; y<nbLignes; y++){    
             d3.select("svg")   
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
function creeCarre(x,y,rayon){  
    let d='M'+x+' '+y+' H '+rayon*x+' V '+rayon*y+' H '+x+' Z';     
    return d;   
}   


// Appelle le modèle depuis le fichier JSON, et l'affiche dans le damier
function genereModele(data,rayon, nbLignes, nbColonnes){    
            
    let width = nbColonnes*rayon;   
    let height = nbLignes*rayon;        
    var img = "images/" 
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
                left = data[y][x-1].type;
                right = data[y][x+1].type;
            }
            if (y>0 && y<nbLignes-1){
                up = data[y+1][x].type;
                down = data[y-1][x].type;
            }
            if(data[y][x].type==6 && up==1 && down==1){
                rotate = 'translate(' +rayon+ "," +0+ ') rotate(90, '+x*rayon+','+y*rayon+')';
            }
            if(data[y][x].type==5 && up==1 && down==1){
                rotate = 'translate(' +rayon+ "," +0+ ') rotate(90, '+x*rayon+','+y*rayon+')';
            }
            svg.append("image")
            .attr("id","D"+y+x) 
            .attr("xlink:href", img+types[data[y][x].type]+".png")   
            .attr("width", rayon)   
            .attr("height", rayon)  
            .attr("x",x*rayon)  
            .attr("y",y*rayon)
            .attr('transform',rotate); 
            if(data[y][x].type==8){ 
                var start = [x*rayon,y*rayon]
               
            }   
                
            
        }   
    }   
    
    return start;           
}   
const pas = 72; 
//Déplacement droit
function droit(){   
    var circle=d3.select("#avatar");    
   var newx = parseInt(circle.attr("x"))+ pas; 
   var width = d3.select("#damier").select("svg").attr("width");    
   var r = parseInt(circle.attr("r"));  
    if (Math.min(newx,width-r)<width-r){ 
        circle.attr("x",Math.min(newx,width-r));   
        }
}   
//Déplacement bas 
function bas(){     
   var circle=d3.select("#avatar"); 
   var newy = parseInt(circle.attr("y")) + pas;       
   var height = d3.select("#damier").select("svg").attr("height");  
   var r = parseInt(circle.attr("r"));  
    if (Math.min(newy,height-r)<height-r){   
        circle.attr("y",Math.min(newy,height-r)); 
        }
    
}   
//Déplacement gauche 
function gauche(){  
    var circle=d3.select("#avatar");    
    var newx = parseInt(circle.attr("x"))-(pas);        
    var width = d3.select("#damier").select("svg").attr("width");    
    var r = parseInt(circle.attr("r"));  
    if (Math.min(newx,width-r)>0){   
        circle.attr("x",Math.min(newx,width-r));    
    }  
}   
//Déplacement haut 
function haut(){    
    var circle=d3.select("#avatar");    
    var newy = parseInt(circle.attr("y")) - (pas);     
    var height = d3.select("#damier").select("svg").attr("height");  
    var r = parseInt(circle.attr("r"));  
    if (Math.min(newy,height-r)>0){  
        circle.attr("y",Math.min(newy,height-r));   
    }   
}   

//Génère le damier pour l'inventaire
function genereInventaire(rayon,nbLignes,nbColonnes){
    let width = nbColonnes*rayon;   
    let height = nbLignes*rayon;
    var i=1;
    var svg = d3.select("#inventaire").append("svg").attr("width", width).attr("height", height).attr("id","invent");
    for(var x=0; x<nbColonnes; x++){    
        for(var y=0; y<nbLignes; y++){    
           d3.select("#invent")   
           .append("rect")
           .attr("id","I"+i)    
           .attr("x", rayon*x)    
           .attr("y", rayon*y)    
           .attr("width", rayon)  
           .attr("height", rayon) 
           .style("fill", "white")    
           .style("stroke", "black");
           i+=1    
        } 
  } 
}

//Génère le damier pour le Loot
function genereInventaireCase(rayon,nbLignes,nbColonnes){
    let width = nbColonnes*rayon;   
    let height = nbLignes*rayon;
    var i = 1;
    var svg = d3.select("#inventaire_case").append("svg").attr("width", width).attr("height", height).attr("id","loot");
    for(var x=0; x<nbColonnes; x++){    
        for(var y=0; y<nbLignes; y++){    
           d3.select("#loot")   
           .append("rect") 
           .attr("id","L"+i)   
           .attr("x", rayon*x)    
           .attr("y", rayon*y)    
           .attr("width", rayon)  
           .attr("height", rayon) 
           .style("fill", "white")    
           .style("stroke", "black");
           i+=1;    
        } 
  } 
}
