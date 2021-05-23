
const rayon = 72;
const lignes = 12;
const colonnes = 13;
window.addEventListener("DOMContentLoaded", (event) => {


        // Appel du serveur pour qu'il nous envoie le modèle enrgistré dans niveau1.json
    var choix = document.getElementById("lvl-select");
    choix.addEventListener("change", function(){
        $.getJSON("http://localhost:8000/niveau/"+choix.value, function(data) {
            // Ouvrir la console du navigateur pour vérifier que cela fonctionne
            var start = genereModele(data,72, 12, 13);
            let noeuds = genereNode(data);
            graphe(noeuds);
            var follower_start = spawn(noeuds);
            d3.select("#avatar").remove();
            d3.select("#follower").remove();
            var svg = d3.select("#damier").select("svg")
            var follower = svg.append("image")
                .attr("y", follower_start[0]*rayon)
                .attr("x", follower_start[1]*rayon)
                .attr("height", 70)
                .attr("width",70)
                .attr("r",10)
                .attr("xlink:href","images/Ozou.png")
                .attr("id","follower");

            var avatar = svg.append("image")
                .attr("y", start[1])
                .attr("x", start[0])
                .attr("height", 70)
                .attr("width",70)
                .attr("r",10)
                .attr("xlink:href","images/avatar.png")
                .attr("id","avatar");

            if(!confirm("Voulez-vous passez l'introduction ?")){
                tutorial()
            }
            d3.select("body").on("keydown",function(){
                var avatar_x = parseInt(d3.select("#avatar").attr("x")/pas);
                var avatar_y = parseInt(d3.select("#avatar").attr("y")/pas);
                var up = data[avatar_y-1][avatar_x];
                var down = data[avatar_y+1][avatar_x];
                var right = data[avatar_y][avatar_x+1];
                var left = data[avatar_y][avatar_x-1];

                let imd =""+(avatar_y+1)+""+avatar_x
                let imu =""+(avatar_y-1)+avatar_x
                let imr =""+avatar_y+(avatar_x+1)
                let iml =""+avatar_y+(avatar_x-1)

                var follower_x = parseInt(d3.select("#follower").attr("x")/pas);
                var follower_y = parseInt(d3.select("#follower").attr("y")/pas);
                var pos_f = [follower_y,follower_x]
                switch(d3.event.keyCode){
                    case 68 :
                        if (right.type!=1 && right.type!=5){
                            droit()
                            clearLoot()
                            deepthsearch([avatar_y,avatar_x+1],pos_f,[pos_f])
                            mouv()
                            if(follower_y==avatar_y && follower_x==avatar_x){
                                updateHealth(-30)
                                decalage=3
                            }
                        }
                        interaction(right,imr,data)
                        break;//d
                    case 83 :
                        if (down.type!=1 && down.type!=5){
                            im = ""+avatar_y+1+avatar_x
                            bas()
                            clearLoot()
                            deepthsearch([avatar_y+1,avatar_x],pos_f,[pos_f])
                            mouv()
                            if(follower_y==avatar_y && follower_x==avatar_x){
                                updateHealth(-30)
                                decalage=3
                            }

                        }
                        interaction(down,imd,data)
                        break;//s
                    case 81 :
                        if (left.type!=1 && left.type!=5){
                            gauche()
                            clearLoot()
                            deepthsearch([avatar_y,avatar_x-1],pos_f,[pos_f])
                            mouv()
                            if(follower_y==avatar_y && follower_x==avatar_x){
                                updateHealth(-30)
                                decalage=3
                            }
                        }
                        interaction(left,iml,data)

                        break;//q
                    case 90 :
                        if (up.type!=1 && up.type!=5){
                            haut()
                            clearLoot()
                            deepthsearch([avatar_y-1,avatar_x],pos_f,[pos_f])
                            mouv()
                            if(follower_y==avatar_y && follower_x==avatar_x){
                                updateHealth(-30)
                                decalage=3
                            }
                        }
                        interaction(up,imu,data)
                        break;//z

                }


            });


        })
    });

});