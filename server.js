const path = require("path");
const fs = require("fs");
const express = require("express");
const shortid = require("shortid");

// Express App
const app = express();
// setup server port
var PORT = process.env.PORT || 8000; 

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Create static folder to retrive css and js 
app.use(express.static(path.join(__dirname, 'public')));


// Basic Routes
app.get('/', (req, res) => {
    console.log("app.get '/' hit");
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/notes', (req, res) => {
    console.log("app.get '/' hit");
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

// GET REQUEST
app.get('/api/notes', (req, res) => {
    console.log("app.get request hit");
    fs.readFile('public/db/db.json', 'utf8', function(err, data){
        if (err){ throw err};
        var allNotes = JSON.parse(data);
        return res.json(allNotes);
    });
});

// Post Request
app.post('/api/notes', (req, res) => {
    fs.readFile("public/db/db.json", function(error, data) {
      if (error) {
        throw error;
      };
      let allNotes = JSON.parse(data);
      let newNote = {
        title: req.body.title,
        text: req.body.text,
        id: shortid.generate()
      }
      allNotes.push(newNote);
      fs.writeFile("public/db/db.json", JSON.stringify(allNotes, null, 2), (error) => {
        if (error) {
          throw error;
        };
        res.send('200');
      });
    });
  });


// Delete Request
app.delete('/api/notes/:id', (req, res) => {
    console.log("app delete request hit");
    let chosen = req.params.id;
    fs.readFile('public/db/db.json', (err, data) =>{
        
        if (err){throw err};
        
        // db gathering for json update
        let allNotes = JSON.parse(data);
        function searchChosen(chosen, allNotes){
            for (var i = 0; i < allNotes.length; i++){
                if (allNotes[i].id === chosen){allNotes.splice(i, 1)};
            }
        }
        searchChosen(chosen, allNotes);
        // Write updated Json to array
        fs.writeFile('public/db/db.json', JSON.stringify(allNotes, null, 2),(err) => {
            console.log("fs.writeFile-delete hit");
            // Error Check
            if (err){throw err};
            res.send('200');
        });
    });
});



app.listen(PORT, function(){
    console.log("Coming in loud and clear at PORT: " + PORT);   
});
