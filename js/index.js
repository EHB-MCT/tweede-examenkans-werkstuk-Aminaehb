"use strict";

fetch(`https://thecrew.cc/news/read.php`)
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data);
    });