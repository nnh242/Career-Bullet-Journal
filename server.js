const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan('common'));

//CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
//get the remote API and serve to front-end
const url =
  "https://jobs.github.com/positions.json?";

app.get(url,(req,res)=>{
  axios
  .get(url)
  .then(res => {
    console.log(res);
    );
  })
  .catch(error => {
    console.log(error);
  });
}
app.listen(process.env.PORT || 8080, () => {
    console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});
module.exports = {app};
