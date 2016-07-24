module.exports = {
  greeting: function (name) {
      var greetingStr = randFromArray(greetingsArr);
      if(name) {
          greetingStr = randFromArray(hiArray) + " " + name + "! " + greetingStr;
      }
    return greetingStr;
  },
  firstGreeting : function (name) {
    return "Hi " + name + "! It's great that you could stop by and say hello. I'm basically a more interesting version of Fraser that actually replies to messages. What would you like to talk about?";
  }
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