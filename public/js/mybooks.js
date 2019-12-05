$( document ).ready(function() {

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


});