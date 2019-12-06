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

    // Show notes 
    $(document).ready(function () {
        // get all  notes by book idn
        $.get("/api/mybooks", function (data) {
            console.log(data);
            // loop to append all the notes 
            for (var i = 0; i < data.length; i++) {
                $("#append-new-note").append(data[i].noteTitle)
                $("#append-new-note").append(data[i].noteText)
                $("#append-new-note").append("<button class='delete' data-id='" + data[i].id + "'>delete</button>");
            }
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
            location.reload();
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
    $.get("/api/mybooks", function (data) {
        console.log(data);
        // loop to append all the books 
        for (var i = 0; i < data.length; i++) {
            $("#allBooks").append(data[i].title)
            $("#allBooks").append(data[i].authors)
            $("#allBooks").append(data[i].pageCount)
            $("#allBooks").append(data[i].currentPage)
            $("#allBooks").append(data[i].imgThumbnail)
            $("#allBooks").append(data[i].rating)

        }
    });
})





}); // end of on load 