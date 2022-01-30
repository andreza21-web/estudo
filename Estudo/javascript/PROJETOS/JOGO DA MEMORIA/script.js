const cards = document.querySelectorAll(".card");
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

//funcao para virar a carta
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }
  secondCard = this;
  hasFlippedCard = false;
   checkForMatch();
}

//checa se as cartas são iguais
function checkForMatch() {
  if (firstCard.dataset.card === secondCard.dataset.card) {
    disableCards();
    return;
  }
  unflipCards();
}

//funcao que desabilita as castar
function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 1500);
}
//funcao reseta tabuleiro
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}
//embaralha as cartas

//função que embaralha as cartas
(function shuffle() {
    cards.forEach((card) => {
        let ramdomPosition = Math.floor(Math.random() * 12);
        card.style.order = ramdomPosition;
    })
})();

cards.forEach((card) => {
  card.addEventListener("click", flipCard);
});