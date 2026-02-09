const myLibrary = [];

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
}

addBookToLibrary('harry potter', 'J.K rolling', '500', 'true');
addBookToLibrary('Lord of the rings', 'J.R.R Tolkien', '500', 'true');
addBookToLibrary('Percy jackson', 'Rick Riordan', '500', 'true');
addBookToLibrary('Moby dick', ' Herman Melville ', '500', 'true');

myLibrary.forEach(function (book) {
    console.log(book.info());
});
