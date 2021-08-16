"use strict";

//Stap 1: haal de artikels op van de endpoint
//object aanmaken
const artikels = {
    init() {
        const search_button = document.getElementById("form"); // het lokaliseren van de item "form"
        search_button.addEventListener("submit", e => {
            e.preventDefault(); //om in de search button iets op te zoeken
            let inputValue = document.getElementById("SearchField").value;
            // inputValue is de value van de invulveld
            this.renderArtikelsVolgensSearchField(inputValue);
        });
        document.getElementById("likes").addEventListener("change", e => {
            let inputValue = document.getElementById("SearchField").value;
            if (inputValue == "") {
                this.renderartikels();
            } else if (inputValue != "") {
                this.renderArtikelsVolgensSearchField(inputValue);
            }
            console.log("checked");
        });
    },
    renderartikels() {
        document.getElementById("content").innerHTML = "";
        fetch(`https://thecrew.cc/news/read.php`) //fetch variabelen
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);

                var checkLikes = document.getElementById("likes"); //returns een array aan nieuwsartikels met het aantal likes
                if (checkLikes.checked === true) {
                    data.news.sort((a, b) => { //stap 5: de gebruiker kan de lijst van artikels op likes sorteren
                        return b.likes - a.likes;
                    });
                } else if (checkLikes.checked === false);
                console.log(data);
                data.news.forEach(element => {
                    let html = `<article> 
                                    <h1>${element.title} Likes: ${element.likes}</h1>
                                    <img src="${element.imageURI}">
                                    <p>${element.content}</p>
                                    </article>`;
                    document.getElementById("content").insertAdjacentHTML("beforeend", html);
                    this.postLikes(element.UUID); //functie op lijn 61 oproepen + ID meegeven
                    // stap 2: De klasse "Artikels" heeft een "like" functie die als volgt werkt
                    /* class artikels { //klasse artikels aanmaken en elke properties apart opslaan
                         constructor(UUID, title, content, datum, likes, imageURL) {
                             this._title = element.title;
                             this._UUID = element.UUID;
                             this._content = element.content;
                             this._datum = element.datum;
                             this._likes = element.likes;
                             this._imageURI = element.imageURI;
                         } */
                });
            });
    },
    postLikes(ID) {
        fetch('https://thecrew.cc/news/create.php', { //fetch de post request
                method: 'POST',
                body: JSON.stringify({
                    UUID: ID // returns: "created" (status 200) wanneer het invoegen gelukt is.
                })
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch((error) => { // to catch any errors
                this.handlerError(error);
                console.log('Error:', error);
            });
    },
    renderArtikelsVolgensSearchField(auteur) {
        fetch("https://thecrew.cc/news/read.php")
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(data => {
                document.getElementById("content").innerHTML = "";

                var checkLikes = document.getElementById("likes"); //stap 5: de gebruiker de lijst van artikels kan sorteren op likes
                if (checkLikes.checked === true) {
                    console.log("waar");
                    data.news.sort((a, b) => {
                        return b.likes - a.likes;
                    });

                } else if (checkLikes.checked === false) {
                    console.log("vals");
                }
                console.log(data);
                data.news.forEach(element => { // Stap 4: Search Field  voor user (filter op de titel en in de content)
                    let titleString = element.title;
                    let contentString = element.content;
                    if (titleString.includes(auteur) || contentString.includes(auteur)) {
                        console.log("ok");
                        let html = `<article> 
                            <h1>${element.title} Likes: ${element.likes}</h1>
                            <img src="${element.imageURI}">
                            <p>${element.content}</p>
                        </article>`;
                        document.getElementById("content").insertAdjacentHTML("beforeend", html);
                    }


                });
            });
    }


};

artikels.init(); //functie oproepen
artikels.renderartikels();