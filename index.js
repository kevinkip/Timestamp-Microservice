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

app.get('/api/', (req,res) => {
  const projDate = new Date();
  res.json({
    unix: projDate.valueOf(),
    utc: projDate.toUTCString()
  });
});

app.get('/api/:timestamp', (req,res) => {
  const timeStamp = req.params.timestamp;

  
  if(/\d{5,}/.test(timeStamp)) {
     
    const dateInt = parseInt(timeStamp);

    res.json({
      unix: Number(timeStamp),
      utc: new Date(dateInt).toUTCString()
    }); 
  } else {
      
    const goodInt = new Date(timeStamp);

    if (goodInt.toString() === "Invalid Date"){
      res.json({
        error: "Invalid Date"
      });
    } else {
      res.json({
        unix: goodInt.valueOf(),
        utc: goodInt.toUTCString()
      });
    }
  }
});


// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + 3000);
});
