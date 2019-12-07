//Global variables
var userInput;
var booksArr = [];
var title;
var author;
var image;
var description;
var isbn;
var pageCount;
var publishedDate;

// This function handles events where SEARCH button is clicked
$("#search-btn").on("click", function(event) {
  $("#resultsDiv").empty();
  userInput = $("#search-input")
    .val()
    .trim()
    .split(" ")
    .join("+");

  console.log(userInput);
  booksArr = [];

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
  }).then(function(response) {
    console.log(response);

    var results = response.items;

    for (var i = 0; i < results.length; i++) {
      booksArr.push(results[i]);
    //   $(this).attr("id", i);
    }

    for (var i = 0; i < 5; i++) {
      console.log(booksArr.length);

      title = booksArr[i].volumeInfo.title  || "";
      author = booksArr[i].volumeInfo.authors[0] || "";
      rating = booksArr[i].volumeInfo.averageRating || "";
      image = booksArr[i].volumeInfo.imageLinks.thumbnail || "";
      description = booksArr[i].volumeInfo.description || "";
      isbn = booksArr[i].volumeInfo.industryIdentifiers[0].identifier || "";
      pageCount = booksArr[i].volumeInfo.pageCount || "";
      publishedDate = booksArr[i].volumeInfo.publishedDate || "";

      var card = $("<div>");
      card.addClass("card form-rounded");

      var imageDiv = $("<div>");
      imageDiv.addClass("float-left thumbnail");

      var textDiv = $("<div>");
      textDiv.addClass("float-left textWrap");

      var bookShelfBtn = $("<button>");
      bookShelfBtn.addClass("btn btn-warning form-rounded");
      bookShelfBtn.attr("id", "favorite");
      bookShelfBtn.text("Add to Bookshelf");
      bookShelfBtn.attr("data-title", title);
      bookShelfBtn.attr("data-author", author);
      bookShelfBtn.attr("data-isbn", isbn);
      bookShelfBtn.attr("data-pageCount", pageCount); 
      bookShelfBtn.attr("data-rating", rating); 
      bookShelfBtn.attr("data-image", image); 
      bookShelfBtn.attr("data-description", description); 
      bookShelfBtn.attr("data-publishedDate", publishedDate); 


      var cardBody = $("<div>");
      cardBody.addClass("card-body");

      var bookTitle = $("<h5>");
      bookTitle.text(title);
      bookTitle.addClass("card-text favTitle");
      bookTitle.attr("data-title", `${i}`)

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
      bookRating.addClass("card-text rating");
      bookRating.attr("data-default-rating", rating);
      bookRating.attr("disabled", true);

      var br = $("<p>");
      br.text("");

      var bookAuthor = $("<p>");
      bookAuthor.text("By: " + author);
      bookAuthor.addClass("card-text favAuthor");
      bookAuthor.attr("data-author", `${i}`)


      var cardImage = $("<img>");
      cardImage.attr("src", image);
      console.log(image);


      var modalBtn = $("<button>");
      modalBtn.addClass("btn btn-warning form-rounded modalBtn");
      modalBtn.attr("data-target", `#launchModal${i}`);
      modalBtn.attr("data-toggle", "modal");
      modalBtn.text("More Info");
     
      //Book Modal
      var modalDiv = $("<div>");
      modalDiv.addClass("modal-fade");
      modalDiv.attr("id", `launchModal${i}`);

      var modalContent = $("<div>");
      modalContent.addClass("modal-dialog");
      modalDiv.append(modalContent);

      var modalHeader = $("<div>");
      modalHeader.addClass("modal-header");
      modalContent.append(modalHeader);

      var modalTitle = $("<h5>");
      modalTitle.addClass("modal-header");
      modalTitle.text(title);
      modalHeader.append(modalTitle);

 
      imageDiv.append(cardImage);
      textDiv.append(bookTitle);
      textDiv.append(bookAuthor);
    

      if (rating) {
        textDiv.append(bookRating);
      }

      textDiv.append(br);
      textDiv.append(bookShelfBtn);
      textDiv.append(modalBtn);
      cardBody.append(imageDiv);
      cardBody.append(textDiv);
      card.append(cardBody);
    //   body.append(modalDiv);
      $("#resultsDiv").append(card);
    }

    var ratings = $(".rating");
    console.log(ratings);

    for (var i = 0; i < ratings.length; i++) {
      var r = new SimpleStarRating(ratings[i]);
    }
  });

  //saving new book

$(document).on("click", "#favorite", function() {



    var titleSQL = $(this).attr("data-title"); 
    var authorSQL = $(this).attr("data-author"); 
    var imageSQL = $(this).attr("data-image"); 
    var ratingSQL = $(this).attr("data-rating"); 
    var publishedDateSQL = $(this).attr("data-publishedDate"); 
    // var isbnSQL = $(this).attr("data-isbn"); 
    var descriptionSQL = $(this).attr("data-description"); 
    var pageCountSQL = $(this).attr("data-pageCount"); 
    var userId = ""; 

    console.log(typeof title2);
    console.log(typeof author); 

        var newBook = {
            'title': titleSQL,
            'authors': authorSQL,
            'imageUrl': imageSQL,
            'imageThumbnail': imageSQL,
            'rating': ratingSQL,
            // 'ISBN': isbnSQL,
            'pageCount': pageCountSQL,
            'userId': 00 
        }

        console.log("working!")
        console.log("new book" + newBook);

        $.post("/api/favorites", newBook, function(res) {
            // window.location.href = "/mybooks"; 
            console.log(res);
            // location.reload();
        }); 
    })
    
}

