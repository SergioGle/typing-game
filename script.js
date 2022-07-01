// all of our quoptes
const quotes = [
  "When you have eliminated the impossible, whatever remains, however improbable, must be the truth.",
  "There is nothing more deceptive than an obvious fact.",
  "I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.",
  "I never make exceptions. An exception disproves the rule.",
  "What one man can invent another can discover.",
  "Nothing clears up a case so much as stating it to another person.",
  "Education never ends, Watson. It is a series of lessons, with the greatest for the last.",
];
// store the list of words and the index of the word the player is currentlo typing
let words = [];
let wordIndex = 0;
// the starting time
let startTime = Date.now();
// page elements
const quoteElement = document.getElementById("quote");
const messageElement = document.getElementById("message");
const message1Element = document.getElementById("message1");
const typedValueElement = document.getElementById("typed-value");
const startElement = document.getElementById("start");

// Get the modal
const modal = document.getElementById("modal1");
// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

myStorage = window.localStorage;
const btnScores = document.getElementById("showScores");
const scoresElement = document.getElementById("scores");

startElement.addEventListener("click", () => {
  // get a quote
  const quoteIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[quoteIndex];
  // Put the quote into an array of words
  words = quote.split(" ");
  // reset the word index for tracking
  wordIndex = 0;

  // UI updates
  // Create an array for span alements so we can set a class
  const spanWords = words.map(function (word) {
    return `<span>${word} </span>`;
  });
  // Convert into string and set as innerHTML on quote display
  quoteElement.innerHTML = spanWords.join("");
  // Highlight the first word
  quoteElement.childNodes[0].className = "highlight";
  // Clear any prior messages
  messageElement.innerText = " ";

  // Setup the textbox
  // Clear the textbox
  //typedValueElement.disabled = false;
  typedValueElement.value = "";
  // set focus
  typedValueElement.focus();
  // set the event handler

  // Start the timer
  startTime = new Date().getTime();
});

typedValueElement.addEventListener("input", () => {
  // Get the current word
  const currentWord = words[wordIndex];
  // get current value
  const typedValue = typedValueElement.value;

  if (typedValue === currentWord && wordIndex === words.length - 1) {
    // end os sentence
    // Display success
    const elapsedTime = new Date().getTime() - startTime;
    const message = `CONGRATULATIONS! You finished in ${
      elapsedTime / 1000
    } seconds.`;
    messageElement.innerText = message;
    //typedValueElement.disabled = true;
    addToLocalStorage(elapsedTime / 1000);
    message1Element.innerText = message;
    logicModal();
  } else if (typedValue.endsWith(" ") && typedValue.trim() === currentWord) {
    // end word
    // clear the typedValueElement for the new word
    typedValueElement.value = "";
    // move to the next word
    wordIndex++;
    // reset the class name for all elements in quote
    for (const wordElement of quoteElement.childNodes) {
      wordElement.className = "";
    }
    // highlight the new word
    quoteElement.childNodes[wordIndex].className = "highlight";
  } else if (currentWord.startsWith(typedValue)) {
    // currently correct
    // highlight the next word
    typedValueElement.className = "";
  } else {
    // erros state
    typedValueElement.className = "error";
  }
});

function logicModal() {
  modal.style.display = "block";
  startElement.disabled = true;
}
// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
  startElement.disabled = false;
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
  startElement.disabled = false;
};

function addToLocalStorage(time) {
  if (myStorage.getItem("Time") > time){
    myStorage.setItem("Time", time);
  }
}

btnScores.onclick = function () {
  for (let index = 0; index < myStorage.length; index++) {
    scoresElement.innerText = myStorage.getItem("Time") + "\n";
  }
};

// btnScores.addEventListener("click", () => {
//   scoresElement.innerText = new Date().getTime();
// });
