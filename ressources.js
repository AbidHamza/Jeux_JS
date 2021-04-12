
//Objet de Soin
function objectSoin(nom,valeur,image){
  this.noms=nom
  this.valeur=valeur
  this.image=image
}


//var pillules = new objectSoin(pillule,10,image)
//var bandages = new objectSoin(bandage,30,image)
//var kit = new objectSoin(kit,50,image)

//objet défensif
function objectDef(nom,utilisation,counteroff,image){
  this.nomd=nom
  this.utilisation=utilisation
  this.counteroff=counteroff
  this.image=image
}

var couteau = new objectDef('couteau',1,'zombie','image')
var baton = new objectDef('baton',1,'piege_ours','image')
var leurre = new objectDef('leurre',1,'piques','image')
var Armure = new objectDef('Armure',1,'objectEnnemi','image')

//objet Ennemi
function objectEnnemi(nom,valeur,alert,image){
  this.nome= nom;
  this.valeur = valeur;
  this.alert = alert;
  this.image = image;
}

// PB Message d'alerte
//var zombie = new objectEnnemi (zombie,15,alert,image)
//var piege_ours = new objectEnnemi(piege_ours,15,alert,image)
//var piques = new objectEnnemi(piques,15,alert,image)


function objectcle(couleur,image){
  this.couleur=couleur,
  this.image=image
}



function objectAide(type,texte){
  this.type=type
  this.texte=texte
}




