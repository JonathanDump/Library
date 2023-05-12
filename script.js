let main = document.querySelector(".main");
const addBookButtonHeader = document.querySelector(".header__add-book-btn");
const addBookModule = document.querySelector(".add-book-module");
const addBookModuleBg = document.querySelector(".add-book-module-bg");
const moduleAddBookButton = document.querySelector(".add-book-module__add-btn");
const moduleRemoveButton = document.querySelector(
  ".add-book-module__remove-btn"
);
const body = document.querySelector("body");

let statsTotalBooks = document.querySelector(".stats__total-books-number");
let statsRead = document.querySelector(".stats__read-number");
let statsToRead = document.querySelector(".stats__to-read-number");
let statsPages = document.querySelector(".stats__total-pages-number");

function Book(title, author, pages, status) {
  (this.title = title),
    (this.author = author),
    (this.pages = pages),
    (this.status = status),
    (this.id = crypto.randomUUID());
}

Book.prototype.addBookToLibrary = function (library) {
  library.push(this);
};

let myLibrary = [];

addBookButtonHeader.addEventListener("click", () => {
  showAddBookModule();
});

moduleAddBookButton.addEventListener("click", (e) => {
  e.preventDefault();
  createBook();
  clearInputs();
  hideAddBookModule();
});

moduleRemoveButton.addEventListener("click", () => {
  hideAddBookModule();
  clearInputs();
});

addBookModuleBg.addEventListener("click", () => {
  hideAddBookModule();
  clearInputs();
});

main.addEventListener("click", (e) => {
  if (e.target.classList.contains("book-card__remove-btn")) {
    e.target.parentElement.remove();
    let cardId = e.target.parentElement.dataset;
    removeBookFromLibrary(cardId);
    updateStats(myLibrary);
  }

  if (e.target.classList.contains("book-card__status")) {
    if (e.target.value === "want to read") {
      e.target.parentElement.parentElement.classList.add("book-card-red");
      e.target.parentElement.parentElement.classList.remove("book-card-green");
    } else {
      e.target.parentElement.parentElement.classList.remove("book-card-red");
      e.target.parentElement.parentElement.classList.add("book-card-green");
    }
  }
});

//FUNCTIONS
function createBook() {
  const inputTitle = document.getElementById("add-book-module__title");
  const inputAuthor = document.getElementById("add-book-module__author");
  const inputPages = document.getElementById("add-book-module__pages");
  const inputStatus = document.getElementById("add-book-module__status");
  let bookStatus = "";

  if (inputStatus.checked) {
    bookStatus = "read";
  } else {
    bookStatus = "want to read";
  }

  let book = new Book(
    inputTitle.value,
    inputAuthor.value,
    inputPages.value,
    bookStatus
  );
  book.addBookToLibrary(myLibrary);
  createBookCard(book);
  updateStats(myLibrary);
}

function createBookCard(book) {
  let bookCard = document.createElement("div");
  bookCard.classList.add("book-card");
  bookCard.dataset.id = book["id"];
  main.appendChild(bookCard);

  let bookTitle = document.createElement("div");
  bookTitle.classList.add("book-card__title");
  bookTitle.textContent = book["title"];

  let bookAuthor = document.createElement("div");
  bookAuthor.classList.add("book-card__author");
  bookAuthor.textContent = `By: ${book["author"]}`;

  let bookPages = document.createElement("div");
  bookPages.classList.add("book-card__pages");
  bookPages.textContent = `Number of pages: ${book["pages"]}`;

  //select
  let statusWrapper = document.createElement("div");
  statusWrapper.classList.add("book-card__status-wrapper");

  let label = document.createElement("label");
  label.htmlFor = "book-card__status";
  label.textContent = "Status:";

  let select = document.createElement("select");
  select.id = "book-card__status";
  select.classList.add("book-card__status");

  let optionRead = document.createElement("option");
  optionRead.value = "read";
  optionRead.textContent = "Read";

  let optionWantToRead = document.createElement("option");
  optionWantToRead.value = "want to read";
  optionWantToRead.textContent = "Want to read";

  select.append(optionRead, optionWantToRead);
  if (book["status"] === "read") {
    select.value = "read";
    bookCard.classList.add("book-card-green");
  } else {
    select.value = "want to read";
    bookCard.classList.add("book-card-red");
  }

  statusWrapper.append(label, select);

  let buttonRemove = document.createElement("button");
  buttonRemove.classList.add("book-card__remove-btn");
  buttonRemove.type = "button";
  buttonRemove.textContent = "✖";

  bookCard.append(
    bookTitle,
    bookAuthor,
    bookPages,
    statusWrapper,
    buttonRemove
  );
}

// This function for future use when storage is present
function displayCardsOnPageLoad(array) {
  for (let i = 0; i < array.length; i++) {
    createBookCard(array[i]);
  }
}

function clearInputs() {
  const inputTitle = document.getElementById("add-book-module__title");
  const inputAuthor = document.getElementById("add-book-module__author");
  const inputPages = document.getElementById("add-book-module__pages");
  const inputStatus = document.getElementById("add-book-module__status");

  inputTitle.value = "";
  inputAuthor.value = "";
  inputPages.value = "";
  inputStatus.checked = false;
}

function updateStats(array) {
  statsTotalBooks.textContent = array.length;
  let readCount = 0;
  let toReadCount = 0;
  let pagesCount = 0;
  for (let i = 0; i < array.length; i++) {
    pagesCount += +array[i]["pages"];
    if (array[i]["status"] === "read") {
      readCount++;
    } else {
      toReadCount++;
    }
  }
  statsRead.textContent = readCount;
  statsToRead.textContent = toReadCount;
  statsPages.textContent = pagesCount;
}

function removeBookFromLibrary(id) {
  myLibrary = myLibrary.filter((obj) => obj.id != id.id);
}

function hideAddBookModule() {
  addBookModule.classList.remove("add-book-module-visible");
  addBookModuleBg.classList.remove("add-book-module-visible");
  body.classList.remove("scroll-lock");
}

function showAddBookModule() {
  addBookModule.classList.add("add-book-module-visible");
  addBookModuleBg.classList.add("add-book-module-visible");
  body.classList.add("scroll-lock");
}
