var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const fetch = require('node-fetch')
const FormData = require('form-data')

dotenv.config();


const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))

app.use(express.static('dist'))

// designates what port the app will listen to for incoming requests
const port = 8080;
app.listen(port, function () {
    console.log(`app listening on port: ${port}`);
})

app.get('/', function (req, res) {
    res.sendFile(path.resolve('dist/index.html'))
})

app.post('/usertext', (req, res) => {
    const api_key = process.env.API_KEY;
    const txt_val = req.body.formtext;
    //try to console log something here like txt and see what comes out
    const form = new FormData();
    form.append("key", api_key);
    form.append("txt", txt_val);
    form.append("lang", en);

    const response = await fetch("https://api.meaningcloud.com/sentiment-2.1", {
        method: 'POST',
        body: form
    })
    .then(response => ({
        body: response.json()
    }))
    .then(({ body }) => res.send(body))
    .catch(error => console.log('error',error));

});

