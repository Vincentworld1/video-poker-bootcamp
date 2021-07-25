let deck;
let card;

const header = document.createElement('div');
header.classList.add('cardshow');
header.innerText = 'header';
document.body.appendChild(header);

const playercards = document.createElement('div');
playercards.classList.add('playercard');
playercards.innerText = 'playercard';
document.body.appendChild(playercards);

const vinText = document.createElement('span');
vinText.classList.add('vinText');
vinText.innerText = 'video 5';
const starter = document.querySelector('.starter');
starter.appendChild(vinText);
// player score, start with 100 point
let player5Cards;
const playerHand = [];
const playerScore = 100;
let dealButton;
card = document.createElement('button');
const createCard = (cardInfo) => {
  const suit = document.createElement('div');
  suit.classList.add('suit');
  suit.innerText = cardInfo.suitSymbol;

  const name = document.createElement('div');
  name.classList.add(cardInfo.colour);
  name.innerText = cardInfo.displayName;

  card = document.createElement('button');
  card.classList.add('card');
  card.setAttribute('id', 'toBeRemove');
  card.appendChild(name);
  card.appendChild(suit);
  playercards.appendChild(card);

  return playercards;
};
const cardNameTally = {};
const cardSuitTally = {};

const tallyCards = (playerHand) => {
  let size = 0;
  for (let i = 0; i < playerHand.length; i += 1) {
    const cardName = playerHand[i].displayName;
    if (cardName in cardNameTally) {
      cardNameTally[cardName] += 1;
    }
    else {
      cardNameTally[cardName] = 1;
      size += 1;
      console.log(size);
    }
  } if (size < 5) {
    console.log('pair');
  }

  for (let i = 0; i < playerHand.length; i += 1) {
    const cardSuit = playerHand[i].suit;
    if (cardSuit in cardSuitTally) {
      cardSuitTally[cardSuit] += 1;
    }
    else {
      cardSuitTally[cardSuit] = 1;

      console.log(size);
    }
  }
};
// Get a random index ranging from 0 (inclusive) to max (exclusive).
const getRandomIndex = (max) => Math.floor(Math.random() * max);

// Shuffle an array of cards
const shuffleCards = (cards) => {
  // Loop over the card deck array once
  for (let currentIndex = 0; currentIndex < cards.length; currentIndex += 1) {
    // Select a random index in the deck
    const randomIndex = getRandomIndex(cards.length);
    // Select the card that corresponds to randomIndex
    const randomCard = cards[randomIndex];
    // Select the card that corresponds to currentIndex
    const currentCard = cards[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cards[currentIndex] = randomCard;
    cards[randomIndex] = currentCard;
  }
  // Return the shuffled deck
  return cards;
};

const makeDeck = () => {
  // Initialise an empty deck array
  const newDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];

  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store the current suit in a variable
    const currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      let cardName = `${rankCounter}`;
      let displayCardName = cardName;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === '1') {
        cardName = 'ace';
        displayCardName = 'A';
      } else if (cardName === '11') {
        cardName = 'jack';
        displayCardName = 'J';
      } else if (cardName === '12') {
        cardName = 'queen';
        displayCardName = 'Q';
      } else if (cardName === '13') {
        cardName = 'king';
        displayCardName = 'K';
      }
      let cardSymbol = '';
      if (currentSuit == 'diamonds') {
        cardSymbol = '♦️';
      } else if (currentSuit == 'hearts') {
        cardSymbol = '♥️';
      } else if (currentSuit == 'clubs') {
        cardSymbol = '♣️';
      } else if (currentSuit == 'spades') {
        cardSymbol = '♠️';
      }
      // Create a new card with the current name, suit, and rank

      cardInfo = {
        suitSymbol: cardSymbol,
        suit: currentSuit,
        name: cardName,
        displayName: displayCardName,
        colour: 'red',
        rank: rankCounter,

      };

      // Add the new card to the deck
      newDeck.push(cardInfo);
    }
  }

  // Return the completed card deck
  return newDeck;
};

let counter = 0;

const DealingButtonClick = (buttonHold) => {
  // if dedck have less then 5 card , make more cards
  if (deck.length < 5) {
    console.log('test');
    deck = shuffleCards(makeDeck());
  }
  // if its not first click , remove cards and remove playerhand array cards
  if (counter >= 1) {
    for (let i = 0; i < 5; i += 1) {
      const elem = document.getElementById('toBeRemove');
      elem.parentNode.removeChild(elem);
      playerHand.pop();
    }
  }
  // display 5 new cards and sore it in playerhand array
  for (let i = 0; i < 5; i += 1) {
    player5Cards = deck.pop();
    createCard(player5Cards);
    playerHand.push(player5Cards);
  }
  counter += 1;
  tallyCards(playerHand);
};
// not working

dealButton = document.createElement('button');
dealButton.classList.add('dealButton');
dealButton.innerText = 'Deal';
document.body.appendChild(dealButton);
const displayPoint = document.createElement('div');
displayPoint.innerText = playerScore;
document.body.appendChild(displayPoint);
dealButton.addEventListener('click', (event) => {
  DealingButtonClick(event.currentTarget);
});

console.log(makeDeck());
deck = shuffleCards(makeDeck());
const initGame = () => {
  makeDeck();
};
initGame();
