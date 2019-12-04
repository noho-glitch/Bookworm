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

    $.fn.stars = function() {
        return $(this).each(function() {
            // Get the value
            var val = parseFloat($(this).html());
            // Make sure that the value is in 0 - 5 range, multiply to get width
            var size = Math.max(0, (Math.min(5, val))) * 16;
            // Create stars holder
            var $span = $('<span />').width(size);
            // Replace the numerical value with stars
            $(this).html($span);
        });
    }

    var parameter = "";
    var search = "harry+potter";
    var queryURL =
        "https://www.googleapis.com/books/v1/volumes?q=" +
        search +
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
        $(function() {
            $('span.stars').stars();
        });
        var span = $("<span>");
        span.addClass("stars");
        span.addClass("card-text");
        var bookRating = $("<span>");
        bookRating.text(rating);
        bookRating.addClass("card-text")
        span.append(bookRating);
        console.log(rating)

        var bookAuthor = $("<p>");
        bookAuthor = $("<p>");
        bookAuthor.addClass("card-text");

        var cardImage = $("<img>");
        cardImage.attr("src", image)

       
        console.log(bookRating)

        cardBody.append(cardImage);
        cardBody.append(bookTitle);
        cardBody.append(span);
        cardBody.append(bookAuthor);
        card.append(cardBody)
        $("#resultsDiv").append(card)
    }
    

    });
}
