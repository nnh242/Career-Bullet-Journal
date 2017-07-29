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
          <span class="task">${newTask}</span><button onclick="checkHandler()" class="check">check</button><button onclick ="deleteHandler()" class="delete">delete</button>      
        </li>
      `);
    $('#entry').val('');
}

function listHandler (event){
    event.preventDefault();
    let newEntry = $("#listEntry").val();
    $('any-list').append(
        `<li>
          <span class="task">${newEntry}</span>     
        </li>
      `);
    $('#listEntry').val('');
}

function deleteHandler(event){
	$(this).closest('li').remove();
}

function checkHandler(event) {
	$(this).closest('li').find('.task').toggleClass('task_checked');
}

function logOut(){
    window.location.href="login.html";
}
$("#logOut").on('click', logOut);

$(document).ready(function (){
    let rawDate = new Date();
    let stringDate = rawDate.toString();
    let displayDate= stringDate.slice(-57,-47);
    $("#today").text(displayDate);
    
    $('#searchForm').submit(function(event) {
        event.preventDefault();
        $('#calendar').hide();
        let searchTerm= $(this).find('input[id="searchTerm"]').val().trim();
        let searchLocation =$(this).find('input[id="searchLocation"]').val().trim();
        getDiceApi(searchTerm, searchLocation, displayResults);
    });
	$('#toDoForm').submit(taskHandler);
    $('#listForm').submit(listHandler);
	$('.list').on('click','.check', checkHandler);
	$('.list').on('click','.delete',deleteHandler);
	$('#calendar').fullCalendar({
        // put your options and callbacks here
		schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
    	defaultView: 'month'
    });
});