const myLibrary = [];
const libraryEl = document.getElementById("library");

function Book(title, author, pages, read) {
    if (!new.target) {
        throw Error("must use the 'new' operator.")
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function () {
        return `${title} by ${author}, ${pages}, book ${read ? "already" : "not"} read`;
    }
}


// BOOK MANAGE FUNCTIONS
function addBookToLibrary(title, author, pages, read) {
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
    displayBookRegistry();
}

function removeBookFromLibrary(title) {
    const i = myLibrary.indexOf(myLibrary.find(b => b.title == title));
    if (i != -1) {
        myLibrary.splice(i, 1);
        console.log(title + " removed successfully");
        displayBookRegistry();
        return;
    } else {
        console.log(title + " could not be found");
    }

}

function setBookStatus(book_title = "", new_status = false) {
    const book = myLibrary.find((b) => b.title == book_title);
    if (book != null) {
        book.read = new_status;
    }
    displayBookRegistry();
}

// initializing values
addBookToLibrary('Harry Potter', 'J.K Rowling', '500', 'true');
addBookToLibrary('Lord of the rings', 'J.R.R Tolkien', '500', 'true');
addBookToLibrary('Percy jackson', 'Rick Riordan', '500', 'true');
addBookToLibrary('Moby dick', ' Herman Melville ', '500', 'true');


// VISUAL ELEMENTS
function displayBookRegistry() {
    libraryEl.replaceChildren();
    myLibrary.forEach(function (book) {
        libraryEl.appendChild(_createBookCard(book));
    });

    _createFormButton();
}

function _createFormButton() {
    let createFormButton = document.createElement("button");
    createFormButton.addEventListener("click", () => { _createBookForm() })
    createFormButton.textContent = "Add Book";
    createFormButton.id = "create-form-button";
    libraryEl.appendChild(createFormButton);
}

function _createBookCard(book) {
    let card = document.createElement("div");
    card.className = "card";

    let infoDivEl = document.createElement("div");
    // title and author
    let titleEl = document.createElement("p");
    titleEl.textContent = book.title + " by " + book.author
    titleEl.className = "title";
    infoDivEl.appendChild(titleEl);
    // card.appendChild(titleEl);

    // pages
    let pagesEl = document.createElement("p");
    pagesEl.textContent = book.pages + " pages";
    pagesEl.className = "pages";
    infoDivEl.appendChild(pagesEl);

    // remove button
    let removeButtonEl = document.createElement("button");
    removeButtonEl.className = "remove-button";
    removeButtonEl.addEventListener("click", () => { removeBookFromLibrary(book.title); });
    infoDivEl.appendChild(removeButtonEl);

    // remove button icon
    let removeIconEl = document.createElement("img");
    removeIconEl.src = "assets/img/trash-can.svg";
    removeButtonEl.appendChild(removeIconEl);

    card.appendChild(infoDivEl);

    // Read button
    let readButtonEl = document.createElement("button");
    readButtonEl.className = "read-button";
    readButtonEl.textContent = book.read ? "Read" : "Not Read Yet"
    readButtonEl.addEventListener("click", () => {
        setBookStatus(book.title, !book.read);
    });
    card.appendChild(readButtonEl);
    return card;
}

function _createBookForm() {
    //remove add button to not create multiple forms at once
    let addButtonEl = document.getElementById("create-form-button");
    if (addButtonEl) addButtonEl.remove();

    const formEl = document.createElement("form");
    formEl.id = "register-book-form";

    // const formTitle = document.createAttribute("h1");
    // formTitle.textContent = "Register New Book";

    const titleLabelEl = document.createElement("label");
    titleLabelEl.textContent = "Book Title:";
    const titleInputEl = document.createElement("input");

    const authorLabelEl = document.createElement("label");
    authorLabelEl.textContent = "Author Name:"
    const authorInputEl = document.createElement("input");

    const pagesLabelEl = document.createElement("label");
    pagesLabelEl.textContent = "Pages Count:"
    const pagesInputEl = document.createElement("input");
    pagesInputEl.type = "number"

    const readStatusLabelEl = document.createElement("label");
    readStatusLabelEl.textContent = "Has been read already:"
    const readStatusInputEl = document.createElement("input");
    readStatusInputEl.type = "checkbox";

    const submitButtonEl = document.createElement("button");
    submitButtonEl.className = "submit-button";
    submitButtonEl.type = "submit";
    submitButtonEl.textContent = "Submit";

    const cancelButtonEl = document.createElement("button");
    cancelButtonEl.className = "cancel-button";
    cancelButtonEl.textContent = "Cancel";
    cancelButtonEl.addEventListener("click", () => { _hideBookForm(); })

    formEl.append(
        // formTitle,
        titleLabelEl,
        titleInputEl,
        authorLabelEl,
        authorInputEl,
        pagesLabelEl, pagesInputEl,
        readStatusLabelEl,
        readStatusInputEl,
        cancelButtonEl,
        submitButtonEl,
    );

    libraryEl.appendChild(formEl);

    formEl.addEventListener("submit", (e) => {
        e.preventDefault();
        addBookToLibrary(
            titleInputEl.value,
            authorInputEl.value,
            pagesInputEl.value,
            readStatusInputEl.checked,
        );
        formEl.reset();
    })
}

function _hideBookForm() {
    let formEl = document.getElementById("register-book-form");
    if (formEl) {
        formEl.remove();
        _createFormButton();
    }
}

displayBookRegistry();