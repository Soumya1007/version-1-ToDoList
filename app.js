const express=require("express");
const bodyparser=require("body-parser");

const app=express();
let tasks=[];
let workItems=[];
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine','ejs');

app.get("/",function(req,res)
{
    let today=new Date();
   let options=
   {
    weekday:"long",
    day: "numeric",
    month:"long"
   };

    let day=today.toLocaleDateString("en-US",options);
   res.render("list",{listTitle:day , newtasks:tasks});
});

app.post("/",function(req,res)
{
    let task=req.body.task;
    console.log(req.body);
    if(req.body.list==="Work List")
    {
        workItems.push(task);
        res.redirect("/work"); 
    }
    else{
        tasks.push(task);
        res.redirect("/");
    }
 
});
app.get("/work",function(req,res)
{
res.render("list",{listTitle:"Work List", newtasks:workItems});
});

app.post("/work",function(req,res)
{
    let task=req.body.task;
    workItems.push(task);
   res.redirect("/work");
})
app.listen(3000,function()
{
    console.log("server is on port 3000");
});