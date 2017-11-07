//global array with starting values, values will be added by user
topics = ["Michael Scott", "The Rock", "Donald Trump", "Obama"];


//initial draw
makeButtons();

//adds user input to global array and calls function to redraw buttons on page
$(document).on("click", "#search", function () {
    var input = $("#userInput").val();
    if (input != '')
        topics.push(input);

    makeButtons();
});


//when a created button is clicked, get urls for animated and still versions of a gif, display a still version,
// and set attributes to make switching easy
$(document).on("click", ".userButton", (function (event) {
    //get clicked on button name and convert spaces to plus for url
    var clicked = event.currentTarget.innerHTML.split(' ').join('+');
    $.ajax({
        url: "https://api.giphy.com/v1/gifs/search?api_key=B03Xe9kHpe1ifHmZgVVPHnImU6fW8RE3&q=" + clicked + "&limit=10&offset=0&rating=PG-13&lang=en",
        method: "GET"
    }).done(function (response) {
        $("#giphArea").html("");

        for (var i = 0; i < response.data.length; i++) {

            imageURL = response.data[i].images.fixed_height.url;
            imageURLStill = response.data[i].images.fixed_height_still.url;
            rating = response.data[i].rating;

            newImage = $("<img>");
            newImage.attr("src", imageURLStill);
            newImage.addClass("image");
            newImage.data("animated", imageURL);
            newImage.data("still", imageURLStill);
            newImage.data("state", "still");

            newDiv = $("<div>");
            $(newDiv).html("Rating: " + rating.toUpperCase());
            newDiv.append("<br>");
            newDiv.addClass("col-sm-4");
            newDiv.append(newImage);

            $("#giphArea").append(newDiv);
        }
    });


    //Animates images or makes them still when clicked on
    $(document).on("click", ".image", function () {

        if ($(this).data("state") == "still") {
            $(this).attr("src", $(this).data("animated"));
            $(this).data("state", "animated");
        } else {
            $(this).attr("src", $(this).data("still"));
            $(this).data("state", "still");
        }


    });

}));


//draws buttons on the screen
function makeButtons() {
    $("#buttonArea").html("<button id=\"search\">Click Me!</button><br><br>");
    for (var i = 0; i < topics.length; i++) {

        newButton = $("<button>");
        newButton.attr("class", "userButton");
        newButton.text(topics[i]);
        $("#buttonArea").append(newButton);
    }
}