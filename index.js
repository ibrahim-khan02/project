//Setting up path
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
//accessing package for id
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
// normal method for file access //
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// creating array for post//
let posts = [
  {
    id: uuidv4(),
    username: "Ibrahim",
    content: "preparing for first intern"
  },
  {
    id: uuidv4(),
    username: "Harsh",
    content: "Building projects in ML"
  },
  {
    id: uuidv4(),
    username: "Aishwarya",
    content: "Working on Data Visualization"
  }
];
//ROOT ROUTE
app.get("/", (req, res) => {
  res.redirect("/posts");
});

app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});
app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});
app.post("/posts", (req, res) => {
  console.log(req.body);
  let { username, content } = req.body;
  let id = uuidv4();
  posts.push({ id, username, content });
  res.redirect("/posts");
  //res.send("working it is !!");

});
/* app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  //console.log(id);

  let newContent = req.body.content;
  post.content = newContent;
  //console.log(posts);
  res.redirect("/posts");


}); */
app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  let newContent = req.body.content;

  post.content = newContent;

  res.redirect("/posts");
});
app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  //console.log(id);
  res.render("show.ejs", { post });

});
app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("edit.ejs",{post});
});
// delete 
app.delete("/posts/:id",(req,res) =>
{
  let {id} = req.params;
  posts = posts.filter((p) => id !== p.id);
res.redirect("/posts");
});
// checking server 
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});

