//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://0.0.0.0:27017/wikiDB");

const articleSchema = {
    title: String,
    content: String
};

const Article = mongoose.model("Article", articleSchema);

app.route("/articles")

    .get(function (req, res) {
        async function myfun() {
            const foundArticles = await Article.find();
            res.send(foundArticles);
          }
          myfun();    
    })

    .post(function (req, res) {
        const newArticle = new Article({
            title : req.body.title,
            content : req.body.content
        });
        newArticle.save();
    })

    .delete(function (req, res) {
        async function myfun() {
            const foundArticles = await Article.deleteMany();
            res.send(foundArticles);
        }
        myfun(); 
    })
;

app.route("/articles/:articleTitle")

    .get(function(req,res) {
        async function myfun(){
            const result = await Article.findOne({title:req.params.articleTitle}).exec();
            if(!result){
                res.send("Error: Article not found");
            }
            else {
                res.send(result);
            }
        }
        myfun();
    })

    .put(function(req,res) {
        async function myfun(){
            const result = await Article.replaceOne({title:req.params.articleTitle}, {title: req.body.title, content:req.body.content});
            if(result.acknowledged){
                res.send("Successfully updated article");
            }
            else {
                res.send("Error: Article not Inserted");
            }
        }
        myfun();
    })

    .patch(function(req,res) {
        async function myfun(){
            const result = await Article.updateOne({title:req.params.articleTitle}, {$set: req.body});
            if(result.acknowledged){
                res.send("Successfully updated article");
            }
            else {
                res.send("Error: Article not Inserted");
            }
        }
        myfun();
    })

    .delete(function (req, res) {
        async function myfun() {
            const result = await Article.deleteOne({title: req.params.articleTitle});
            if(result.deletedCount) {
                res.send("Successfully deleted")
            }
            else {
                res.send("Error: Couldn't delete")
            }
        }
        myfun(); 
    })
;


app.listen(3000, function() {
  console.log("Server started on port 3000");
});