var fraser;
var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    request = require("request");
    
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    
    var tools = require('./replies/greetings');
    //console.log(tools.namedGreeting());
    
     app.listen(process.env.PORT, process.env.IP, function() {
        console.log("FraserBot is underway!!...Finally")
         console.log(tools.greeting("Fraser"));
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
    for (var i = 0; i < events.length; i++) {
        var event = events[i];
        if (event.message && event.message.text) {
            if(event.message.text === "hello"){
                respond(event.sender.id, {text: tools.greeting("Fraser")});
            } else if(!buttonMessage(event.sender.id, event.message.text)){
                if (!quickRepliesMessage(event.sender.id, event.message.text)) {
                    respond(event.sender.id, {text: "Echo: " + event.message.text});
                }
            }
        } else if (event.postback) {
            console.log("Postback received: " + JSON.stringify(event.postback.payload));
            respond(event.sender.id, {text: JSON.parse(event.postback.payload)});
        }
    }
    res.sendStatus(200);
});


var respondTools = require('./respond');

var respond = respondTools.respond;

function buttonMessage(recipientId, text) {
    
    text = text || "";
    
    if(text === "buttons"){
            
            var message = {
            "attachment": {
                  "type":"template",
                  "payload":{
                    "template_type": "button",
                    "text":"How can I be of service?",
                    "buttons":[
                      {
                        "type":"postback",
                        "title":"Leave a message for Fraser",
                        "payload":"leaveMessage"
                      },
                      {
                        "type":"postback",
                        "title":"Chat with me",
                        "payload":"chat"
                      },
                       {
                        "type":"postback",
                        "title":"Annoy Fraser",
                        "payload":"annoy"
                      }
                    ]
                  }
              }
            };
    
            respond(recipientId, message);
            
            return true;
        }
    
    
    return false;
    
};

function quickRepliesMessage(recipientId, text) {
    
    text = text || "";
    
    if(text === "quick"){
        var message = {
            "text":"Pick a color:",
            "quick_replies":[
              {
                "content_type":"text",
                "title":"Red",
                "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_RED"
              },
              {
                "content_type":"text",
                "title":"Green",
                "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_GREEN"
              },
                  {
                "content_type":"text",
                "title":"Red",
                "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_RED"
              },
              {
                "content_type":"text",
                "title":"Green",
                "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_GREEN"
              },
                  {
                "content_type":"text",
                "title":"Red",
                "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_RED"
              },
              {
                "content_type":"text",
                "title":"Green",
                "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_GREEN"
              }
            ]
          }
        
            respond(recipientId, message);
            
            return true;
        }
    
    
    return false;
    
};





function initialState(recipientId, subState) {
        var text = "";
        if(subState === "newPerson") {
             text = namedGreeting();
        } else if (subState === "familiarPerson") {
            text = greeting();
        }
        
      var message = {
            "attachment": {
                  "type":"template",
                  "payload":{
                    "template_type": "button",
                    "text": text,
                    "buttons":[
                      {
                        "type":"postback",
                        "title":"Leave message for Fraser",
                        "payload":"leaveMessage"
                      },
                      {
                        "type":"postback",
                        "title":"Chat with me",
                        "payload":"chat"
                      },
                       {
                        "type":"postback",
                        "title":"Annoy Fraser",
                        "payload":"annoy"
                      }
                    ]
                  }
              }
            };
}


//  "attachment": {
//                   "type":"template",
//                   "payload":{
//                     "template_type": "button",
//                     "text":"What do you want to do next?",
//                     "buttons":[
//                       {
//                         "type":"web_url",
//                         "url":"https://petersapparel.parseapp.com",
//                         "title":"Show Website"
//                       },
//                       {
//                         "type":"postback",
//                         "title":"Start Chatting",
//                         "payload":"USER_DEFINED_PAYLOAD"
//                       }
//                     ]
//                   }
//               }
//             };

// // send rich message with kitten
// function kittenMessage(recipientId, text) {
    
//     text = text || "";
//     var values = text.split(' ');
    
//     if (values.length === 3 && values[0] === 'kitten') {
//         if (Number(values[1]) > 0 && Number(values[2]) > 0) {
            
//             var imageUrl = "https://placekitten.com/" + Number(values[1]) + "/" + Number(values[2]);
            
//             var message = {
//                 "attachment": {
//                     "type": "template",
//                     "payload": {
//                         "template_type": "generic",
//                         "elements": [{
//                             "title": "Kitten",
//                             "subtitle": "Cute kitten picture",
//                             "image_url": imageUrl ,
//                             "buttons": [{
//                                 "type": "web_url",
//                                 "url": imageUrl,
//                                 "title": "Show kitten"
//                                 }, {
//                                 "type": "postback",
//                                 "title": "I like this",
//                                 "payload": "User " + recipientId + " likes kitten " + imageUrl,
//                             }]
//                         }]
//                     }
//                 }
//             };
    
//             respond(recipientId, message);
            
//             return true;
//         }
//     }
    
//     return false;
    
// };