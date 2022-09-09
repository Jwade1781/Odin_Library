function book() { }
book.prototype.printBook = function () { console.table(this) }

function library() { }
library.prototype.books = [];
library.prototype.printBooks = function () { console.table(this.books) }

const readLibrary = new library();
const readingLibrary = new library();
const backlogLibrary = new library();


function addBook() {
    const newBook = new book();
    newBook.authorName = document.querySelector("#authorName").value;
    newBook.bookName = document.querySelector("#bookName").value;
    newBook.pagesRead = document.querySelector("#pagesRead").value;
    newBook.readStatus = document.querySelector("#readStatus").value;
    newBook.bookStructure = {
        "bookName": {
            "tag": "h2",
            "class": "bookName",
            "value": this.bookName.value,
        },

        "authorName": {
            "tag": "h4",
            "class": "authorName",
            "value": this.authorName.value,
        },

        "pagesRead": {
            "tag": "h5",
            "class": "pagesRead",
            "value": this.pagesRead.value,
        },

        "readStatus": {
            "tag": "h6",
            "class": "readStatus",
            "value": this.readStatus.value,
        }
    }

    let appendedLibrary = appendLibrary(newBook);
    createElements(newBook);
    const booksDivId = "#" + newBook.bookStructure["readStatus"]["value"].replace(/ /g, '').toLowerCase();
    editPage(booksDivId + "BooksMainHeader", booksDivId + "BooksSubHeader", appendedLibrary);
}

function appendLibrary(newBook) {
    switch (newBook.readStatus) {
        case "Finished":
            console.log("Finished")
            readLibrary.books.push(newBook);
            readLibrary.printBooks();
            return readLibrary;
        case "Reading":
            console.log("Reading")
            readingLibrary.books.push(newBook);
            readingLibrary.printBooks();
            return readingLibrary;
        case "Not Started":
            console.log("Backlog")
            backlogLibrary.books.push(newBook);
            backlogLibrary.printBooks();
            return backlogLibrary;
        default:
            console.log("Something broke")
            return null;
    }
}

function createElements(newBook) {
    let parentDiv = document.createElement("div");
    parentDiv.classList.add("book");
    for (let [outterKey, outterValue] of Object.entries(newBook.bookStructure)) {
        let element;
        let readStatusFound = false;

        for (let [innerKey, innerValue] of Object.entries(outterValue)) {
            switch (innerKey) {
                case "tag":
                    element = document.createElement(innerValue);
                    break;
                case "class":
                    element.classList.add(innerValue);
                    if (innerValue == "readStatus") readStatusFound = true;
                    break;
                case "value":
                    element.value = innerValue;
                    element.textContent = element.value;
                    if (readStatusFound) {
                        innerValue = innerValue.replace(/ /g, '').toLowerCase();
                        parentDiv.classList.add(innerValue);
                    }
                    break;
            }
            parentDiv.appendChild(element);
        }
    }
    const booksDivId = "#" + newBook.bookStructure["readStatus"]["value"].replace(/ /g, '').toLowerCase() + "Books";
    const booksDiv = document.querySelector(booksDivId);

    let editButtonsDiv = document.createElement("div");
    editButtonsDiv.classList.add("editButtons");

    let deleteButton = document.createElement("button");
    let editButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    editButton.textContent = "Edit";
    deleteButton.classList.add("darkHover");
    deleteButton.addEventListener("click", () => {
        booksDiv.removeChild(parentDiv);
    })
    editButton.classList.add("darkHover");
    editButtonsDiv.appendChild(editButton);
    editButtonsDiv.appendChild(deleteButton);
    parentDiv.appendChild(editButtonsDiv);
    booksDiv.appendChild(parentDiv);
}

function editPage(mainHeaderId, subHeaderId, Library) {
    const mainHeaderElement = document.querySelector(mainHeaderId);
    const subHeaderElement = document.querySelector(subHeaderId);
    if (subHeaderElement.textContent) subHeaderElement.textContent = "";

    let bookStatus = mainHeaderElement.textContent;
    bookStatus = bookStatus.substring(0, bookStatus.indexOf("(")) + "(" + Library.books.length + ")";
    mainHeaderElement.textContent = bookStatus;
}



