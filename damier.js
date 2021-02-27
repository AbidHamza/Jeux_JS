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
             .style("stroke", "black")
             .on ("click", function() {
                d3.select(this).style("fill", "red")

             });
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
        for(var y=0; y<nbLignes; y++){ 
            
            svg.append("image")
            .attr("xlink:href", img+types[data[y][x]]+".png")
            .attr("width", rayon)
            .attr("height", rayon)
            .attr("x",x*rayon)
            .attr("y",y*rayon);

        }
    }

        
}



