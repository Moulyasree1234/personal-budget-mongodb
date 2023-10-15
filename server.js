const express = require('express');
const app = express();
const cors = require('cors')
const port = 3300;


app.use(cors('*'))

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
const mongoose = require('mongoose')
const titleModel = require('./models/title-schema')
let url = 'mongodb://127.0.0.1:27017/newdatabase';

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log("Connected to database")
}).catch((connectionError) => {
    console.log(connectionError);
})

app.use('/', express.static('public'));

app.get('/hello', (req, res) => {
    res.send('Hello world');
});
app.get("/budget", (req, res) => {
                // Fetch
    titleModel.find({})
    .then((data) => {
        res.send(data);
    })
    .catch((connectionError) => {
        console.log(connectionError);
    })
})
app.post("/addNewBudget", (req, res) => {
    let newData = new titleModel(req.body);
    titleModel.insertMany(newData)
    .then((data)=>{

        res.send("Data Entered Successfully")
    })
    .catch((connectionError)=>{
        res.send(connectionError.message)
    })
})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})