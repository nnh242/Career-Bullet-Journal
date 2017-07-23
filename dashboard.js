const DICE_URL = "http://service.dice.com/api/rest/jobsearch/v1/simple.json?"


function getDiceApi(searchTerm, searchLocation, callback) {
    let params = {
        "text": searchTerm,
        "city": searchLocation,
        "direct": 1,
        "skill": searchTerm,
        "sort": 4,
        "sd": "a",
    	type:"get",
        maxResults: 25
    }
    $.getJSON(DICE_URL, params, callback);
}

function displayResults(simple) {
	$('#results').empty();
    let items = simple.resultItemList;
    for (let i=0; i<items.length; i++){
   $('#results').append(`
   	<div class="container">
	   	<div class="result-entry">
	   		<div id="title"><a href="${items[i].detailUrl}" target="blank">${items[i].jobTitle}</a></div>
	  		<div id="location">${items[i].location}</div>
	  		<div id="company">${items[i].company}</div>
	 		<div id="date">${items[i].date}</div>
	 	</div>
 	</div>
 	`)
    }
}
function taskHandler(event){
	event.preventDefault();
	let newTask = $("#entry").val();
	$('.list').append(
		`<li>
          <span class="task">${newTask}</span><button class="check">check</button><button class="delete">delete</button>      
        </li>
      `);
}
function deleteHandler(event){
	$('.delete').closest('li').remove();
}

function checkHandler(event) {
	$('.check').closest('li').find('.task').toggleClass('.task_checked');
}

function logOut(){
    window.location.href="login.html";
}

$("#logOut").on('click', logOut);

$(document).ready(function (){
    $('#searchForm').submit(function(event) {
        event.preventDefault();
        let searchTerm= $(this).find('input[id="searchTerm"]').val().trim();
        let searchLocation =$(this).find('input[id="searchLocation"]').val().trim();
        getDiceApi(searchTerm, searchLocation, displayResults);
    });

	$('#toDoForm').submit(taskHandler);
	$('.check').on('click',checkHandler);
	$('.delete').on('click', deleteHandler);
	$('#calendar').fullCalendar({
        // put your options and callbacks here
		schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
    	defaultView: 'agendaDay',
    	events: [
    	{
            title: 'Event1',
            start: '2017-07-22'
        },
        {
            title: 'Event2',
            start: '2017-07-25'
        }
    	]
    });
});