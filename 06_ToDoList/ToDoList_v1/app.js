const express = require('express');
const bodyParser = require('body-parser');
const title = require(__dirname + '/title.js');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');

const items = [];
const workItems = [];

app.get("/",function(req,res){
    const homeTitle = title.getDate();
    res.render('list', {listTitle: homeTitle, newListItems: items});
});

app.post("/", function(req, res) {
    const item = req.body.newItem;

    if (req.body.button === "Work"){
        workItems.push(item);
        res.redirect("/work");
    } 
    else{
        items.push(item);
        res.redirect("/");
    }
});

app.get("/work", function(req,res) {
    res.render('list', {listTitle: "Work", newListItems: workItems});
});

app.get("/about", function(req,res) {
    res.render('about');
});

app.listen(3000, function(){
    console.log("Server started on port 3000");
});