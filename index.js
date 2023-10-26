// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?",(req,res)=>{
  let parameter;
  let unixDate;
  let currentDate = req.params.date;
  let parser = new Date(currentDate);
  console.log(parser)
  let reger = /^\d+$/.test(currentDate);
  console.log(req.params)
   
  if(reger){
    parameter = new Date(parseInt(currentDate)).toUTCString();
    unixDate = Date.parse(parameter)
    res.json({"unix": unixDate, "utc": parameter})
  }else if(!req.params.date){
    parameter = new Date().toUTCString();
    unixDate = Date.parse(parameter)
    res.json({"unix": unixDate, "utc": parameter})
  }else if(parser == "Invalid Date"){
    res.json({error: "Invalid Date"})
  }else{
    parameter = new Date(currentDate).toUTCString();
    unixDate = Date.parse(parameter)
    res.json({"unix": unixDate, "utc": parameter})
  }
  
})



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
