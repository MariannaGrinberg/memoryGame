// Variables

const cards = ['bicycle', 'leaf', 'cube', 'anchor', 'paper-plane-o', 'bolt', 'bomb', 'diamond'];

// Define A Variable To Hold The Element With The Class 'Container'.

const $container = $('.container');

// Define A Variable To Hold The Element With The Class 'Score-Panel'.

const $scorePanel = $('.score-panel');

// Define A Variable To Hold The Element With The Class 'Fa-Star'.

const $rating = $('.fa-star');

// Define A Variable To Hold The Element With The Class 'Moves'.

const $numOfMoves = $('.moves');

// Define A Variable To Hold The Element With The Class 'Timer'.

const $timer = $('.timer');

// Define A Variable To Hold The Element With The Class 'Restart'.

const $restartButton = $('.restart');

// Define A Variable To Hold The Element With The Class 'Deck'.

const $deck = $('.deck');

// Define An Empty Array To Hold Open Cards.

let openCards = [];

// Define A Variable To Hold The Number Of Matches.

let numOfMatches = 0;

// Define A Variable To Track The Amount Of Seconds That Passed Since The Beginning Of The Game.

let seconds = 0;

// Define A Variable To Track The Number Of Moves Made Since The Beginning Of The Game.

let numOfMoves = 0;

// Define A Variable That Holds An Interval. The Variable Will Also Activate A Method To Display The Number Of Seconds Passed Since The Beginning Of The Game.

let interval = setInterval(() => {$timer.text(`${seconds ++}`)}, 1000);

// Functions

// getRandomIndex - This Function Needs To Return A Random Index.

function getRandomIndex() {

    return Math.floor(Math.random() * cards.length);

}

// Swap - This Function Receives Two Parameters - I & J. Then It Swaps The Elements In Those Positions. 
// This Method Works On The 'Cards' Array.

function swap(i, j) {

    const temp = cards[i];
    cards[i] = cards[j];
    cards[j] = temp;

}

// Shuffle - This Function Shuffles The Deck Of Cards In Order To Insure That Each Card Shows Up In Different Position Every Time We Start A New Game.

function shuffle() {

    for (let i = 0; i < cards.length; i ++)
        swap(i, getRandomIndex());

}

// newGame Function

function newGame() {

    // Empty The UL Element With The Class Of 'Deck'.

    $deck.empty();

    // Set The 'numOfMatches' Variable To 0

    numOfMatches = 0;

    // Set The 'Moves' Variable To 0

    numOfMoves = 0;

    // Set The Text Of The '$numOfMoves' Variable To '0'

    $numOfMoves.text('0');

    // Run A Foor Loop & Activate The 'Add Cards' Method Twice.

    for (let i = 0; i < 2; i ++)
        addCards();

    // Add Cards Listeners

    addCardListeners();

    // Reset Timer

    resetTimer();

}

// addCards Function

function addCards() {

    // Shuffle The Cards Array

    shuffle();

    // Run A For Loop Cards.Length Times. This Loop Will Create <Li> Tags With The Class Of "Card".
    // Inside Each <Li> Tag, Create An <I> Tag With The Class Of "Fa Fa-", Followed By A Name Of A Card.
    // The 'Cards' Array Stores The Name Of Each Card.
    // The Created Elements Will Be Added To The UL With The Class Of 'Deck'.

    for (let i = 0; i < cards.length; i ++)
            $deck.append(`<li class = 'card'><i class = 
            'fa fa-${cards[i]}'></i></li>`);

}

// addCardListeners Function - This Function Will Add An Event Listener To Each Card.

function addCardListeners() {

    // For Each Element With The Class '.Card' In The $deck Variable, Add An Event Click Listener.

    $deck.find('.card').click(function() {

    // If This Element Has A Class Of 'Show' Or 'Match', End The Function With A Return Statement.

    if ($(this).hasClass('show') || $(this).hasClass('match'))
        return;

    // Activate The 'flipCard' Method And Send The Element That Was Clicked As A Parameter.

    flipCard($(this));

    // Activate The 'hasMatch' Method And Send The Element That Was Clicked As A Parameter.

   hasMatch($(this));

    // If Game Is Over
    // Play Winning Effect

     if (isGameOver())
        winningEffect();

    });

}

// flipCard - This Function Will Flip A Card. The Card Will Be Provided As A Parameter To The Function.

function flipCard($card) {

    // Add The Classes 'Show' & 'Open' To The Card That Was Received As A Parameter.

    $card.addClass('show open');

    // Add The Card.HTML() To The openCards Array.
    
    openCards.push($card.html());

}

// hasMatch - This Function Will Check If There Is A Match Between Two Flipped Cards. A Card Will Be Provided As A Parameter To The Function.

function hasMatch($card) {
          
    // If The Length Of 'openCards' Is 2
    
    if (openCards.length === 2){

        // And The Card.HTML() Equals To The 'openCards' Element At Index 0
        if ($card.html() === openCards[0]){

                // Add The Class 'Match' For Each Element In The $deck Variable With The Class 'Open'
                $deck.find('.open').addClass('match');

                // Increment The 'numOfMatches' Variable By 1
                numOfMatches++;

            }

        // Else

        else

            // Set Timeout & Delay For 300 MS,
            // Then Remove The Classes 'Show' & 'Open' From Each Element In The $deck Variable With The Class 'Open'

            setTimeout(function() {$deck.find('.open').removeClass('show open')},300);

             

    // Activate The 'closeCards' Method

    closeCards();

    // Increment The 'Moves' Variable By 1

    numOfMoves++ ;

    // Update The Text Of '$numOfMoves' Variable With The Value Of The 'Moves' Variable

    $numOfMoves.text(numOfMoves);


       }
       
}

// closeCards Function - This Function Will Empty The openCards Array

function closeCards() {

    openCards = [];

}

// resetTimer

function resetTimer() {
 
    /* Technically, also do:
       seconds = 0;
       Supposed to work,
       but the interval will not stop, just change the numbers */

    clearInterval(interval); 
    seconds = 0;
    interval = setInterval(() => {$timer.text(`${seconds ++}`)}, 1000);

}

// isGameOver

function isGameOver() {

    if (numOfMatches === cards.length)
        return true; 

    return false;

}

// winningEffect

function winningEffect() {

    $('#winnerText').text(`It Took You ${seconds} Seconds And ${numOfMoves} Moves To Win The Game. Well Done!`);
    $('#winnerModal').modal('toggle');

}

// Run The Script

// Activate The 'newGame' Function

newGame();

// Add An Event Listener To The Restart Button In Order To Start A New Game

$restartButton.click(function() {newGame()});

