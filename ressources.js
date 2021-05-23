

var obj ={}

//Objet de Soin
function objectSoin(type,nom,valeur,image){
  this.type=type
  this.nom=nom
  this.valeur=valeur
  this.image=image
}


var pillules = new objectSoin('soin','pillules',10,'image')
var bandages = new objectSoin('soin','bandage',30,'image')
var kit = new objectSoin('soin','kit',50,'image')

//objet défensif
function objectDef(type,nom,utilisation,counteroff,image){
  this.type=type
  this.nom=nom
  this.utilisation=utilisation
  this.counteroff=counteroff
  this.image=image
}

var couteau = new objectDef('combat','couteau',1,'zombie','imagecouteau')
var baton = new objectDef('combat','baton',1,'piege_ours','imagebaton')
var leurre = new objectDef('combat','leurre',1,'piques','image')
var armure = new objectDef('combat','Armure',1,'objectEnnemi','image')

//objet Ennemi
function objectEnnemi(nom,valeur,alert,image){
  this.nom= nom;
  this.valeur = valeur;
  this.alert = alert;
  this.image = image;
}

// PB Message d'alerte
var zombie = new objectEnnemi ('zombie',-15,'alert','image')
var piege_ours = new objectEnnemi('piege_ours',-15,'alert','image')
var piques = new objectEnnemi('piques',-15,'alert','image')


function objectcle(type,nom,image){
  this.type = type
  this.nom=nom
  this.image=image
}

var cle = new objectcle ('cle','cle' ,'image')

function objectAide(nom,type,texte){
  this.nom=nom
  this.type=type
  this.texte=texte
}

var aide1 = new objectAide('aide1','aide','Cet hotel est lugubre, 2 soirs que je dors ici, et il y a en permance des bruits étrange en dehors de ma chambre, je ne peux plus, je vais aller voir')
var aide2 = new objectAide('aide2','aide',"Je suis parvenu à me cacher ici, mais j'entends ses pas lourds de l'autre côté... Si vous lisez ces lignes sachez q.e  il ar-rive ! A l'a.. ! ")
var aide3 = new objectAide('aide3','aide',"Voila plusieurs années que je cherche la dernière demeure de Jean Nicolas Rozou, communément appelé par ses hommes Ozou. Ce général de division de la Grande Armée aurait séjourné ici avec Bonarparte, mais son nom n'est plus jamais mensionné ensuite. On dit qu'il était rude et cruel, mais que c'était un excellent meneur d'hommes.")
var aide4 = new objectAide('aide4','aide',"IL M'A TOUT PRIS, MA REPUTATION, MES INCAPABLES SOLDATS, MA VIE ! IL PAIERAT ET SES ENFANTS AUSSI, ET LEUR ENFANTS AUSSI, JUSQU'A QUE LE SOLEIL ROUGEOIS COMME LE SANG DANS MES VEINES ! ")