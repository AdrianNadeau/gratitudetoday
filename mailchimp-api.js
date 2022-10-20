const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const path = require("path");

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')))

app.post('/subscribe', (req, res) => {
    const {email} = req.body;
    const addData = {
        members: [
           {
              email_address: email,
              status: "pending"
           }
        ]
    }
    addDataJson = JSON.stringify(addData);

    const options = {
        url: "https://us6.api.mailchimp.com/3.0/lists/ac7ad45fa0",
        method: "POST",
        headers: {
            Authorization: "auth d6a06fa0fd2948a58d714cb222347fe9-us5"
        },
        body: addDataJson
    }
    
    request (options, (error, response, body) => {
        body = JSON.parse(body)
        if(body.errors) {
            res.sendStatus(400) // error :(
        } else {
            res.sendStatus(200); //successful :)
        }
     })
 })

const PORT = process.env.PORT || 8888;

app.listen(PORT, console.log('The server has started!'));