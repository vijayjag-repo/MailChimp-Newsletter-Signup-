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
      "Authorization": "vijay (replace with API Key)"
    },
    body: jsonData

  }
  request(options,function(error,response,body){
    if(error){
      res.sendFile(__dirname+"/failure.html");
    }
    else{
      if(response.statusCode===200){
        res.sendFile(__dirname+"/success.html");
      }
      else{
        res.sendFile(__dirname+"/failure.html");
      }
    }
  });
});

app.post("/failure",function(req,res){
  res.redirect("/");
});

app.listen(3000,function(){
  console.log("Server running on port 3000");
});


//unique id
//eb8096df72
