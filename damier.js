var types = ["sol", "mur", "vide", "meuble", "escaliers", "porte_verrouiller", "porte_ouverte", "piège", "start"];  
var images={};  
for(let type of types){ 
    images[type]=type+".png";}  
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
function gauche(callback){  
    var circle=d3.select("#avatar");    
    var newx = parseInt(circle.attr("cx"))-(pas);    
    //console.log(newx);    
    var width = d3.select("#damier").select("svg").attr("width");    
    var r = parseInt(circle.attr("r"));  
    if (Math.min(newx,width-r)>0){   
        circle.attr("cx",Math.min(newx,width-r));    
    }  
    setTimeout(""+callback(),100 );
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