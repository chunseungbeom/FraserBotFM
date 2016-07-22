module.exports = {
    respond: respond,
    sendMessage: sendMessage,
    seenMessage: seenMessage,
    typingMessage: typingMessage
}

function splashState(recipientId, subState) {
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