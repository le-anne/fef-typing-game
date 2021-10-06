const quotes = [
  "Help me, Obi-Wan Kenobi. You're my only hope.",
  "I find your lack of faith disturbing.",
  "The Force will be with you. Always.",
  "Why, you stuck-up, half-witted, scruffy-looking nerf herder!",
  "Never tell me the odds!",
  "Do. Or do not. There is no try.",
  "No. I am your father.",
  "When gone am I, the last of the Jedi will you be. The Force runs strong in your family. Pass on what you have learned.",
  "I'll never turn to the dark side. You’ve failed, your highness. I am a Jedi, like my father before me.",
  "You can't stop the change, any more than you can stop the suns from setting.",
  "Fear is the path to the dark side. Fear leads to anger; anger leads to hate; hate leads to suffering. I sense much fear in you.",
  "Well, if droids could think, there'd be none of us here, would there?",
  "We must keep our faith in the Republic. The day we stop believing democracy can work is the day we lose it.",
  "I'm just a simple man trying to make my way in the universe.",
  "Chewie, we're home."
];

const quote = document.getElementById("quote");
const input = document.getElementById("typed-value");
const start = document.getElementById("start");
const message = document.getElementById("message");

let wordQueue;
let highlightPosition;
let startTime;

function startGame() {
  console.log("Game started!");

  const quoteIndex = Math.floor(Math.random() * quotes.length);
  const quoteText = quotes[quoteIndex];

  wordQueue = quoteText.split(" ");
  quote.innerHTML = wordQueue.map(word => `<span>${word}</span>`).join("");

  highlightPosition = 0;
  quote.childNodes[highlightPosition].className = "highlight";

  input.focus();
  input.value = "";
  message.innerText = "";

  startTime = new Date().getTime();

  document.body.className = "";
  start.className = "started";
  setTimeout(() => {
    start.className = "button";
  }, 2000);
}

function checkInput() {
  const currentWord = wordQueue[0]
    .replaceAll(".", ".")
    .replaceAll(",", ",")
    .replaceAll(" ", " ");
  const typedValue = input.value.trim();

  if (currentWord !== typedValue) {
    input.className = currentWord.startsWith(typedValue) ? "" : "error";
    return;
  }

  wordQueue.shift(); //shift removes first item (0th element)
  input.value = ""; // empty textbox
  quote.childNodes[highlightPosition].className = " "; // unhighlight word

  if (wordQueue.length === 0) {
    // if we have run out of words in the queue then game over.
    gameOver();
    return;
  }

  highlightPosition++; // increment highlight position
  quote.childNodes[highlightPosition].className = "highlight"; // highlight new word
}

function gameOver() {
  const elapsedTime = new Date().getTime() - startTime;
  document.body.className = "winner";
  message.innerHTML = `<span class="congrats">It you did.</span> <br> Completed the game in ${elapsedTime /
    1000} seconds, you have.`;
}

start.addEventListener("click", startGame);
input.addEventListener("input", checkInput);

