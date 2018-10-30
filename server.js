const fs = require('fs');
const express = require("express");
const app = express();
var port = process.env.PORT || 8000;
let id = 0;
let dataAsArr = [];
let promArr = [];
// Here's a list of all the routes you'll need.

//  - Get route for getting all users// this works YAY!
app.get('/', function(req,res){
  fs.readFile("./storage.json", "utf8", function(err, data){
    res.json(JSON.parse(data));
  })
});

// //  - Get route for getting a user by name// works
app.get("/:name", function(req,res){
  fs.readFile("./storage.json", "utf8", function(err,data){
    let someData = JSON.parse(data);
    let matchedUser = someData.filter((item)=> {
      return item.name  == req.params.name;
    });

    if(matchedUser.length>=1){
      res.json(matchedUser[0]);
    }else{
      res.sendStatus(400);
    }
  })
})
//  - Create route for creating new users // WORKING !!

app.post("/create/:name/:email/:state", function(req,res){
  res.send(`A user has been added`)
  let newObj = {
    name: req.params.name,
    email: req.params.email,
    state: req.params.state
  }
  dataAsArr = JSON.parse(fs.readFileSync("./storage.json"));
  dataAsArr.push(newObj);
  let data2 = (JSON.stringify(dataAsArr));
  fs.writeFileSync("./storage.json", data2 );
});
// //  - Update route for updating a user by name // ??
app.patch('/:name/:email/:state', (req, res)=>{
  res.send("Your update has been submitted");
  let priorStorage = JSON.parse(fs.readFileSync("./storage.json"));
  for(let i = 0; i < priorStorage.length; i++ ){
    if (req.params.name === priorStorage[i].name){
      priorStorage[i].email = req.params.email
      priorStorage[i].state = req.params.state;
    }
  };
  fs.writeFileSync("./storage.json", JSON.stringify(priorStorage));
});
//  - Delete route for deleting a user by name // Works!
app.delete('/:name', function(req, res) {
  let name = req.params.name;
  fs.readFile("./storage.json", "utf8", function(err,data){
    let dataBase = JSON.parse(data);
    let results = dataBase.filter((item)=> {
      return item.name  !== req.params.name;
    });

    if(results.length < dataBase.length){
      let data2 = (JSON.stringify(results));
      fs.writeFileSync("./storage.json", data2 );
      res.send(`${name} has been removed`)
    }else{
      res.send("user not found")
      res.sendStatus(404);
    }
  })
});
app.listen(port, function() {
  console.log('Listening on port', port);
});
