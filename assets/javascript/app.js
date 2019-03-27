//how to console log to see value of new buttons
//

$(document).ready(function () {

    topics = [];

    //search button- grabs input value and creates a
    // a button to store that value -> sends to array to be grabbed when gifBtn is clicked

    //SUNNY NOTES: always take a look at whats actually happening with code, previous activities review. 

    $("#searchBtn").click(function (e) {
        e.preventDefault();
        let input = $('#userInput').val().trim();
        topics.push(input)
        console.log(topics)
        $(".btnHolder").append(`<button class="gifBtn" type="button" data-name="${input}" >` + input + `</button>`)
        $('#gifHolder').html('');
        fetchGifs(input)
        $("#userInput").val('');

    });

    //grabs gifs with jquery ajax call upon search button click
    function fetchGifs(searchTerm) {
        // console.log(searchTerm)
        //loop through ajax call every time button is clicked
        let queryURL = `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=KzCXYeA2353VVI7f0fLMMYCz3GfzC2Wi&limit=10&rating=pg-13`;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            let results = response.data;
            console.log(results);

            // get gifs from results
            for (let i = 0; i < results.length; i++) {
                $('#gifHolder').append($("<img class='gifImage' data-state='still'>").attr({ "src": results[i].images.fixed_height_still.url, "data-still": results[i].images.fixed_height_still.url, "data-animate": results[i].images.fixed_height.url }));

            }

        })


    }
    //functions for gif buttons
    //set up attribute
    //take the attr value and then call the function of gifFetch(attrvalue)
    $(document).on("click", ".gifBtn", function (event) {
        $('#gifHolder').html('');
        fetchGifs(event.target.dataset.name)
        console.log('here')
        console.log('event:', event)
        event.preventDefault();
       
    })

    

});

