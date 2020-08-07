var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
var AYLIENTextAPI = require('aylien_textapi');
const dotenv = require('dotenv');

const app = express()

app.use(express.static('dist')) ;


dotenv.config();

var textapi = new AYLIENTextAPI({
    application_id:  process.env.API_ID,
    application_key: process.env.API_KEY
})
// console.log( process.env.API_ID , process.env.API_KEY)

function getText(req,res) {
    textapi.sentiment({
      text: req.body.url
      }, 
      function(error, response) {
        res.send(response);
      }
    );
  }

  
function getArticle(req,res) {
    textapi.sentiment({
      url: req.body.url
      }, 
      function(error, response) {
        res.send(response);
      }
    );
  }
//console.log(__dirname)

app.get('/', function (req, res) {
     res.sendFile('dist/index.html')
    // res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})

// Object.assign(textapi);

app.get('/test', async (req, res) => {
    res.send(mockAPIResponse)
})

app.post('/article', getArticle)
