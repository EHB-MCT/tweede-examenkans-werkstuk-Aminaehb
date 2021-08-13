"use strict";

//object aanmaken
const service = {
    Init() {
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
                    let artikel = new Artikel(data[i].UUID, data[i].title, data[i].content, data[i].publicationDate, data[i].likes, data[i].imageURI);

                }

            });
    }

};

class Artikel {
    constructor(IDartikel, title, content, datum, likes, imageURL) {
        this._IDartikel = IDartikel;
        this._title = title;
        this._content = content;
        this._datum = datum;
        this._likes = likes;
        this._imageURL = imageURL;
    }
}

service.Init();