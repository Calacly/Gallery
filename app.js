const express = require("express"); //needs npm i express
const fetch = require("node-fetch"); //normal fetch cannot be used in Node
const ejs = require("ejs");
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
require("dotenv").config(); //without setting it as a variable


//TODO: Add functionality to load more pages of photos
//TODO: Add functionality to be able to click on a photo and have it flip the card with some info about the photo on the back   


let imagesURLS = [];

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.set("view engine", "ejs");


app.get("/", (req, res) => {
    
    res.render("home", {imagesURLS: imagesURLS});
      
})




app.post("/", (req, res) => {
    
    const query = req.body.photoType; //tested: working
    const apiKey = process.env.API_KEY;
    const url = "https://api.unsplash.com/search/photos?per_page=30&query=" + query + "&client_id=" + apiKey;

    
fetch(url)
.then((response) => { 
 return response.json(); 
}).then(data => {
    imagesURLS = [];
    data.results.forEach(photo => {
        
        imagesURLS.push(photo.urls.small)
        
        
    })  
    res.redirect("/") // It is necessary to use res.redirct() at this level (inside .then(data)) try putting it just before the post() request closes and see what happens.
})
.catch(err => {console.log(`error: ${err}`);});
})

app.listen(port, () => console.log(`Server running on port ${port}`));







