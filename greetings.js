module.exports = {
  greeting: function (name) {
      var greetingStr = randFromArray(greetingsArr);
      if(name) {
          greetingStr = randFromArray(hiArray) + " " + name + "! " + greetingStr;
      }
    return greetingStr;
  },
  bar: function () {
    // whatever
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