"use strict";

const URL = "https://quote-garden.herokuapp.com/api/v3/quotes/random";
const quoteDisplay = document.querySelector(".quote-display");



// Event Listener for the Clear  quotes button
const clearQuotesButton = document.querySelector(".btn--clear-quotes" );
clearQuotesButton.addEventListener("click", () => {
  quoteDisplay.innerHTML = "";
});



// Event Listener for the Generate quote button
const generateQuoteButton = document.querySelector(".btn--generate-quotes");
generateQuoteButton.addEventListener("click", generateQuote);

async function generateQuote() {
  const quoteData = await parseJSONQuote(fetchQuote(URL));

  const quoteContainer = createElement("div", {className: "quote-container block-center"});
  const quoteContent = createElement("article", {className: "quote-content", textContent: quoteData.quoteContent});
  const quoteAuthor = createElement("aside", {className: "quote-author", textContent: `― ${quoteData.quoteAuthor}`});
  const quoteGenre = createElement("small", {className: "quote-genre", textContent: `Genre: ${quoteData.quoteGenre}`});

  appendMultipleChildren(quoteContainer, quoteGenre, quoteContent, quoteAuthor);
  quoteDisplay.prepend(quoteContainer);
}

function createElement(elementType, elementProps) {
  const element = document.createElement(elementType);
  Object.keys(elementProps).forEach(prop => {
    if (element[prop] !== "undefined") {
      element[prop] = elementProps[prop];
    } else {
      console.warn(`Invalid property: ${prop}`);
    }
  })

  return element;
}

function appendMultipleChildren(parent, ...children) {
  children.forEach(child => parent.appendChild(child));
}

async function fetchQuote(quoteUrl) {
  const fetchedRawQuote = await fetch(quoteUrl)
                            .catch(err => (
                              console.error(`${err.name}: ${err.message}`)
                            ));
  const jsonQuote = await fetchedRawQuote.json();

  return jsonQuote;
}

async function parseJSONQuote(jsonQuote) {
  const quote = await jsonQuote;
  const quoteData = await quote.data[0];

  return {
    quoteContent: quoteData.quoteText,
    quoteAuthor: quoteData.quoteAuthor,
    quoteGenre: quoteData.quoteGenre
  }
}
