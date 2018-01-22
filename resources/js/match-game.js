var MatchGame = {};

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/

/*
  Generates and returns an array of matching card values.
 */

MatchGame.generateCardValues = function() {
  var deck = [];
  while (deck.length < 16) {
    var x = Math.floor((Math.random() * 10) + 1);

    function numberCheck(num) {
      return num == x;
      console.log (num == x);
    }

    if (x <= 8) {
      if (deck.filter(numberCheck).length < 2) {
        deck.push(x);
      }
    }
  }
  return deck;
};

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

MatchGame.renderCards = function(cardValues, $game) {

};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {

};
