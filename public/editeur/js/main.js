
const rayon = 72;
const lignes = 12;
const colonnes = 13;
window.addEventListener("DOMContentLoaded", (event) => {
    var choix = document.getElementById("lvl-select");
    choix.addEventListener("change", function(){
        // Appel du serveur pour qu'il nous envoie le modèle enrgistré dans niveau1.json
        $.getJSON("http://localhost:8000/niveau/"+choix.value, function(data) {
            // Ouvrir la console du navigateur pour vérifier que cela fonctionne
            let nodes = genereNode(data);
            var graph = graphe(nodes);
            var follower_start = spawn(graph,nodes);
            d3.selectAll("circle").remove();
            var start = genereModele(data,72, 12, 13);

            var svg = d3.select("#damier").select("svg")
            var circle = svg.append("svg:circle")
                .attr("cy", follower_start[0]*rayon+pas/2)
                .attr("cx", follower_start[1]*rayon+pas/2)
                .attr("r",10)
                .attr("id","follower")
                .attr("fill","blue");

            var circle = svg.append("svg:circle")
                .attr("cy", start[1]+pas/2)
                .attr("cx", start[0]+pas/2)
                .attr("r",10)
                .attr("id","avatar")
                .attr("fill","yellow");
            d3.select("body").on("keydown",function(){
                var avatar_x = parseInt(d3.select("#avatar").attr("cx")/pas);
                var avatar_y = parseInt(d3.select("#avatar").attr("cy")/pas);
                var up = data[avatar_y-1][avatar_x];
                var down = data[avatar_y+1][avatar_x];
                var right = data[avatar_y][avatar_x+1];
                var left = data[avatar_y][avatar_x-1];

                let imd =""+(avatar_y+1)+""+avatar_x
                let imu =""+(avatar_y-1)+avatar_x
                let imr =""+avatar_y+(avatar_x+1)
                let iml =""+avatar_y+(avatar_x-1)

                var follower_x = parseInt(d3.select("#follower").attr("cx")/pas);
                var follower_y = parseInt(d3.select("#follower").attr("cy")/pas);
                var pos_f = [follower_y,follower_x]
                switch(d3.event.keyCode){
                    case 68 :
                        if (right.type!=1 && right.type!=5){
                            droit()
                            clearLoot()
                            deepthsearch([avatar_y,avatar_x+1],pos_f,[pos_f],graph)
                            mouv()
                            if(follower_y==avatar_y && follower_x==avatar_x){
                                updateHealth(-30)
                                decalage=3
                            }
                        }
                        interaction(right,imr)
                        break;//d
                    case 83 :
                        if (down.type!=1 && down.type!=5){
                            im = ""+avatar_y+1+avatar_x
                            bas()
                            clearLoot()
                            deepthsearch([avatar_y+1,avatar_x],pos_f,[pos_f],graph)
                            mouv()
                            if(follower_y==avatar_y && follower_x==avatar_x){
                                updateHealth(-30)
                                decalage=3
                            }

                        }
                        interaction(down,imd)
                        break;//s
                    case 81 :
                        if (left.type!=1 && left.type!=5){
                            gauche()
                            clearLoot()
                            deepthsearch([avatar_y,avatar_x-1],pos_f,[pos_f],graph)
                            mouv()
                            if(follower_y==avatar_y && follower_x==avatar_x){
                                updateHealth(-30)
                                decalage=3
                            }
                        }
                        interaction(left,iml)

                        break;//q
                    case 90 :
                        if (up.type!=1 && up.type!=5){
                            haut()
                            clearLoot()
                            deepthsearch([avatar_y-1,avatar_x],pos_f,[pos_f],graph)
                            mouv()
                            if(follower_y==avatar_y && follower_x==avatar_x){
                                updateHealth(-30)
                                decalage=3
                            }
                        }
                        interaction(up,imu)
                        break;//z

                }


            });


        })
    });




    $().ready(function() {

    });
});