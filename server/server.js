var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')

var priorities = [
    {
      id: 1,
      label: "Urgent",
      bgColor: "#bb2124"
    },
    {
      id: 2,
      label: "Regular",
      bgColor: "#f0ad4e"
    },
    {
      id: 3,
      label: "Trivial",
      bgColor: "#5bc0de"
    }
  ]

var app = express()

app.use(cors())

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
 
app.listen(3001, function(){
   console.log("Port 3001 is listening!");
});

app.get('/api/priorities', function(request, response){
   response.send(priorities);
});