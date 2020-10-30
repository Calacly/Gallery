const express = require("express"); 
const fetch = require("node-fetch"); 
const ejs = require("ejs");
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
require("dotenv").config(); 


//TODO: Add functionality to load more pages of photos
//TODO: Add functionality to be able to click on a photo and have it flip the card with some info about the photo on the back   


let photoData = [];


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.set("view engine", "ejs");


app.get("/", (req, res) => {
    
    res.render("home", {
        photoData: photoData,
    });
      
})




app.post("/", (req, res) => {
    
    const query = req.body.photoType; 
    const apiKey = process.env.API_KEY;
    const url = "https://api.unsplash.com/search/photos?per_page=30&query=" + query + "&client_id=" + apiKey;

    
fetch(url)
.then((response) => { 
 return response.json(); 
}).then(data => {
    photoData = [];
    
    data.results.forEach(item => {
        
        photoData.push(item)
        
        
    })  
    res.redirect("/") 
})
.catch(err => {console.log(`error: ${err}`);});
})

app.listen(port, () => console.log(`Server running on port ${port}`));







