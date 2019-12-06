$( document ).ready(function() {

    // Capture page progress and update progress bar 
    
    $(document).on("click", "#page-submit", function() {
    
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
    
        $(".progress-bar-fill").css({width: percentProgress + "%"})
    
    }); 
    
    // Capture note 
    $(document).on("click", "#note-submit", function() {
    
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
    
        newNoteTitle.text(noteTitle); 
        newNoteBody.text(noteBody); 
    
        newCard.append(newNoteTitle); 
        newCard.append(newNoteBody); 
    
        $("#append-new-note").append(newCard); 
    
        // submitNote(newNote); 
        $.post("/api/mybooks", newNote, function() {
            // window.location.href = "/mybooks"; 
            location.reload();
        }); 
    
    }); 
    
    
    // function submitNote(note) {
    //     $.post("/api/mybooks", note, function() {
    //         window.location.href = "/mybooks"; 
    //     }); 
    // }; 
    
    
    
    }); // end of on load 