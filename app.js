var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    request = require("request");
    
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    
     app.listen(process.env.PORT, process.env.IP, function() {
        console.log("FraserBot is underway!!...Finally")
    })
    
    // Routes ==========================================================
    
    app.get("/", function(req, res) {
        res.send("Yup it's working");
    });
    
   // Facebook Webhook
    app.get('/webhook', function (req, res) {
        if (req.query['hub.verify_token'] === 'fraserbot_verify_token') {
            res.send(req.query['hub.challenge']);
        } else {
            res.send('Invalid verify token');
        }
    });
    
   