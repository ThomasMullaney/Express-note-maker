var path = require("path");
const fs = require("fs");
const express = require("express");
var noteData= require("./db/db.json")

// const routeApi = require("./routes/api");
// const routeHtml = require("./routes/html");


// matts version of code
// const PORT = process.env.PORT // 3000;

// app.use(express.static("public"));
// app.use(express.urlencoded({extended: ture}));
// app.use(express.json());

// require("./Develop/routes/apiRoutes")(app);
// require("./Develop/routes/htmlRoutes")(app);


const PORT = process.env.PORT || 2000;
const app = express();

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// HTML ROUTEs
app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "./develop/public/index.html"))
});
app.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname, "./Develop/public/notes.html"));
});
app.get("*", function(req,res){
    res.sendFile(path.join(__dirname, "./Develop/public/index.html"))
});



// API ROUTES


app.get("/api/notes", function(req, res){

});

app.post("/api/notes", function(req, res){
    console.log("Testing")
    fs.writeFile(noteData, function(err, data){
        if (err) throw err;
        res.writeHead(200, {"Content-Type": "text/html"});
    });
});

app.listen(PORT, function(){
    console.log("App listening on PORT " + PORT)
});