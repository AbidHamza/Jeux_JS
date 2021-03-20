var types = ["sol", "mur", "vide", "meuble", "escaliers", "porte_verrouiller", "porte_ouverte", "piège", "start"];
var images={};
var img = "images/"
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
             .attr("class","board")
             .attr("x", rayon*x)
             .attr("y", rayon*y)
             .attr("width", rayon)
             .attr("height", rayon)
             .style("fill", "white")
             .style("stroke", "black")
             .attr("type","mur")
             .on ("click", function() {
                var type = sessionStorage.getItem("type")
                var x = d3.select(this).attr("x")
                var y = d3.select(this).attr("y")
                console.log(d3.select(this).attr("type",type))
                var svg = d3.select("#damier").select("svg").attr("width", width).attr("height", height);
                svg.append("image")
                    .attr("xlink:href", img+type+".png")
                    .attr("width", rayon)
                    .attr("height", rayon)
                    .attr("x",x)
                    .attr("y",y);

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
    //var img = "images/"
    var svg = d3.select("#damier").select("svg").attr("width", width).attr("height", height);           
    svg.selectAll("image").remove()
    /*for(var x=0; x<nbColonnes; x++){
        for(var y=0; y<nbLignes; y++){ 
            
            svg.append("image")
            .attr("xlink:href", img+types[data[y][x]]+".png")
            .attr("width", rayon)
            .attr("height", rayon)
            .attr("x",x*rayon)
            .attr("y",y*rayon);

        }
    }
*/
        
}
function savemodele(nbcolonnes,nblignes){
    var newmodele = []
    var newcolonnes =[]
    var limite = 0
    var test = [d3.selectAll("rect")._groups[0]]
    //newmodele.push(t)
    test.forEach(function(rect) {
        for (var j =0; j<nbcolonnes; j++){
            console.log(j)
            newcolonnes =[]
            for (var i = 0 +limite; i<=nblignes+limite-1; i++) {
                console.log(i)
                newcolonnes.push(d3.select(rect[i]).attr("type"))
            }
            newmodele.push(newcolonnes)
        limite += nblignes
        console.log(limite)
        }
        
        return newmodele;
        
        //newmodele.push(rect.getAttribute('type'));
      });
    console.log(newmodele)
    return newmodele;
}



