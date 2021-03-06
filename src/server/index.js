var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const fetch = require('node-fetch')
const FormData = require('form-data')

dotenv.config();

const api_key = process.env.API_KEY;
const app = express();
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(express.static('dist'))

// designates what port the app will listen to for incoming requests
const port = 8081;
app.listen(port, function () {
    console.log('app listening on port: %d', port);
})

app.get('/', function (req, res) {
    res.sendFile(path.resolve('dist/index.html'))
})

app.post('/usertext', async(req, res) => {
    const txt = req.body.formText;
    const lang = "en";
    console.log(txt);
  
    const response = await fetch(`https://api.meaningcloud.com/sentiment-2.1?key=${api_key}&url=${txt}&lang=${lang}`)
    .then(response => response.json())
    .then(response => res.send(response))
    .catch(error => console.log('error', error));
  })