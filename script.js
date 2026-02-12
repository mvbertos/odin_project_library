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
        return;
    } else {
        console.log(title + " could not be found");

    }
    displayBookRegistry();
}

// initializing values
addBookToLibrary('harry potter', 'J.K rolling', '500', 'true');
addBookToLibrary('Lord of the rings', 'J.R.R Tolkien', '500', 'true');
addBookToLibrary('Percy jackson', 'Rick Riordan', '500', 'true');
addBookToLibrary('Moby dick', ' Herman Melville ', '500', 'true');

function displayBookRegistry() {
    libraryEl.replaceChildren();
    myLibrary.forEach(function (book) {
        libraryEl.appendChild(_createBookCard(book));
    });
}

function _createBookCard(book) {
    let card = document.createElement("div");
    card.className = "Card";

    // title and author
    let titleEl = document.createElement("p");
    titleEl.textContent = book.title + " by " + book.author
    card.appendChild(titleEl);

    // pages
    let pagesEl = document.createElement("p");
    pagesEl.textContent = "pages:" + book.pages;
    card.appendChild(pagesEl);

    // Read button
    let readButtonEl = document.createElement("button");
    readButtonEl.className = "read-button";
    readButtonEl.textContent = book.read ? "read" : "not read"
    readButtonEl.addEventListener("click", () => {
        _setBookStatus(book.title, !book.read);
    });
    card.appendChild(readButtonEl);

    // remove button
    let removeButtonEl = document.createElement("button");
    removeButtonEl.className = "remove-button";
    removeButtonEl.textContent = "remove";
    removeButtonEl.addEventListener("click", () => { removeBookFromLibrary(book.title); });
    card.appendChild(removeButtonEl);

    return card;
}

function _setBookStatus(book_title = "", new_status = false) {
    const book = myLibrary.find((b) => b.title == book_title);
    if (book != null) {
        book.read = new_status;
    }
    displayBookRegistry();
}

displayBookRegistry();