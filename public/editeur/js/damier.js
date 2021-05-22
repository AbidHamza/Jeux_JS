var types = ["sol", "mur", "vide", "meuble", "escaliers", "porte_verrouiller", "porte_ouverte", "piège", "start"];
var objets = [couteau,baton,armure,pillules,bandages,kit,zombie,piege_ours,piques,cle,aide1]  
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

/*
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
            .attr("id","D"+y) 
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
*/