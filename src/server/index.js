var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const fetch = require('node-fetch')

dotenv.config();


const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))

app.use(express.static('dist'))

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})

app.get('/', function (req, res) {
    res.sendFile(path.resolve('dist/index.html'))
})

app.post('/usertext', (req, res) => {
    const api_key = process.env.API_KEY;
    const txt = req.body.formtext;

    fetch(`https://api.meaningcloud.com/sentiment-2.1?key=${api_key}&txt=${txt}&lang=en`, {method: 'POST'})
    .then(response => response.json())
    .then(data => res.send(data))
    .catch(error => console.log('error',error));

});

