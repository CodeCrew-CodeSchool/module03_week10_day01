
const express = require('express');
const app = express();


const APIKEY = ""
const URL = "https://api.unsplash.com/photos/random/?query=landscape&count=3&client_id=" + APIKEY

app.get('/', async (req, res) => {
    var response = await fetch(URL);
    var data = await response.json();

    var imageData = data.map((image) => {
        return {
            image_url: image.urls.regular,
            location_name: image.location.name,
            latitude: image.location.position.latitude,
            longitude: image.location.position.longitude
        }
    })

    res.json(imageData);
});

app.listen(3001, () => {
    console.log('Example app listening on port 3001!');
});