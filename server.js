// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require ('express');
// Require bodyParser
const bodyParser = require('body-parser');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;

const localServer = app.listen(port , function listening(){

console.log(`Server is running on http://localhost\:${port}`);

});

// GET and POST routes
    //GET 
app.get('/dataGet', allData)
function allData(req , res){
    res.send(projectData)
}
    //POST
app.post('/dataPost', allDataPost)
function allDataPost(req , res) {

    projectData["temp"]=req.body.temp; //->> Temperature
    projectData["date"]=req.body.date;// ->> Date
    projectData["content"]=req.body.content;//->> user response to "How are you feeling today?"

    res.send(projectData);
    console.log(req.body); // to show the data on the terminal
}