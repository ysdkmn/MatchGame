var MatchGame = {};

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/

$(document).ready(function() {
  var $game = $('#game');
  var values = MatchGame.generateCardValues();
  MatchGame.renderCards(values, $game);
});
/*
  Generates and returns an array of matching card values.
 */

MatchGame.generateCardValues = function() {
  var cardValues = [];
  while (cardValues.length < 16) {
    var x = Math.floor((Math.random() * 10) + 1);

    function numberCheck(num) {
      return num == x;
    }
    if (x <= 8) {
      if (cardValues.filter(numberCheck).length < 2) {
        cardValues.push(x);
      }
    }
  }
  return cardValues;
};

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/


MatchGame.renderCards = function(cardValues, $game) {
  var colors = [
    'hsl(25, 85%, 65%)',
    'hsl(55, 85%, 65%)',
    'hsl(90, 85%, 65%)',
    'hsl(160, 85%, 65%)',
    'hsl(220, 85%, 65%)',
    'hsl(265, 85%, 65%)',
    'hsl(310, 85%, 65%)',
    'hsl(360, 85%, 65%)'
  ];

  $game.empty();
  $game.data("flippedCards", []);

  for (var i = 0; i < cardValues.length; i++) {
    var value = cardValues[i];
    var color = colors[value - 1];
    var data = {
      value: value,
      color: color,
      isFlipped: false
    };

    var $cardElement = $('<div class="col-xs-3 card"></div>');
    $cardElement.data(data);

    $game.append($cardElement);

    $('.card').click(function() {
      MatchGame.flipCard($(this), $('#game'));
    });
  }

};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {
  if ($card.data('isFlipped')) {
    return;
  }

  $card.data('isFlipped', true)
    .css('background-color', $card.data('color'))
    .text($card.data('value'));

  /*var flippedCards = $game.data('flippedCards');*/
  var flippedCards=[]
  flippedCards.push($card);
  var testVal = []
  for (var i = 0; i < flippedCards.length; i++) {
    testVal.push(flippedCards[i].data('value'));
  };
  console.log(testVal);
};
