"use strict";

// stap 1: haal de artikels op van de endpoint
//object aanmaken
const artikel = {
    initFields() {
        fetch(`https://thecrew.cc/news/read.php`) //fetch variabelen
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                data = data.news;
                let Artikels = [];
                for (let i = 0; i < data.length; i++) {
                    console.log(data[i]);
                    let artikel = new Artikels(data[i].UUID, data[i].title, data[i].content, data[i].publicationDate, data[i].likes, data[i].imageURI);
                }

            });
    },

};

//Alles in een klasse opslaan
class Artikels {
    constructor(IDartikel, title, content, datum, likes, imageURL) {
        this._IDartikel = IDartikel;
        this._title = title;
        this._content = content;
        this._datum = datum;
        this._likes = likes;
        this._imageURL = imageURL;
    }
    likes() {
        fetch('https://thecrew.cc/news/create.php', {
                method: 'POST',
                body: "UUID"
            })
            .then(response => {
                return response.json();
            })
            .then(data => {});

    }


}



artikel.initFields();

// stap 2: De klasse "Artikels" heeft een "like" functie die als volgt werkt
// POST request = https://thecrew.cc/news/create.php


// stap 3: Geef de lijst van artikels overzichtelijk weer in de feed, met de titel, afbeelding en intro tekst. (HTML & CSS)
// Stap 4: Search Field  voor user (filter op de titel en in de content)
//stap 5: de gebruiker de lijst van artikels kan sorteren op likes
//sortLikes(likes) {

//});
//this.aantalLikes(sortedlikes);
//},





// fetch('https://thecrew.cc/news/create.php', {
//    method: 'POST',
//     body: "UUID"
// })
// .then(results => results.json())
// .then(console.log);