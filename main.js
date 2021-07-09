console.log('this is the digital library tutorial');

showbooks();

function Book(bookname, author, category, description) {
    this.bookname = bookname;
    this.author = author;
    this.category = category;
    this.description = description;
}

function Display() {

}


Display.prototype.check = function(book) {
    if (book.bookname.length < 2 || book.author.length < 2 || book.description.length < 2) {
        return false;
    } else {
        return true;
    }

}
Display.prototype.clear = function() {
    let libraryForm = document.getElementById('libraryform');
    libraryForm.reset();
}

Display.prototype.show = function(type, message) {

    let alert = document.getElementById('alert')
    alert.innerHTML = `

    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            <strong>Message : ${message} 
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
   </div>`
    setTimeout(function() {
        alert.innerHTML = "";

    }, 2500);

}

function showbooks() {
    let data = localStorage.getItem('data');
    if (data == null) {
        bookobj = [];
    } else {
        bookobj = JSON.parse(data);

    }
    let bookinfo = "";
    bookobj.forEach(function(element, index) {
        bookinfo += `<tr> 
                    <td>${index+1}</td>
                    <td>${element.bookname}</td>
                    <td>${element.author}</td>
                    <td>${element.category}</td>
                    <td>${element.description}</td>

                    <td>
                         <button class="btn btn-outline-primary btn-sm" type="button" onclick="deletebook(this.id)" id="${index}">Delete Book</button>
                   </td>
       `

    });

    let tablebody = document.getElementById('tablebody ');
    if (bookobj.length != 0) {
        tablebody.innerHTML = bookinfo;

    } else {

        tablebody.innerHTML = ` <h1 style = "font-weight :bold;" > Add Book First </h1>`;
    }
}


let libraryform = document.getElementById('libraryform')
libraryform.addEventListener('submit', submit)

function submit(e) {
    console.log('you clicked ')
    let bookname = document.getElementById('formbook').value;
    let author = document.getElementById('formauthor').value;
    let description = document.getElementById('formdescription').value;
    let category;
    let programming = document.getElementById('programming');
    let finance = document.getElementById('finance');
    let persondev = document.getElementById('persondev');
    let someelse = document.getElementById('someelse');


    if (programming.checked) {
        category = programming.value;
    } else if (finance.checked) {
        category = finance.value;
    } else if (persondev.checked) {
        category = persondev.value;
    } else if (someelse.checked) {
        category = someelse.value;
    }
    let data = localStorage.getItem('data');
    if (data == null) {
        bookobj = [];
    } else {
        bookobj = JSON.parse(data);
    }
    let newobj = {
        bookname: bookname,
        author: author,
        category: category,
        description: description
    }
    let book = new Book(bookname, author, category, description)
    let display = new Display();
    if (display.check(book)) {
        display.clear();
        bookobj.push(newobj);
        display.show('primary', ' Your book has been successfully added');
    } else {
        display.show('danger', ' Sorry you can not add this book');
    }
    localStorage.setItem('data', JSON.stringify(bookobj));


    showbooks();
    e.preventDefault();
}


function delconfirm() {

    let del = document.getElementById('delcon ')
    del.innerHTML = `

    <div class="alert alert-primary alert-dismissible fade show" role="alert">
            <strong><h2>Your Book successfully deleted </h2> 
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
   </div>`
    setTimeout(function() {
        del.innerHTML = "";

    }, 2500);

}

function deletebook(index) {
    let data = localStorage.getItem("data");
    if (data == null) {
        bookobj = [];

    } else {
        bookobj = JSON.parse(data);
    }
    bookobj.splice(index, 1);
    localStorage.setItem('data', JSON.stringify(bookobj));
    showbooks();
    delconfirm()

}