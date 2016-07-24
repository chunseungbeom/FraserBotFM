module.exports = {
  greeting: function (name) {
      var greetingStr = randFromArray(greetingsArr);
      if(name) {
          greetingStr = randFromArray(hiArray) + " " + name + "! " + greetingStr;
      }
    return greetingStr;
  },
  firstGreeting : function (recipientId, name) {
            var text =  "Hi " + name + "! It's great that you could stop by and say hello. I'm basically a more interesting version of Fraser that actually replies to messages.";
            var message = {
            "attachment": {
                  "type":"template",
                  "payload":{
                    "template_type": "button",
                    "text": text,
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
  },

};

var greetingsArr = [
    "How's it going?",
    "All well with you?",
    "How are you?",
    "What's new?",
    "Alright there?",
    "What's the haps?"
    ];
    
function randFromArray(arr) {
    var rand = arr[Math.floor(Math.random() * arr.length)];
    return rand;
}

var hiArray = [
    "Hi",
    "Hey",
    "Oh hey",
    "Gidday",
    "Yo",
    "Sup"
    ];