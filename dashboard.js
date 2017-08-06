const DICE_URL = "https://crossorigin.me/http://service.dice.com/api/rest/jobsearch/v1/simple.json?"

// get the data from Dice API
function getDiceApi(searchTerm, searchLocation, callback) {
    let params = {
        "text": searchTerm,
        "city": searchLocation,
        "direct": 1,
        "skill": searchTerm,
        "sort": 1,
        "sd": "a",
    	type:"get",
        maxResults: 50
    }
    $.getJSON(DICE_URL, params, callback);
}

//display job posts that come from the Dice API
function displayResults(simple) {
	$('#results').empty();
    let items = simple.resultItemList;
    for (let i=0; i<items.length; i++){
   $('#results').append(`
   	<div class="row">
      <div class="col-12 result-card">
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

//add a new task to the to-do list
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

//add a new list item
function listHandler (event){
    event.preventDefault();
    let newEntry = $("#listEntry").val();
    $('.any-list').append(
        `<li>
          <span class="task">${newEntry}</span><button onclick ="deleteHandler()" class="delete">delete</button>     
        </li>
      `);
    $('#listEntry').val('');
}
// delete a task or list item
function deleteHandler(event){
	$(this).closest('li').remove();
}
// cross out completed task
function checkHandler(event) {
	$(this).closest('li').find('.task').toggleClass('task_checked');
}

//return to the landing page when user click "Close Journal"
function logOut(){
    window.location.href="login.html";
}
$("#logOut").on('click', logOut);

$(document).ready(function (){
    let rawDate = new Date();
    let stringDate = rawDate.toString();
    let displayDate= stringDate.slice(-57,-47);
    $("#today").text(displayDate);
    
    // listen for user's search input
    $('#searchForm').submit(function(event) {
        event.preventDefault();
        let searchTerm= $(this).find('input[id="searchTerm"]').val().trim();
        let searchLocation =$(this).find('input[id="searchLocation"]').val().trim();
        $('#results').removeClass('hidden');
        getDiceApi(searchTerm, searchLocation, displayResults);
    });
	$('#toDoForm').submit(taskHandler);
    $('#listForm').submit(listHandler);
	$('.list').on('click','.check', checkHandler);
	$('.list').on('click','.delete',deleteHandler);
    $('.any-list').on('click','.delete',deleteHandler);
     $('#createEvent').hide();

//implement the weekly calendar 
	$('#calendar').fullCalendar({
		schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
    	defaultView: 'agendaWeek',
        selectable: true,
        editable: true,
        select: function(start, end) {
      endTime = $.fullCalendar.formatDate(end,'h:mm');
      startTime = $.fullCalendar.formatDate(start,'ddd, MMM d, h:mm');
      $('#createEvent #eventStartTime').val(start);
      $('#createEvent #eventEndTime').val(end);
      $('#eventName').val('');
      $('#createEvent').show()
      $('#submitButton').on('click', function(event){
        event.preventDefault();
        eventHandler();
  });

// create event from user input
  function eventHandler(){
    $('#createEvent').hide();
    inputTitle= $('#eventName').val();
    eventTitle= inputTitle.toString();
    
    $("#calendar").fullCalendar('renderEvent',
        {
            title: $('#eventName').val(),
            start: new Date($('#eventStartTime').val()),
            end: new Date($('#eventEndTime').val()),
        },
        true);
   }
   }
    });
});