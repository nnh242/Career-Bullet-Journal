const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const axios = require("axios");
app.use(jsonParser);
app.use(morgan('common'));

//CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
<<<<<<< HEAD

app.use(express.static('public'));

//const https = require("https");
const url =
  "https://jobs.github.com/positions.json?";
// axios.get(url)
//   .then(res =>{
//     console.log(res.data[0]);
//   })
//   .catch(err => {
//     console.log(err);
//   })
//
app.get('/api/positions', (req,res)=>{
  axios.get(url)
      .then(api => {
      res.status(200).json(api.data)
      })
      .catch(err =>{
        console.log(err,'in get request to api');
        res.status(500).json(err);
      })
});
app.listen(process.env.PORT || 8080, () => {
    console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});
module.exports = {app};
