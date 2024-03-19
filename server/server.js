const express = require('express');
const cors = require('cors')

const app = express();
app.use(cors())


const APIKEY = "be4f8c32aabd98bf2b94d401bc394458575125bb7b3453a3254a80cf80c5469d"
const URL = "https://api.unsplash.com/photos/random/?query=landscape&count=10&client_id=" + APIKEY

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

    imageData = imageData.filter(elem => {
        if (elem.latitude == null || elem.longitude == null){
            return false
        }
        return true
    })

    res.json(imageData);
});

app.listen(3001, () => {
    console.log('Example app listening on port 3001!');
});