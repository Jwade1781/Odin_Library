function book() { }
book.prototype.consoleTables = function () { console.table(this) }

function addBook() {
    const newBook = new book();
    newBook.authorName = document.querySelector("#authorName").value;
    newBook.bookName = document.querySelector("#bookName").value;
    newBook.pagesRead = document.querySelector("#pagesRead").value;
    newBook.readStatus = document.querySelector("#readStatus").value;
    //newBook.consoleTables();

    appendLibrary(newBook);
}

function appendLibrary(newBook) {
    const divBookStruct = {
        "bookName": {
            "tag": "h2",
            "class": "bookName",
            "value": newBook.bookName,
        },

        "authorName": {
            "tag": "h4",
            "class": "authorName",
            "value": newBook.authorName,
        },

        "pagesRead": {
            "tag": "h5",
            "class": "pagesRead",
            "value": newBook.pagesRead,
        },

        "readStatus": {
            "tag": "h6",
            "class": "readStatus",
            "value": newBook.readStatus,
        }
    };

    const booksDiv = document.querySelector("#books");
    let parentDiv = document.createElement("div");
    parentDiv.classList.add("book");
    for (let [outterKey, outterValue] of Object.entries(divBookStruct)) {
        let element;
        let readStatusFound = false;

        for (let [innerKey, innerValue] of Object.entries(outterValue)) {
            switch(innerKey){
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
                        innerValue = 
                        innerValue = innerValue.replace(/ /g,'').toLowerCase();
                        parentDiv.classList.add(innerValue);
                    }
                    break;
            }
            parentDiv.appendChild(element);
        }


    }
    let editButtonsDiv = document.createElement("div");
    editButtonsDiv.classList.add("editButtons");

    let deleteButton = document.createElement("button");
    let editButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    editButton.textContent = "Edit";
    deleteButton.classList.add("darkHover");
    editButton.classList.add("darkHover");

    editButtonsDiv.appendChild(editButton);
    editButtonsDiv.appendChild(deleteButton);
    parentDiv.appendChild(editButtonsDiv);

    booksDiv.appendChild(parentDiv);
}



