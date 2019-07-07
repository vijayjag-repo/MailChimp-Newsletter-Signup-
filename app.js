const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
  var fname = req.body.fname;
  var lname = req.body.lname;
  var email = req.body.email;
  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: fname,
          LNAME: lname
        }
      }
    ]
  };

  var jsonData = JSON.stringify(data);
  var options = {
    url: 'https://us3.api.mailchimp.com/3.0/lists/eb8096df72',
    method: "POST",
    headers: {
      "Authorization": "vijay a5514f0170464935331c42a4f57aac7e-us3"
    },
    body: jsonData

  }
  request(options,function(error,response,body){
    if(error){
      console.log(error);
    }
    else{
      console.log(response.statusCode);
    }
  });
});

app.listen(3000,function(){
  console.log("Server running on port 3000");
});

//a5514f0170464935331c42a4f57aac7e-us3
//unique id
//eb8096df72
