//fonction qui converti le json en liste de liste retenant seulement les types des cases
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

//fonction qui retourne l'ètat d'une arrête 0 pour un sol, 1 pour une porte ouverte, -1 pour une porte fermé
function jonction(vers){
    if(vers!=1 && vers!=5 && vers!=6 && vers!=9){
        return 0;
    }
    if(vers==6 ){
        return 1;
    }
    if(vers==5 || vers==9){
        return -1;
    }
}

//fonction qui retourne les coordonées de la case voisine de droite
function goRight(vers,l,c){
    return [l,c+1]
}

//fonction qui retourne les coordonées de la case voisine de gauche
function goLeft(vers,l,c){
    return [l,c-1];
}

//fonction qui retourne les coordonées de la case voisine du haut
function goUp(vers,l,c){
    return [l-1,c];
}

//fonction qui retourne les coordonées de la case voisine du bas
function goDown(vers,l,c){
    return [l+1,c];
}

//fonction qui crée une structure de graphe à partir d'une liste de liste contenant les types de cases
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
                    if(depart!=1 && depart !=5 && depart!=2 && depart!=9){
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
    chemins=[]
    graph=json;
}

//fonction qui génère la position du poursuivant aléatoirement
function spawn(data){
    var keys = [];
    for(var key in graph){
    keys.push(key);
    }
    var index_follower =  Math.floor(Math.random() * keys.length);
    var follower_start = keys[index_follower].split(',')
    while(data[follower_start[0]][follower_start[1]]==5){
        index_follower =  Math.floor(Math.random() * keys.length)
        follower_start = keys[index_follower].split(',')
    }
    
    return follower_start;
}

let chemins = []

//fonction récursive qui depuis la position du poursuivant cherche l'avatar avec une fonction de coût et parcours le graphe
//si lálgorithme trouve la position d'arrivée elle retourne le chemin
function deepthsearch(pos_avatar,pos_follower,hist){
    if(pos_follower==undefined || graph[pos_follower]==undefined){
        console.log("pb graphe")

    }else {
        let casevoisine = {}
        let distanceMax = Math.sqrt(Math.pow(pos_avatar[0] - pos_follower[0], 2) + Math.pow(pos_avatar[1] - pos_follower[1], 2))
        for (let i = 0; i < graph[pos_follower].length; i++) {
            //calcule la distance entre la position actuelle du poursuivant et la position du joueur pour chacune des cases voisines
            let distance = Math.sqrt(Math.pow(pos_avatar[0] - graph[pos_follower][i][0][0], 2) + Math.pow(pos_avatar[1] - graph[pos_follower][i][0][1], 2))
            //s'il trouve une distance infieur à la distanceMax il garde cette casevoisine
            if (distance < distanceMax) {
                casevoisine[0] = graph[pos_follower][i][0]
                casevoisine[1] = distance
            }else{
                //sinon il ferait un pas aléatoire parmis ses voisins
                //mouvrandom(pos_follower)
            }

        }
        //évite de retourner au même endroit en ne gardant que les cases par où il n est pas deja passé
        if (!hist.includes(casevoisine[0])) {
            hist.push(casevoisine[0])

            if (JSON.stringify(casevoisine[0]) === JSON.stringify(pos_avatar)) {
                //s'il arrive jusqu`à l'avatar il retourne le bon chemin
                chemins=[]
                const iterator = hist.values();
                for(const value of iterator){
                    chemins.push(value)
                }
            } else {
                //sinon il continue la recherche á partir de sa nouvelle position
                deepthsearch(pos_avatar, casevoisine[0], hist)
            }
            hist.pop()
        }
    }

}
let decalage=0

//fonction qui effectue un pas du poursuivant par rapport au chemin précédemment trouver
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
                let newx = chemins[0][1] * rayon
                let newy = chemins[0][0] * rayon
                let width = d3.select("#damier").select("svg").attr("width");
                let r = parseInt(circle.attr("r"));
                if (Math.min(newx, width - r) < width - r) {
                    circle.attr("x", Math.min(newx, width - r));
                    circle.attr("y", Math.min(newy, width - r));
                }
            }
        }
        decalage++
    }

}
//fonction qui génère un mouvement aléatoire du poursuivant sur une de ses cases voisines
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



