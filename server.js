const fs = require('fs');
const express = require("express");
const app = express();
var port = process.env.PORT || 8000;
let id = 0;
let dataAsArr = []
// Here's a list of all the routes you'll need.

//  - Create route for creating new users // WORKING !!

app.post("/create/:name/:email/:state", function(req,res){
  console.log("Does this work");
  let newObj = {
    name: req.params.name,
    email: req.params.email,
    state: req.params.state
  }
  console.log(newObj);
  dataAsArr = JSON.parse(fs.readFileSync("./storage.json"));
  dataAsArr.push(newObj);
  let data2 = (JSON.stringify(dataAsArr));
  fs.writeFileSync("./storage.json", data2 );
});

//  - Get route for getting all users// this works YAY!
app.get('/', function(req,res){
  fs.readFile("./storage.json", "utf8", function(err, data){
    res.json(JSON.parse(data));
  })
});

// //  - Get route for getting a user by name
// app.get("/:name", function(req,res){
//   fs.readFile("./storage.json", "utf8", function(err,data){
//     let someData = JSON.parse(data);
//     let matchedUser = someData.filter((item)=> {
//       return item.name  == req.params.name;
//     });
//
//     if(matchedUser.length>=1){
//       res.json(matchedUser[0]);
//     }else{
//       res.sendStatus(400);
//     }
//   })
// })

// //  - Update route for updating a user by name

// app.patch("/:user/:email/:state", function(req, res){
//   fs.readFile("./storage.json", "utf8", function(err,data){
//     let someData = JSON.parse(data);
//     let matchedUser = someData.filter((item)=> {
//       return item.name  == req.params.name;
//     });
//
//     if(matchedUser.length>=1){
//
//     }else{
//       res.sendStatus(400);
//     }
//   })
// })
//  - Delete route for deleting a user by name

// app.delete("/:user",)

app.listen(port, function() {
  console.log('Listening on port', port);
});
