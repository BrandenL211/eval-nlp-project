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
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
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
    
    const txt_val = req.body.formtext;
    //try to console log something here like txt and see what comes out
    console.log(txt_val);
    const form = new FormData();
    form.append("key", api_key);
    form.append("txt", txt_val);
    form.append("lang", en);

    const requestOptions = {
        method: 'POST',
        body: form,
        redirect: 'follow'
    };

    const response = await fetch("https://api.meaningcloud.com/sentiment-2.1", requestOptions)
    .then(response => ({
        body: response.json()
    }))
    .then(({ body }) => res.send(body))
    .catch(error => console.log('error',error));

});

