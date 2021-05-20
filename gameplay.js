

function interaction(data,im){
    if (data.type==3){
       genereObjet(data);
    }
    if (data.type==7){
       genereEnnemi(data);
    }
    if (data.type==5){
       ouverturePorte(data,im);
    }
    if (data.type==6){
        fermeturePorte(data,im);
    }

    if (data.type==4){
        dbox("Vous avez réussi à atteindre l'escalier de l'étage, mais vous ignorez ce qui vous attends plus bas...")
        niveauSuivant();
    }
}


var obj ={}
var im = ""

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
                .attr("xlink:href","images/sol.png")
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
                updateHealth(zombie.valeur);
                dbox("Un zombie vient de vous mordre, courez !")
            }
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
                updateHealth(piege_ours.valeur);
                dbox("Un piège à ours vient de se refermer sur votre jambe, vous réussisez à sortir cette dernière, mais elle vous fait affreusement mal")

            }
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
                updateHealth(piques.valeur);
                dbox("Vous êtes tombés sur des piques, vous réussisez à sortir, mais vous avec de nombreuses blessures !")
            }
                
            }
            

        }




function deleteByValue(value,position) {
    for (let key in position) {
        if (position[key] == value) delete position[key];
    }
}


function ouverturePorte(data,ime){
    console.log(data)
    var choix = confirm("Voulez-vous ouvrir la porte?")
    if (choix){
        data.type = 6
        console.log("porte ouverte")
        d3.select("#D"+ime).attr("href","images/porte_ouverte.png")
    }
}
function fermeturePorte(data,ime){
    console.log("D"+ime)
    var choix = confirm("Voulez-vous fermer la porte?")
    if (choix){
        data.type = 5
        console.log("porte fermée")
        d3.select("#D"+ime).attr("href","images/porte_verrouiller.png")
    }
}
function aide(on){
    dbox(on.texte)
}
function deleteObj(idi,ido){
    d3.select(idi).remove()
    d3.select(ido).attr('objet',null)
}

function clearLoot(){
    var svg =d3.select("#loot")
    svg.selectAll("image").remove();
}

function devPort(){
    for(i=1;i<11;i++){
        if(d3.select('#I'+i).attr('objet')=='cle'){
            let choix  = confirm("Voulez-vous déverouiller la porte?")
            if (choix){

                dbox("Vous avez déverouillé la porte")
            }
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

function cbox(msg) {
    // (B1) GET ELEMENTS
    var boxc = document.getElementById("cbox"),
        boxmc = document.getElementById("cboxm");
        butboxt = document.getElementById("butboxt")
        butboxf = document.getElementById("butboxf")
    // (B2) SHOW/HIDE
    boxc.style.display = (msg === undefined) ? "none" : "block";
    boxmc.innerHTML = (msg === undefined) ? "" : msg ;
        butboxt.addEventListener("click", function(){
            let choix = true
            cbox();
            return choix;
        })
        butboxf.addEventListener("click", function(){
            let choix = false
            cbox();
            return choix;
        })


  }





