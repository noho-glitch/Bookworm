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
    var rating = 
    
    console.log(title)
    console.log(author)
    console.log(image)
    console.log(description)

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


        var card = $("<div>");
        card.addClass("card form-rounded");

        var cardBody = $("<div>");
        cardBody.addClass("card-body");

        var bookTitle = $("<p>");
        bookTitle.text(title);
        bookTitle.addClass("card-text");

       

        
        var bookRating = $("<span>");
        bookRating.addClass("card-text rating data-default-rating=" + rating + " disabled")
        // bookRating.text(rating);
        // span.append(bookRating);
        console.log(rating)

        var bookAuthor = $("<p>");
        bookAuthor = $("<p>");
        bookAuthor.addClass("card-text");

        var cardImage = $("<img>");
        cardImage.attr("src", image)

       
       
       

        cardBody.append(cardImage);
        cardBody.append(bookTitle);
        cardBody.append(bookRating);
        cardBody.append(bookAuthor);
        card.append(cardBody)
        $("#resultsDiv").append(card)
    }
    

    });
}
