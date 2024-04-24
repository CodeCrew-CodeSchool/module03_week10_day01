const express = require('express');
const cors = require('cors')
// const fetch = require('node-fetch');


const app = express();
app.use(cors())


const APIKEY = "33ceSu3oX9MTMMsF-H6dNihj7xdOF2gDPDoE5ZJvhzk"
const URL = "https://api.unsplash.com/photos/random/?query=landscape&count=10&client_id=" + APIKEY

app.get('/', async (req, res) => {
    var response = await fetch(URL);
    var data = await response.json();

    var filteredData = data.filter(image =>
        image.location &&
        image.location.position &&
        image.location.position.latitude &&
        image.location.position.longitude
    );

    var imageData = filteredData.map((image) => {
        return {
            image_url: image.urls.regular,
            location_name: image.location.name,
            latitude: image.location.position.latitude,
            longitude: image.location.position.longitude
        }
        
    })

    //Part 3: Filter the nulls out of imageData


    res.json(imageData);
});

app.listen(3001, () => {
    console.log('Worldview Api listening on port 3001!');
});

