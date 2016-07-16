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
    
    
//=====================================================================================================================
 // handler receiving messages
app.post('/webhook', function (req, res) {
    var events = req.body.entry[0].messaging;
    for (i = 0; i < events.length; i++) {
        var event = events[i];
        if (event.message && event.message.text) {
            sendMessage(event.sender.id, {text: "Echo: " + event.message.text});
        }
    }
    res.sendStatus(200);
});

// generic function sending messages
function sendMessage(recipientId, message) {
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token: process.env.PAGE_ACCESS_TOKEN},
        method: 'POST',
        json: {
            recipient: {id: recipientId},
            message: message,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending message: ', error);
        } else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }
    });
};