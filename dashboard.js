function logOut(){
    window.location.href="login.html";
}

$("#logOut").on('click', logOut);

const DICE_URL = "http://service.dice.com/api/rest/jobsearch/v1/simple.json?"

//getJSON
function getDiceApi(searchTerm, callback) {
    let params = {
        q1: searchTerm,
    	type:"get",
        maxResults: 25
    }
    $.getJSON(DICE_URL, params, callback);
}

function displayResults(simple) {
    let items = simple.resultItemList;
    console.log(items);
    console.log(items[0].location);
    console.log(items[1].detailUrl);
    }


$(document).ready(function (){
    $('#searchForm').submit(function(event) {
        event.preventDefault();
        // get the search term and remove unnecessary white spaces
        let searchTerm= $(this).find('input[id="searchTerm"]').val().trim();
        console.log(searchTerm);
        let searchLocation =$(this).find('input[id="searchLocation"]').val().trim();
        console.log(searchLocation);
        getDiceApi(searchTerm,displayResults)
    });
});