const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const Routes = require('./routes/Routes');
require('dotenv').config();
const app = express();

app.use(cors());
app.use(express.json());
app.get(`/`, (req, res) => {
     res.send({title: 'Welcome to Nanoforum API', body: 'APIs are available api/v1/ '});
});
app.use(`/api/${process.env.API_VERSION}/`, Routes);
console.log(process.env.PORT);
const port = process.env.PORT || 8000; 
app.listen(port, () => {
    try {
        mongoose.connect('mongodb://127.0.0.1:27017/nano');
        console.log(`Connection Established!`);
    } catch(e) {
        console.log("connection failed!");
    }
});
