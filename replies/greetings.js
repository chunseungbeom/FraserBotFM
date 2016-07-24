module.exports = {
  greeting: greeting,
  firstGreeting: firstGreeting
}

var genericGreeting =  function (arr, name) {
      var greetingStr = randFromArray(arr);
      if(name) {
          greetingStr = randFromArray(hiArray) + " " + name + "! " + greetingStr;
      }
    return greetingStr;
  }
  
  // May have totally over complicated this
  // Not sure I want greeting and firstGreeting to be coupled like this but an interesting use of bind
 var greeting = genericGreeting.bind(this, greetingsArr);
 var firstGreeting = genericGreeting.bind(this, firstGreetingsArr);

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
    
var firstGreetingsArr = [
    "Thanks for dropping by!",
    "Nice to see you here!",
    "Glad you could make it!",
    ]