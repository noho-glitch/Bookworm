//Global variables
var userInput;
var booksArr = [];


// This function handles events where SEARCH button is clicked
$("#search-btn").on("click", function(event) {
  userInput = $("#search-input")
    .val()
    .trim()
    .split(" ")
    .join("+");

  console.log(userInput);

  renderBooks();
});




function renderBooks() {


    var parameter = "";
    // var userInput = "";
    var queryURL =
        "https://www.googleapis.com/books/v1/volumes?q=" +
        userInput +
        parameter +
        ":keyes&key=AIzaSyBaLr5TPsFewkitZXad_5_EaTeCT35K9No";

    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

    
    var title = response.items[0].volumeInfo.title;
    var author = response.items[0].volumeInfo.authors[0];
    var image = response.items[0].volumeInfo.imageLinks.thumbnail;
    var description = response.items[0].volumeInfo.description;
    
    // console.log(title)
    // console.log(author)
    // console.log(image)
    // console.log(description)

    var results = response.items;

    for (var i = 0; i < results.length; i++) {
        booksArr.push(results[i])
    }

    for (var i = 0; i < booksArr.length; i++) {
        console.log(booksArr[i]);

        title = booksArr[i].volumeInfo.title;
        author = booksArr[i].volumeInfo.authors[0];
        rating = booksArr[i].volumeInfo.averageRating;
        image = booksArr[i].volumeInfo.imageLinks.thumbnail;
        description = booksArr[i].volumeInfo.description;
        isbn = booksArr[i].volumeInfo.industryIdentifiers[0].identifier;
        pageCount = booksArr[i].volumeInfo.pageCount;
        publishedDate = booksArr[i].volumeInfo.publishedDate;
       

        var card = $("<div>");
        card.addClass("card form-rounded");

        var imageDiv = $("<div>");
        imageDiv.addClass("float-left thumbnail")

        var textDiv = $("<div>");
        textDiv.addClass("float-left")
        
        var bookShelf = $("<button>");
        bookShelf.addClass("btn btn-warning form-rounded");
        bookShelf.text("Add to Bookshelf")

        var cardBody = $("<div>");
        cardBody.addClass("card-body");

        var bookTitle = $("<h5>");
        bookTitle.text(title);
        bookTitle.addClass("card-text");

        var bookPageCount = $("<p>");
        bookPageCount.addClass("card-text");
        bookPageCount.text("Page Count: " + pageCount);

        var bookPublishedDate = $("<p>");
        bookPublishedDate.addClass("card-text");
        bookPublishedDate.text("Published Date: " + publishedDate);


        var bookISBN = $("<p>");
        bookISBN.addClass("card-text");
        bookISBN.text("ISBN_10: " + isbn);
       
        var bookPageCount = $("<p>");
        bookPageCount.addClass("card-text");
        bookPageCount.text("Page Count: " + pageCount);

        var bookRating = $("<span>");
        bookRating.addClass("card-text rating data-default-rating=" + rating + " disabled")
        console.log(rating)

        var bookAuthor = $("<p>");
        bookAuthor.text("By: " + author);
        bookAuthor.addClass("card-text");

        var cardImage = $("<img>");
        cardImage.attr("src", image)

       
       
       

        // cardBody.append(cardImage);
        // cardBody.append(bookTitle);
        // cardBody.append(bookAuthor);
        // cardBody.append(bookRating);
        // cardBody.append(bookPublishedDate);
        // cardBody.append(bookISBN);
        imageDiv.append(cardImage)
        textDiv.append(bookTitle);
        textDiv.append(bookAuthor);
        // textDiv.append(bookPublishedDate);
        // textDiv.append(bookISBN);
        textDiv.append(bookShelf);
        cardBody.append(imageDiv);
        cardBody.append(textDiv);
        card.append(cardBody)
        $("#resultsDiv").append(card)
    }
    

    });
}
