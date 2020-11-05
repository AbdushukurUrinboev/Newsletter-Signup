let express = require("express");
let bodyParser = require("body-parser");
// let request = require("request");
let https = require("https");

let app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
    let firstName = req.body.fName;
    let lastName = req.body.lName;
    let email = req.body.email;

   let data = {
        members: [
            {
                email_adress: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName

                }
            }
        ]
   };
   let jsonData = JSON.stringify(data);

   let url = "https://us10.api.mailchimp.com/3.0/lists/45f43a008f";

   let options = {
       method: "POST",
       auth: "Abdushukur:342eddc06b7c7b2c7ac6f0cbbbbefc15-us10"  
   }

   let request = https.request(url, options, function(response){
   
     if (response.statusCode ===200) {
           res.sendFile(__dirname + "/success.html");
       } else {
           res.sendFile(__dirname + "/failure.html");
       }
    response.on("data", function(data){
        console.log(JSON.parse(data));
        
    });
   });

   request.write(jsonData);
   request.end();
});

app.post("/failure", function(req, res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function() {
    console.log("Server is running on port 3000");
    
});



// API KEYS

// 342eddc06b7c7b2c7ac6f0cbbbbefc15-us10
// list ID: 45f43a008f

