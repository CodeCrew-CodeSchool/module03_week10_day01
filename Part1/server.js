
const express = require('express');
const app = express();


app.get('/', async (req, res) => {
    var response = await fetch("https://api.unsplash.com/photos/random/?client_id=863c4b2810cf186dbf96542bc49f7824eb086019d426ddd391ea0f7941008b8f&query=landscape&count=1");
    var data = await response.json();
     var imageData = {
        image_url: data[0]?.urls?.regular,
        location_name: data[0]?.location?.name,
        latitude: data[0]?.location?.position?.latitude,
        longitude: data[0]?.location?.position?.longitude
     }

    res.json(imageData);
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});