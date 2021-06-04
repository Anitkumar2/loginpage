//jshint esversion:6
const express=require("express");
const https=require("https");
const bodyparser=require("body-parser");
const request=require("request");
const app=express();

app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res){
  const firstname=req.body.fname;
  const lastname=req.body.lname;
  const email=req.body.email;
  const data={
    members:[
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME:firstname,
          LNAME:lastname

        }
      }
    ]
  };
  const jsondata=JSON.stringify(data);
  const url="https://us7.api.mailchimp.com/3.0/lists/e0af68333a";
  const options={
    method:"POST",
    auth:"anit:c49599d51219114d5368fb2b67761491-us7"
  };

  const request=https.request(url,options,function(response){
    if(response.statusCode===200){
      res.sendFile(__dirname+"/sucess.html");
    }else{
      res.sendFile(__dirname+"/failure.html");
    }
    response.on("data",function(data){
      console.log(JSON.parse(data));
    });
  });
  request.write(jsondata);
  request.end();
});
app.post("/sucess",function(req,res){
  res.redirect("/");
});
app.post("/failure",function(req,res){
  res.redirect("/");
});


app.listen(process.env.PORT||3000,function(req,res){
  console.log("Server is currently using port 3000");
});
