let deck;
let card;
let playerHandcards = [];
let cardButtonArray = [];
let storeCardsforFirstround = [];
let outcomeMessage = '';
let playerScore = 100;
let playerBet = 0;
let counter = 0;
const header = document.createElement('div');
header.classList.add('header');
const headingWords = document.createElement('div');
headingWords.classList.add('heading-words');
headingWords.innerHTML = '🃏 Video Poker 🃏';
header.appendChild(headingWords);
document.body.appendChild(header);

const playercards = document.createElement('div');
playercards.classList.add('playercard');
document.body.appendChild(playercards);

// const vinText = document.createElement('span');
// vinText.classList.add('vinText');
// vinText.innerText = 'video 5';
// const starter = document.querySelector('.starter');
// starter.appendChild(vinText);
// player score, start with 100 point
let player5Cards;
let bettingButton;
let dealButton;
card = document.createElement('button');

let cardNameTally = {};
let cardSuitTally = {};
// winning rule
// pair of jack =no decrease of credit
const checkForPairofJack = () => {
  if (cardNameTally.J === 2) {
    console.log(cardNameTally.J === 2);
    console.log('jack');
    outcomeMessage = 'Pair of jack';
  }
  return outcomeMessage;
};

// 2 pair of cards  x2 , same numbers ///////////////////////WORKING!
const PairOfcards = () => {
  const entries = Object.entries(cardNameTally);
  console.log('test3');
  console.log(entries);

  for (let i = 0; i < entries.length; i += 1) {
    console.log(entries[i][1]);
    console.log(entries[i][1] == 2);
    if (entries[i][1] == 2) {
      console.log('test4');
      outcomeMessage = '2 pair of card';
      console.log(outcomeMessage);
      playerBet *= 2;
      console.log(playerBet * 2);
      return outcomeMessage;
    }
  }
};

// 3 of a kind x3 , 3 of the same numbers
const threeOfAKind = () => {
  const entries = Object.entries(cardNameTally);
  for (let i = 0; i < entries.length; i += 1) {
    if (entries[i][1] === 3) {
      outcomeMessage = '3 of a kind';
      playerBet *= 3;
    }
    return outcomeMessage;
  }
};
// straight x4 , 5 card in sequenital order
const striaght = () => {
  const cardKeys = Object.keys(cardNameTally);
  // sort lowest to highest
  const lowestToHighest = cardKeys.sort((a, b) => a - b);
  for (let i = 0; i < lowestToHighest.length - 1; i += 1) {
    if (Number(lowestToHighest[i]) + 1 === lowestToHighest[i + 1]) {
      outcomeMessage = 'Striaght!';
      playerBet *= 4;
    }
  }
  return outcomeMessage;
};
// flush x5, 5 card in same suit
const flush = () => {
  const cardValue = Object.values(cardSuitTally);
  if (cardValue[0] == 5) {
    outcomeMessage = 'Flush!';
    playerBet *= 5;
  }
  return outcomeMessage;
};
// full house x 9 , a pair and 3 of a kind
const fullHouse = () => {
  const cardValue = Object.values(cardNameTally);

  if (cardValue[0] == 3 && cardValue[1] == 2
      || cardValue[1] == 3 && cardValue[0] == 2
  ) {
    playerBet *= 9;
    outcomeMessage = 'full house!';
  }
  return outcomeMessage;
};
// four of a kind x25 , exmaple all 4 aces
const fourOfaKind = () => {
  const cardValue = Object.values(cardNameTally);
  // sort lowest to highest

  for (let i = 0; i < cardValue.length; i += 1) {
    if (Number(cardValue[i]) === 4) {
      outcomeMessage = '4 of a kind!';
      playerBet *= 25;
    }
  }
  return outcomeMessage;
};
// stright flush  x50 , 5 card in sequenital order and the same suit
const striaghtFlush = () => {
  const cardKeys = Object.keys(cardNameTally);
  const cardValue = Object.values(cardSuitTally);
  // sort lowest to highest
  const lowestToHighest = cardKeys.sort((a, b) => a - b);
  for (let i = 0; i < lowestToHighest.length - 1; i += 1) {
    if (Number(lowestToHighest[i]) + 1 == lowestToHighest[i + 1] && cardValue[0] == 5) {
      outcomeMessage = 'striaghtFlush';
      playerBet *= 50;
    }
  }
  return outcomeMessage;
};
// Royal Flush x 800 ,a Ten, a Jack, a Queen, a King and an Ace of the same suit
const royalFlush = () => {
  const cardValue = Object.values(cardSuitTally);
  const cardKeys = Object.keys(cardNameTally);
  if (cardValue[0] == 5 && cardKeys.includes('10')
   && cardKeys.includes('J') && cardKeys.includes('Q') && cardKeys.includes('K') && cardKeys.includes('A')) {
    outcomeMessage = 'Royal Flush!!';
    playerBet *= 800;
  }
  return outcomeMessage;
};
const tallyCards = () => {
  let size = 0;
  for (let i = 0; i < playerHandcards.length; i += 1) {
    const cardName = playerHandcards[i].displayName;
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

  for (let i = 0; i < playerHandcards.length; i += 1) {
    const cardSuit = playerHandcards[i].suit;
    if (cardSuit in cardSuitTally) {
      cardSuitTally[cardSuit] += 1;
    }
    else {
      cardSuitTally[cardSuit] = 1;

      console.log(size);
    }
  }
};
const resetGame = () => {
  outcomeMessage = '';
  playerHandcards = [];
  cardButtonArray = [];
  storeCardsforFirstround = [];
  cardNameTally = {};
  cardSuitTally = {};
  dealButton.disabled = true;
  playerBet = 0;
  bettingButton.innerText = `Credit Bet: ${playerBet}`;
};

const winningCondition = () => {
  console.log('test2');
  PairOfcards();
  checkForPairofJack();
  threeOfAKind();
  striaght();
  flush();
  fullHouse();
  fourOfaKind();
  striaghtFlush();
  royalFlush();

  if (outcomeMessage == '') {
    console.log(outcomeMessage == '');
    outcomeMessage = 'You Lost!';
    playerScore -= playerBet;
  } else {
    playerScore += playerBet;
    console.log(`${playerBet}player bet`);
  }
  displayPoint.innerText = `Your total credit ${playerScore}.\n ${outcomeMessage}`;
  resetGame();
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
      cardName = `${rankCounter}`;
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
const clickbettingbutton = () => {
  dealButton.disabled = false;
  playerBet += 1;
  if (playerBet === 5) {
    bettingButton.disabled = true;
  }
  playercards.innerText = '';
  bettingButton.innerText = `Credit Bet: ${playerBet}`;
};
const showHoldContainer = document.createElement('div');
showHoldContainer.classList.add('showholdcontainer');
const showHold = document.createElement('div');
showHold.classList.add('holdMsg');

const holdButtonClick = (holdButtonElement, j) => {
  console.log(holdButtonElement.innerText);

  if (cardButtonArray[j] === 'discard') {
    cardButtonArray[j] = 'hold';
    console.log('hold button array', cardButtonArray);
    showHold.innerText = 'hold';
    playerHandcards.push(storeCardsforFirstround[j]);
  } else if (cardButtonArray[j] === 'hold') {
    showHold.innerText = 'discard';
    cardButtonArray[j] = 'discard';
    playerHandcards.splice(j, 1);
  }

  showHoldContainer.appendChild(showHold);
  holdButtonElement.appendChild(showHoldContainer);
};

const DealingButtonClick = (buttonHold) => {
  // if dedck have less then 5 card , make more cards

  if (deck.length < 5) {
    console.log('test');
    deck = shuffleCards(makeDeck());
  }
  if (counter === 0) {
    displayPoint.innerText = `Your total credit ${playerScore}.\n Click on the cards to hold`;
    bettingButton.disabled = true;

    counter += 1;
    playercards.innerText = '';
    for (let i = 0; i < 5; i += 1) {
      player5Cards = deck.pop();
      storeCardsforFirstround.push(player5Cards);
      cardButtonArray[i] = 'discard';
      const suit = document.createElement('div');
      suit.classList.add('suit');
      suit.innerText = player5Cards.suitSymbol;

      const name = document.createElement('div');
      name.classList.add(player5Cards.colour);
      name.innerText = player5Cards.displayName;

      card = document.createElement('button');
      card.classList.add('card');
      card.appendChild(name);
      card.appendChild(suit);
      showHold.innerText = 'hold';
      playercards.appendChild(card);
      card.addEventListener('click', (event) => {
        holdButtonClick(event.currentTarget, i);
      });
    }
  } else if (counter !== 0) {
    bettingButton.disabled = false;
    counter = 0;
    console.log(counter);
    counter = 0;
    playercards.innerText = '';
    for (let i = 0; i < playerHandcards.length; i += 1) {
      const suit = document.createElement('div');
      suit.classList.add('suit');
      suit.innerText = playerHandcards[i].suitSymbol;

      const name = document.createElement('div');
      name.classList.add(player5Cards.colour);
      name.innerText = playerHandcards[i].displayName;

      card = document.createElement('button');
      card.classList.add('card');
      card.appendChild(name);
      card.appendChild(suit);
      playercards.appendChild(card);
    }
    for (let J = 0; J < 5; J += 1) {
      if (cardButtonArray[J] === 'discard') {
        player5Cards = deck.pop();
        playerHandcards.push(player5Cards);
        const suit = document.createElement('div');
        suit.classList.add('suit');
        suit.innerText = player5Cards.suitSymbol;

        const name = document.createElement('div');
        name.classList.add(player5Cards.colour);
        name.innerText = player5Cards.displayName;

        card = document.createElement('button');
        card.classList.add('card');
        card.appendChild(name);
        card.appendChild(suit);
        playercards.appendChild(card);
      }
    }
    tallyCards();

    winningCondition();
  }
};

const buttonsContainer = document.createElement('div');
buttonsContainer.classList.add('button-container');
bettingButton = document.createElement('button');
bettingButton.classList.add('bettingButton');
bettingButton.innerText = `Credit Bet: ${playerBet}`;
buttonsContainer.appendChild(bettingButton);
bettingButton.addEventListener('click', clickbettingbutton);
dealButton = document.createElement('button');
dealButton.classList.add('dealButton');
dealButton.innerText = 'Deal';
buttonsContainer.appendChild(dealButton);
const displayPoint = document.createElement('div');
displayPoint.classList.add('display-point');
displayPoint.innerText = `Your total credit ${playerScore}`;
buttonsContainer.appendChild(displayPoint);
dealButton.addEventListener('click', (event) => {
  DealingButtonClick(event.currentTarget);
});
document.body.appendChild(buttonsContainer);

deck = shuffleCards(makeDeck());
const initGame = () => {
  dealButton.disabled = true;
  makeDeck();
};
initGame();
