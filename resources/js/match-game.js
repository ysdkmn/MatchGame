var MatchGame = {};

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/

$(document).ready(function() {
  var $game = $('#game');
  $game.data('moveCount', 0)
    .data('flippedPairs', 0);
  var values = MatchGame.generateCardValues();
  MatchGame.renderCards(values, $game);
  cardSize();
  $(window).resize(cardSize);
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
      MatchGame.moveCounter($(this), $('#game'));
      MatchGame.flipCard($(this), $('#game'));
    });


  }


};

/* set cardElement height to equal width */

function cardSize() {
  var cardHeight = $('.card').innerWidth();
  $('.card').css('height', cardHeight);
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

  var flippedCards = $game.data('flippedCards');
  flippedCards.push($card);

  if (flippedCards.length === 2) {
    if (flippedCards[0].data('value') === flippedCards[1].data('value')) {
      var matchCss = {
        'background-color': 'rgb(153, 153, 153)',
        'color': 'rgb(204,204,204)'
      };
      flippedCards[0].css(matchCss);
      flippedCards[1].css(matchCss);

      /* store pair, check for win and run win sequence if true */
      $game.data('flippedPairs', $game.data('flippedPairs') + 1);
      MatchGame.winSequence($game);

    } else {
      window.setTimeout(function() {
        flippedCards[0].data('isFlipped', false)
          .css('background-color', 'rgb(32, 64, 86)')
          .text('');
        flippedCards[1].data('isFlipped', false)
        flippedCards[1].css('background-color', 'rgb(32, 64, 86)')
          .text('');
      }, 350);
    }
    $game.data('flippedCards', []);
  }
};

/* Counts number of moves a player makes until game is won */

MatchGame.moveCounter = function($card, $game) {
  if ($card.data('isFlipped')) {
    return;
  }

  var flippedCards = $game.data('flippedCards');

  if (flippedCards.length === 1) {
    moveCount = $game.data('moveCount');
    moveCount += 1;
    $('.moves').text(moveCount);
    $game.data('moveCount', moveCount);
  }
};

/* Restarts the game with new random card locations, resets time clock, and resets move counter */

$('.restart').click(function() {
  var $game = $('#game');
  $game.data('moveCount', 0);
  $('.moves').text(0);
  var values = MatchGame.generateCardValues();
  MatchGame.renderCards(values, $game);
  cardSize();
})

/* Runs win sequence once all pairs are matched */

MatchGame.winSequence = function($game) {
  if ($game.data('flippedPairs') !== 8) {
    return;
  }
  $('#win').css('display', 'flex');
};

/* Remove win display with a click */

$('#win').click(function() {
  $('#win').css('display', 'none');
});
