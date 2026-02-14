//basic setup
const express = require("express");
const app = express();
const port = 8080
app.listen (port , () =>
{
    console.log(`Server is working ${port}`);
});
const path = require("path");
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");
app.use(methodOverride("_method"));


// url setup
app.get("/posts" ,(req,res) =>
{
  res.render("prindex.ejs",{posts});
});

// creating array with id // 
let posts = [
    {
        id: uuidv4(),
        username :"Ibrahim",
        content:"practicing rest "
    },
    {
         id: uuidv4(),
        username :"Zakariya",
        content:"will learn databases "
    }
];
// creating new post that will come on web page 
app.post("/posts",(req,res) =>
{
let {username,content } = req.body;
let id = uuidv4();
// creating new id //
posts.push({id,username,content});
res.redirect("/posts");
});
app.get("/posts/new" ,(req,res) =>
{
res.render("prnew.ejs",{posts});
});
// creating for random id's with any post  //

 app.get("/posts/:id" , (req,res) =>
{
    let {id} = req.params;
    // this is written so that it can access any id //
    console.log(id);
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs" , {post});
});
// creating patch so that we can edit our post //
app.patch("/posts/:id",(req,res) =>
{
let {id} = req.params;
let newContent = req.body.content;
let post = posts.find((p) => id === p.id);
post.content = newContent;
res.redirect("/posts");


});
 
 /* app.get("/posts/:id/edit" ,(req,res) =>
{
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("predit.ejs",{post});

}); */