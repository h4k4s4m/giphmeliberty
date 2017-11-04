topics = ["Michael Scott", "The Rock", "Donald Trump", "Obama"];







$("#search").click(function () {

    topic = $("#userInput").val();
    makeButton(topic);


});

$(document).on("click", ".userButton", (function () {
    $.ajax({
        url: "https://api.giphy.com/v1/gifs/search?api_key=B03Xe9kHpe1ifHmZgVVPHnImU6fW8RE3&q=" + topic + "&limit=1&offset=0&rating=G&lang=en",
        method: "GET"
    }).done(function (response) {
        imageURL = response.data["0"].images.fixed_height.url;
        imageURLStill = response.data["0"].images.fixed_height_still.url;


        newImage = $("<img>");
        newImage.attr("src", imageURLStill);
        newImage.addClass("image");
        newImage.data("animated", imageURL);
        newImage.data("still", imageURLStill);
        newImage.data("state", "still");

        $("#giphArea").append(newImage);
    });

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



function makeButton(input) {
    newButton = $("<button>");
    newButton.attr("class", "userButton");
    newButton.text(input);
    $("#buttonArea").append(newButton);
}