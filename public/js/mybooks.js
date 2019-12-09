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

    function getNotesForCurrentBook() {

        console.log("getting notes");

        var currentBookId = $(".current-book-img").attr("data-bookId"); 

            $.get("/api/mybooks", function (data) {
                console.log("this is the get for the notes");
                console.log("data is", data);
               
               // run a for loop and only display notes for this book

               for (var i = 0; i < data.length; i++) {

                console.log(currentBookId); 

                console.log(data[i].bookId); 
                
                // console.log(data[i].bookId === parseInt(currentBookId));

                if (data[i].bookId === parseInt(currentBookId)) {
                    // then display those notes 

                    var noteTitle = data[i].noteTitle; 
                    var noteBody = data[i].noteText; 
                    var userId = $(".current-book-img").attr("data-userid");
                    var bookId = $(".current-book-img").attr("data-bookId"); 
            
                    var newCard = $("<div class=card>").addClass("note-card");
                    var newNoteTitle = $("<p class=card-note-title>");
                    var newNoteBody = $("<p class=card-note-body>");
                    var deleteButton = $("<button type=button class=delete-note>");
                    var cardHeader = $("<div class=card-header note-header>"); 
            
                    deleteButton.attr("data-bookid", bookId); 
                    deleteButton.attr("data-userid", userId); 
            
                    newNoteTitle.text(noteTitle);
                    newNoteBody.text(noteBody);
                    deleteButton.text("Remove");
                    cardHeader.append(deleteButton); 
            
                    newCard.append(cardHeader); 
                    newCard.append(newNoteTitle);
                    newCard.append(newNoteBody);
            
                    $("#append-new-note").append(newCard);

                }


               };
                
            });

    };

    // Capture note 
    $(document).on("click", "#note-submit", function () {

        var noteTitle = $("#note-title").val().trim();
        var noteBody = $("#book-note-area").val().trim();
        var userId = $(".current-book-img").attr("data-userid");
        var bookId = $(".current-book-img").attr("data-bookId"); 

        var newNote = {
            noteTitle: noteTitle,
            noteText: noteBody,
            userId: userId,
            bookId: bookId
        };

        var newCard = $("<div class=card>").addClass("note-card");
        var newNoteTitle = $("<p class=card-note-title>");
        var newNoteBody = $("<p class=card-note-body>");
        var deleteButton = $("<button type=button class=delete-note>");
        var cardHeader = $("<div class=card-header note-header>"); 

        deleteButton.attr("data-bookid", bookId); 
        deleteButton.attr("data-userid", userId); 

        newNoteTitle.text(noteTitle);
        newNoteBody.text(noteBody);
        deleteButton.text("Remove");
        cardHeader.append(deleteButton); 

        newCard.append(cardHeader); 
        newCard.append(newNoteTitle);
        newCard.append(newNoteBody);

        $("#append-new-note").append(newCard);

        // submit new note
        $.post("/api/mybooks", newNote, function () {
            window.location.href = "/mybooks"; 
            // location.reload();
        });

    });

    // pass through bookid and userid to the remove button 

    // Delete Note
    $(document).on("click", ".delete-note", function () {

        console.log("delete was clicked!")

        // var currentBookId = $(".current-book-img").attr("data-bookid"); 
        // var currentUserId = $(".current-book-img").attr("data-userid"); 
        // var noteId = $()


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

// Show all books and display currenlty reading book 
$(document).ready(function () {

    console.log("the document loads"); 

    $.get("/api/fav-books", function (data) {
        console.log("fav books loop", data);
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

            if (data[i].currentlyReading === true) {
                // then set that image as we did 
                $(".current-book-img").attr("src", bookCoverSrc); 
                $("#total-page-count").text(bookPageCount); 
                $(".current-book-img").attr("data-empty", "1"); 
                $(".current-book-img").attr("data-bookid", bookId); 
                $(".current-book-img").attr("data-userid", userId); 
                
                // then hide that book 
                $(".book-cover-div").filter("[data-bookId='" + data[i].id + "']").hide();
            }

        };

    }).done(function() {

        getNotesForCurrentBook(); 

    }); 
});


$(document).on("click", ".book-cover-div", function () {

    var selectedImage = $(this); 
    var selectedImageSrc = $(this).attr("src"); 
    var selectedImageTotalPage = $(this).attr("data-pagecount"); 
    var selectedImageBookId = $(this).attr("data-bookid"); 
    var selectedImageUserId = $(this).attr("data-userid");

    var placeholderImg = $(".current-book-img").attr("data-empty"); 

    console.log(selectedImageSrc); 

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
        getNotesForCurrentBook(); 
    }

});

// function to set book to currently reading = true 
function updateBookToReading(book) {

    console.log("this is updating book");

    $.ajax({
        method: "PUT",
        url: "/api/update",
        data: book,
        timeout: 3000
    })
        .done(function() {

           
            // location.reload();

            // window.location.href = "/mybooks"; 

    
        });
} // end function update book to reading

$(document).on("click", "#send-back-bookshelf", function() {

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

    $("#append-new-note").empty(); 

    updateBookToReading(updateBook); 

   


}); 

// on click event to send the book back to favorite books 

}); // end of on load 