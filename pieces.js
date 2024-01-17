// Récupération des pièces depuis le fichier JSON
const reponse = await fetch("pieces-autos.json");
const pieces = await reponse.json();

// Parcours de la liste des pièces 
for (let i = 0; i < pieces.length; i++) {

    const article = pieces[i];
    // Récupération de l'élément du DOM qui accueillera les fiches
    const sectionFiches = document.querySelector(".fiches");
    // Création d’une balise dédiée à une pièce automobile
    const pieceElement = document.createElement("article");
    // Création des balises 
    const imageElement = document.createElement("img");
    imageElement.src = article.image;
    const nomElement = document.createElement("h2");
    nomElement.innerText = article.nom;
    const prixElement = document.createElement("p");
    prixElement.innerText = `Prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;
    const categorieElement = document.createElement("p");
    categorieElement.innerText = article.categorie ?? "(aucune catégorie)";
    const descriptionElement = document.createElement("p");
    descriptionElement.innerText = article.description ?? "Pas de description pour le moment.";
    const stockElement = document.createElement("p");
    stockElement.innerText = article.disponibilite ? "En stock" : "Rupture de stock";
    
    // On rattache la balise article a la section Fiches
    sectionFiches.appendChild(pieceElement);
    // On rattache l’image à pieceElement (la balise article)
    pieceElement.appendChild(imageElement);
    pieceElement.appendChild(nomElement);
    pieceElement.appendChild(prixElement);
    pieceElement.appendChild(categorieElement);
    //Ajout des éléments au DOM pour l'exercice
    pieceElement.appendChild(descriptionElement);
    pieceElement.appendChild(stockElement);

 }

 // Boutons trier 
const boutonTrierCroissant = document.querySelector(".btn-trier-croissant");
boutonTrierCroissant.addEventListener("click", function () {
    const piecesOrdonneesCroissant = Array.from(pieces);
    piecesOrdonneesCroissant.sort(function (a, b) {
        return a.prix - b.prix;
    });
    console.log(piecesOrdonneesCroissant);
});

const boutonTrierDecroissant = document.querySelector(".btn-trier-decroissant");
boutonTrierDecroissant.addEventListener("click", function () {
    const piecesOrdonneesDeroissant = Array.from(pieces);
    piecesOrdonneesDeroissant.sort(function (a, b) {
        return b.prix - a.prix;
    });
    console.log(piecesOrdonneesDeroissant);
});

 // Boutons filtrer 
const boutonFiltrerAbordable = document.querySelector(".btn-filtrer-abordable");
boutonFiltrerAbordable.addEventListener("click", function () {
   const piecesFiltreesAbordable = pieces.filter(function (piece) {
       return piece.prix <= 35;
   });
   console.log(piecesFiltreesAbordable);
});

const boutonFiltrerDescription = document.querySelector(".btn-filtrer-description");
boutonFiltrerDescription.addEventListener("click", function () {
   const piecesFiltreesDescription = pieces.filter(function (piece) {
       return piece.description
   });
   console.log(piecesFiltreesDescription);
});

// Liste des noms des pièces abordables
const noms = pieces.map(piece => piece.nom);
for(let i = pieces.length -1 ; i >= 0; i--){
    if(pieces[i].prix > 35){
        noms.splice(i,1);
    }
}

//Création de l'élement html liste
const abordablesElements = document.createElement('ul');
//Ajout de chaque nom à la liste
for(let i=0; i < noms.length ; i++){
    const nomElement = document.createElement('li');
    nomElement.innerText = noms[i];
    abordablesElements.appendChild(nomElement)
}
// Ajout de l'en-tête puis de la liste au bloc résultats filtres
document.querySelector('.abordables')
    .appendChild(abordablesElements)


// Liste des noms et prix des pièces disponibles
const nomsDisponibles = pieces.map(piece => piece.nom);
const prixDisponibles = pieces.map(piece => piece.prix);
for(let i = pieces.length -1 ; i >= 0; i--){
    if(! pieces[i].disponibilite){
        nomsDisponibles.splice(i,1);
        prixDisponibles.splice(i,1);
    }
}

//Création de l'élement html liste
const disponiblesElements = document.createElement('ul');
//Ajout de chaque nom à la liste
for(let i=0; i < prixDisponibles.length ; i++){
    const nomElement = document.createElement('li');
    nomElement.innerText = `${nomsDisponibles[i]} - ${prixDisponibles[i]} €`;
    disponiblesElements.appendChild(nomElement)
}
// Ajout de l'en-tête puis de la liste au bloc résultats filtres
document.querySelector('.disponibles')
    .appendChild(disponiblesElements)
