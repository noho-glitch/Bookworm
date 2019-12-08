$(document).ready(function () {

    // Capture page progress and update progress bar 

    $(document).on("click", "#page-submit", function () {

        var totalPages = $("#total-pages").val().trim();
        var currentPage = $("#current-page").val().trim();

        console.log(totalPages);
        console.log(currentPage);

        var progress = currentPage / totalPages;
        console.log(progress);
        var percentProgress = progress * 100;
        console.log("% is: " + percentProgress);

        $("#curr-page-count").text(currentPage.toString());
        $("#total-page-count").text(totalPages.toString());

        $(".progress-bar-fill").css({ width: percentProgress + "%" })

    });

/*************************************NOTES*********************************/ 

  
    $(document).ready(function () {

        // get all  notes by book idn
        $.get("/api/mybooks", function (data) {
            console.log(data);
            // loop to append all the notes 

            // begin sabrina paste 
            for (var i = 0; i < data.length; i++) {
                $("#append-new-note").append("<h1>" + data[i].noteTitle + "</h1>")
                $("#append-new-note").append("<p>" + data[i].noteText + "</p>")
                $("#append-new-note").append("<button class='delete' data-id='" + data[i].id + "'>delete</button>");
            } // end sabrina paste 


        });
    })


    // Capture note 
    $(document).on("click", "#note-submit", function () {

        var noteTitle = $("#note-title").val().trim();
        var noteBody = $("#book-note-area").val().trim();
        var userId = 2;
        var bookId = 3
        // Find a way to capture the bookID and userID 

        var newNote = {
            noteTitle: noteTitle,
            noteText: noteBody,
            userId: userId,
            bookId: bookId
        }

        // userId: userId, 
        // bookId: bookId

        console.log(newNote);

        console.log(noteTitle);
        console.log(noteBody);

        var newCard = $("<div class=card>").addClass("note-card");
        var newNoteTitle = $("<p class=card-note-title>");
        var newNoteBody = $("<p class=card-note-body>");
        var deleteButton = $("<button class=delete>");

        newNoteTitle.text(noteTitle);
        newNoteBody.text(noteBody);
        deleteButton.text("Delete !");

        newCard.append(newNoteTitle);
        newCard.append(newNoteBody);
        newCard.append(deleteButton);

        $("#append-new-note").append(newCard);

        // submitNote(newNote); 
        $.post("/api/mybooks", newNote, function () {
            // window.location.href = "/mybooks"; 
            // location.reload();
        });


    });

    // Delete Note
    $(document).on("click", ".delete", function () {
        console.log("delete was clicked!")
        var noteId = $(this).data('id');
        $.ajax({
            method: "DELETE",
            url: "/api/mybooks/" + noteId
        })
            .then(function () {
                console.log("note had been deleted!")
                location.reload();
            })

    });

/****************************BOOKS*************************************/ 

// Show all books
$(document).ready(function () {
    // get all boooks by user id

    console.log("the document loads"); 

    $.get("/api/fav-books", function (data) {
        console.log(data);
        // loop to append all the books 

      
        for (var i = 0; i < data.length; i++) {

            // variables to store book information 
            var bookId = data[i].id; 
            var userId = data[i].userId; 
            var bookTitle = data[i].title;
            var bookAuthor = data[i].authors;
            var bookPageCount = data[i].pageCount;
            var bookCurrentlyReading = data[i].currentlyReading; 
            var currentPage = data[i].currentPage;
            var bookRating = data[i].rating;
            var bookCoverSrc = data[i].thumbnail; 

            var imgDiv = $("<div>"); 
            var imgElement = $("<img class=book-cover-div>"); 
          
            // apply variables as attributes to image element
            imgElement.attr("data-bookId", bookId); 
            imgElement.attr("data-userId", userId); 
            imgElement.attr("src", bookCoverSrc); 
            imgElement.attr("data-title", bookTitle);
            imgElement.attr("data-author", bookAuthor);
            imgElement.attr("data-pageCount", bookPageCount); 
            imgElement.attr("data-currentlyReading", bookCurrentlyReading); 
            imgElement.attr("data-currentPage", currentPage); 
            imgElement.attr("data-bookRating", bookRating); 

            imgDiv.append(imgElement); 

            $("#allBooks").append(imgDiv); 
            $("#allBooks").append("<button class=delete-book> delete </button>"); 

        };

    });
<<<<<<< HEAD

    $(document).on("click", ".delete-book", function () {
        console.log("delete was clicked!")
        var bookToBeDeleted = $(this).data('id');
        console.log(bookToBeDeleted)
        $.ajax({
            method: "DELETE",
            url: "/api/book-delete/" + bookToBeDeleted
        })
            .then(function () {
                console.log("book deleted!")
                location.reload();
            })

    })
})
}); 
=======
});


$(document).on("click", ".book-cover-div", function () {

    console.log("click registers"); 

    console.log(this); 

    var selectedImage = $(this); 
    var selectedImageSrc = $(this).attr("src"); 
    var selectedImageTotalPage = $(this).attr("data-pagecount"); 
    var selectedImageBookId = $(this).attr("data-bookid"); 
    var selectedImageUserId = $(this).attr("data-userid");

    var placeholderImg = $(".current-book-img").attr("data-empty"); 

    console.log(selectedImageSrc); 

    // selectedImage.addClass("currentlyReading"); 

    selectedImage.attr("data-currentlyReading", true); 

    console.log(selectedImage.attr("data-currentlyReading") === "true" && placeholderImg === "0"); 

    if (selectedImage.attr("data-currentlyReading") === "true" && placeholderImg === "0") {
        $(".current-book-img").attr("src", selectedImageSrc); 
        $("#total-page-count").text(selectedImageTotalPage); 
        $(".current-book-img").attr("data-empty", "1"); 
        $(".current-book-img").attr("data-bookid", selectedImageBookId); 
        $(".current-book-img").attr("data-userid", selectedImageUserId); 
        $(this).hide(); 

        // do the post update here to toggle currentlyReading to true 
        var updateBook = {
            bookId: selectedImageBookId, 
            userId: selectedImageUserId,
            currentlyReading: 1 
        };

        updateBookToReading(updateBook); 

    }

});

// function to set book to currently reading = true 
function updateBookToReading(book) {
    $.ajax({
        method: "PUT",
        url: "/api/update",
        data: book
    })
        .then(function() {
            window.location.href = "/mybooks"; 
        });
} // end function update book to reading

$(document).on("click", "#send-back-bookshelf", function() {

    // update apiRoute and set currently reading to false 
    // hide all notes 
    // set display back to show and empty the image source 
    
    // grab bookid 
    var currentBookId = $(".current-book-img").attr("data-bookid"); 
    var currentUserId = $(".current-book-img").attr("data-userid"); 
    console.log(currentUserId); 

    console.log("201", currentBookId); 

    $("[data-bookid='" + currentBookId + "']").show(); 
    $(".current-book-img").attr("data-empty", "0"); 

    if ($(".current-book-img").attr("data-empty") === "0") {
        console.log("message");
        $(".current-book-img").attr("src", "/assets/img/placeholder.jpg");
    }

    // do the post update here to toggle currentlyReading to false
    var updateBook = {
        bookId: currentBookId, 
        userId: currentUserId,
        currentlyReading: 0
    };

    updateBookToReading(updateBook); 


}); 

// on click event to send the book back to favorite books 
>>>>>>> cbd0965b82809ce54a8c0de958abb9af677f0fef

 // end of on load 