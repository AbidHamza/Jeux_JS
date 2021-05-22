//var types = ["sol", "mur", "vide", "meuble", "escaliers", "porte_verrouiller", "porte_ouverte", "piège", "start"];  
//               0      1      2        3           4               5                  6              7        8
function genereNode(data){
    let nodes = []
    for(d1 of data){
        let node = []
        for(d2 of d1){
            node.push(d2.type)
        }
        nodes.push(node)

    }
    return nodes;
}
function jonction(vers){
    if(vers!=1 && vers!=5 && vers!=6){
        return 0;
    }
    if(vers==6){
        return 1;
    }
    if(vers==5){
        return -1;
    }
}

function goRight(vers,l,c){
    return [l,c+1]
}

function goLeft(vers,l,c){
    return [l,c-1];
}

function goUp(vers,l,c){
    return [l-1,c];
}

function goDown(vers,l,c){
    return [l+1,c];
}


function graphe(data){
    let json = {};
    let depart;let droite;let gauche;let haut;let bas;
    let position;
    for(let ligne=0; ligne<data.length; ligne++){
        for(let colonne=0; colonne<data[ligne].length; colonne++){
            if((ligne>0 && ligne<data.length-1)  && (colonne>0 && colonne<data[ligne].length-1)){
                depart = data[ligne][colonne];
                droite = data[ligne][colonne+1];
                gauche = data[ligne][colonne-1];
                haut = data[ligne-1][colonne];
                bas = data[ligne+1][colonne];
                    if(depart!=1 && depart !=5 && depart!=2){
                        position=[ligne,colonne];
                        json[position]=[];
                        if(droite!=1){
                            json[position].push([goRight(droite,ligne,colonne),jonction(droite)]);
                        }
                        if(gauche!=1){
                            json[position].push([goLeft(gauche,ligne,colonne),jonction(gauche)]);
                        }
                        if(haut!=1){
                            json[position].push([goUp(haut,ligne,colonne),jonction(haut)]);
                        }
                        if(bas!=1){
                            json[position].push([goDown(bas,ligne,colonne),jonction(bas)]);
                        }
                    }
            }
        }
    }
    return json;
}
function spawn(graph,data){
    var keys = [];
    for(var key in graph){
    keys.push(key);
    }
    var index_follower =  Math.floor(Math.random() * keys.length);
    //console.log(index_follower);
    //console.log(keys[index_follower]);
    var follower_start = keys[index_follower].split(',')
   //console.log(follower_start);
    while(data[follower_start[0]][follower_start[1]]==5){
        index_follower =  Math.floor(Math.random() * keys.length)
        follower_start = keys[index_follower].split(',')
    }
    
    return follower_start;
}

let chemins = []

function deepthsearch(pos_avatar,pos_follower,hist,graphe){
    if(pos_follower==undefined || graphe[pos_follower]==undefined){
        console.log("pb graphe")

    }else {
        let casevoisine = {}
        let distanceMax = Math.sqrt(Math.pow(pos_avatar[0] - pos_follower[0], 2) + Math.pow(pos_avatar[1] - pos_follower[1], 2))
        for (let i = 0; i < graphe[pos_follower].length; i++) {
            let distance = Math.sqrt(Math.pow(pos_avatar[0] - graphe[pos_follower][i][0][0], 2) + Math.pow(pos_avatar[1] - graphe[pos_follower][i][0][1], 2))
            if (distance < distanceMax) {
                casevoisine[0] = graphe[pos_follower][i][0]
                casevoisine[1] = distance
            }else{
                //mouvrandom(graphe[pos_follower])
            }

        }
        if (!hist.includes(casevoisine[0])) {
            hist.push(casevoisine[0])
            if (JSON.stringify(casevoisine[0]) === JSON.stringify(pos_avatar)) {
                chemins=[]
                const iterator = hist.values();
                for(const value of iterator){
                    chemins.push(value)
                }
            } else {
                deepthsearch(pos_avatar, casevoisine[0], hist, graphe)
            }
            hist.pop()
        }
    }

}
let decalage=0
function mouv() {
    if(decalage>=2){
        decalage=0
        return null;
    }else {
        if (chemins !== undefined) {
            if (chemins[0] !== undefined) {
                chemins.shift()
                console.log(chemins)
                let circle = d3.select("#follower");
                let newx = chemins[0][1] * rayon + pas / 2
                let newy = chemins[0][0] * rayon + pas / 2
                let width = d3.select("#damier").select("svg").attr("width");
                let r = parseInt(circle.attr("r"));
                if (Math.min(newx, width - r) < width - r) {
                    circle.attr("cx", Math.min(newx, width - r));
                    circle.attr("cy", Math.min(newy, width - r));
                }
            }
        }
        decalage++
    }

}

function mouvrandom(position){
    let rd = parseInt(Math.random()*position.length-1)
    let circle = d3.select("#follower");
    let newx = position[rd][0][1] * rayon + pas / 2
    let newy = position[rd][0][0] * rayon + pas / 2
    let width = d3.select("#damier").select("svg").attr("width");
    let r = parseInt(circle.attr("r"));
    if (Math.min(newx, width - r) < width - r) {
        circle.attr("cx", Math.min(newx, width - r));
        circle.attr("cy", Math.min(newy, width - r));
    }
}



