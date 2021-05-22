



//Diverse intéraction avec les différents types de cases,permets d'appeler les fonctions liées.
function interaction(data,im){
    if (data.type==3){
       genereObjet(data);
    }
    if (data.type==7){
       genereEnnemi(data);
    }
    if (data.type==5){
        devPorte(data,im);
    }
    if (data.type==6){
        fermeturePorte(data,im);
    }
    if (data.type==9){
        ouverturePorte(data,im);
    }
    if (data.type==4){
        dbox("Vous avez réussi à atteindre l'escalier de l'étage, mais vous ignorez ce qui vous attends plus bas...")
    }
}



// Permet de récupérer les objets provenant du Loot
function getItem(objet,idl){
    let o = objets[objet];
    for(let p=1;p<11;p++){
        let elem = document.getElementById("I"+p);
        if(elem.hasAttribute('objet')){
            console.log("Emplacement "+p+" déjà pris")
        }
        else{
            var x = d3.select("#I"+p).attr("x");
            var y = d3.select("#I"+p).attr("y");
            d3.select("#I"+p).attr('objet',o.nom);
            d3.select("#invent").append("image")
                .attr("id","IM"+p)
                .attr("xlink:href","images/"+o.nom+".png")
                .attr("width", 100)
                .attr("height", 100)
                .attr("x",x)
                .attr("y",y)
                var id = "#IM"+p
                if(o.type=='soin'){
                    d3.select(id).attr("onclick","updateHealth("+o.valeur+"),deleteObj(IM"+p+",I"+p+")")
                }
                if(o.type == 'aide'){
                    d3.select(id).attr("onclick","aide("+o.nom+")")
                }
            let str=idl.getAttribute("id")
            d3.select(idl).remove();
            let nobj = "objet"+str.charAt(str.length-1)
            delete obj[nobj]
            return console.log("objet placé dans l'inventaire.")
                
        }
        
        
    }
    dbox("Inventaire plein")
}

// Fait apparaitre les objets présents dans un meuble
function genereObjet(data){
    obj = data
    if (Object.keys(data).length>=1)
        for (let p=1; p<Object.keys(data).length;p++){
            let k=Object.keys(data)[p];
            let v=Object.values(data)[p]
            let x = d3.select("#L"+p).attr("x");
            let y = d3.select("#L"+p).attr("y");
            d3.select("#loot").append("image")
            .attr("id","LM"+p)
            .attr("xlink:href","images/"+objets[v].nom+".png")
            .attr("width", 100)
            .attr("height", 100)
            .attr("x",x)
            .attr("y",y)
            .attr("onclick","getItem("+data[k]+",LM"+p+")");

            
        }
    }

//Fonction qui récupère les ennemis présents sur les cases pièges, et gère directement les intéractions avec le joueur et son équipement
function genereEnnemi(data){
    var damier = data;
    if(damier.objet1!=null)
        for( let p=1;p<Object.keys(damier).length;p++){
            var key=Object.keys(damier)[p];
            var value = damier[key]
            console.log(objets[value])
            var x = d3.select("#L"+p).attr("x");
            var y = d3.select("#L"+p).attr("y");
            d3.select("#L"+p).attr('ennemi',objets[value].nom)
            d3.select("#loot").append("image")
            .attr("id","LM"+p)
            .attr("xlink:href","images/"+objets[value].nom+".png")
            .attr("width", 100)
            .attr("height", 100)
            .attr("x",x)
            .attr("y",y);
            //Zombie
            if(value==6){
                for(i=1;i<11;i++){
                    if(d3.select('#I'+i).attr('objet')=='couteau'){
                        var element = document.getElementById('I'+i)
                        element.removeAttribute('objet')
                        element.removeAttribute('class')
                        d3.select('#IM'+i).remove();
                        d3.select('#LM'+p).remove();
                        dbox("Vous avez tué un zombie avec votre couteau, et ce dernier s'est cassé !")
                        delete data.objet1;
                        return console.log("attaque évitée")
                    }
                }
                updateHealth(zombie.valeur); //Appel de fonction qui modifie la vie du joueur
                dbox("Un zombie vient de vous mordre, courez !")
            }
            //Piège à ours
            if(value==7){
                for(i=1;i<11;i++){
                    if(d3.select('#I'+i).attr('objet')=='baton'){
                        var element = document.getElementById('I'+i)
                        element.removeAttribute('objet')
                        d3.select('#IM'+i).remove();
                        d3.select('#LM'+p).remove();
                        dbox("Vous avez déclenché un piège à ours avec votre baton, mais ce dernier est resté dans le piège")
                        delete data.objet1;
                        return console.log("attaque évitée")
                    }
                }
                updateHealth(piege_ours.valeur);//Appel de fonction qui modifie la vie du joueur
                dbox("Un piège à ours vient de se refermer sur votre jambe, vous réussisez à sortir cette dernière, mais elle vous fait affreusement mal")

            }
            //Piques
            if(value==8){
                for(i=1;i<11;i++){
                    if(d3.select('#I'+i).attr('objet')=='Armure'){
                        var element = document.getElementById('I'+i)
                        element.removeAttribute('objet')
                        d3.select('#IM'+i).remove();
                        d3.select('#LM'+p).remove();
                        dbox("Vous êtes tombé sur des piques, mais votre armure a encaissé pour vous, mais est à présent inutilisable")
                        delete data.objet1;
                        return console.log("attaque évitée")
                    }
                }
                updateHealth(piques.valeur);//Appel de fonction qui modifie la vie du joueur
                dbox("Vous êtes tombés sur des piques, vous réussisez à sortir, mais vous avec de nombreuses blessures !")
            }
                
            }
            

        }


//Fonction permettant l'ouverture des portes déjà déverouillées
function ouverturePorte(data,ime){
    console.log(data)
    var choix = confirm("Voulez-vous ouvrir la porte?")
    if (choix){
        data.type = 6
        console.log("porte ouverte")
        d3.select("#D"+ime).attr("href","images/porte_ouverte.png")
    }
}

//Fonction permettant de fermer les portes
function fermeturePorte(data,ime){
    console.log("D"+ime)
    var choix = confirm("Voulez-vous fermer la porte?")
    if (choix){
        data.type = 9
        console.log("porte fermée")
        d3.select("#D"+ime).attr("href","images/porte_verrouiller.png")
    }
}

//Fonction pour les aides
function aide(on){
    dbox(on.texte)
}

//Fonction qui permet de supprimer les objets de soins après utilisation
function deleteObj(idi,ido){
    d3.select(idi).remove()
    d3.select(ido).attr('objet',null)
}

//Fonction pour nettoyer l'inventaire de Loot à chaque fois qu'on sort d'une case meuble  
function clearLoot(){
    var svg =d3.select("#loot")
    svg.selectAll("image").remove();
}

//Fonction pour déverouiller les portes avec une clé
function devPorte(data,ime){
    for(i=1;i<11;i++){
        if(d3.select('#I'+i).attr('objet')=='cle'){
            let choix  = confirm("Voulez-vous déverouiller la porte ?")
            if (choix){
                data.type = 6
                d3.select("#D"+ime).attr("href","images/porte_ouverte.png")
                dbox("Vous avez déverouillé la porte grâce à la clé !")
                return console.log("Porte déverouillée")
            }else{
                return dbow("Vous avez choisi de ne pas ouvrir la porte")
            }
        }else{
                 return dbox("Vous n'avez pas la clé pour ouvirir cette porte ! ")
            }
   
}

}



// (B) TOGGLE DIALOG BOX
function dbox(msg) {
  // (B1) GET ELEMENTS
    let dbox = document.getElementById("dbox"),
        dboxm = document.getElementById("dboxm");
 
  // (B2) SHOW/HIDE
  dboxm.innerHTML = (msg === undefined) ? "" : msg ;
  dbox.style.display = (msg === undefined) ? "none" : "block";
}




