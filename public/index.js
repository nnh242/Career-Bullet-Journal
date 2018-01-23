const API_URL = "/api/positions"

$(document).ready( () => {
    $('#open').on('click', () => {
         window.location.href="/dashboard";
    })
    let rawDate = new Date();
    let stringDate = rawDate.toString();
    let displayDate= stringDate.slice(-57,-42);
    $("#today").text(displayDate);

    // listen for user's search input
    $('#searchForm').submit(function (event){
        event.preventDefault();
        let searchTerm= $(this).find('input[id="searchTerm"]').val().trim();
        let searchLocation =$(this).find('input[id="searchLocation"]').val().trim();
        $('#results').removeClass('hidden');
        getApi(searchTerm, searchLocation, displayResults);
    });
	$('#toDoForm').submit(taskHandler);
    $('#listForm').submit(listHandler);
	$('.list').on('click','.check', checkHandler);
	$('.list').on('click','.delete',deleteHandler);
    $('.any-list').on('click','.delete',deleteHandler);
//implement the weekly calendar
$('#calendar').fullCalendar({
    schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
    defaultView: 'agendaDay',
    selectable: true,
    selectLongPressDelay: 0,
    editable: true,
    select: (start, end, allDay) => {
    //popup modal for user to input event's name and see timeslot selected
    let selectedStart = start.toISOString();
    let startTime = selectedStart.slice(11) ;
    let selectedEnd = end.toISOString();
    let endTime = selectedEnd.slice(11);
    let selectedTime = startTime + " " + "-" + " " + endTime;
    $('#createEventModal').removeClass('hidden');
    $('#eventName').val('');
    $('#eventStartTime').val(start);
    $('#eventEndTime').val(end);
    $('#eventAllDay').val(allDay);
    $('#eventTime').text(selectedTime);
}
});
});

// get the data from API
function getApi(searchTerm, searchLocation, callback) {
    let params = {
        "description": searchTerm,
        "location": searchLocation,
    	type:"get",
        maxResults: 50
    }
    $.getJSON(API_URL, params, callback);
}
//display job posts that come from the API
function displayResults(data) {
  console.log(data);
	$('#results').empty();
    let items = data;
    for (let i=0; i<items.length; i++){
   $('#results').append(`
   	<div class="row">
      <div class="col-12 result-card">
	   	<div class="result-entry">
	   		<div id="title"><a href="${items[i].url}" target="blank">${items[i].title}</a></div>
	  		<div id="location"><span>Location: </span>${items[i].location}</div>
            <div id="company"><span>Company: </span>${items[i].company}</div>
            <div id="date"><span>Date Posted: </span>${items[i].date}</div>
	 		<div id="date"><span> Description: </span>${items[i].description}</div>
	 	</div>
 	</div>
 	`)
    }
}
//add a new task to the to-do list
function taskHandler(event){
	event.preventDefault();
    let newTask = $("#entry").val();
    if (newTask==="") {
        $('#entry').notify("Please enter a task", { position:"top" })
    }
    else {
        $('.list').append(
            `<li>
              <span class="task">${newTask}</span><button onclick="checkHandler()" class="check">check</button><button onclick ="deleteHandler()" class="delete">delete</button>
            </li>
          `);
        $('#entry').val('');
    }
}
//add a new list item
function listHandler (event){
    event.preventDefault();
    let newEntry = $("#listEntry").val();
    if (newEntry==="") {
        $('#listEntry').notify("Please enter list's item", { position:"top" })
    }
    else {
        $('.any-list').append(
            `<li>
              <span class="task">${newEntry}</span><button onclick ="deleteHandler()" class="delete">delete</button>
            </li>
          `);
        $('#listEntry').val('');
    }
}
// delete a task or list item
function deleteHandler(event){
	$(this).closest('li').remove();
}
// cross out completed task
function checkHandler(event) {
	$(this).closest('li').find('.task').toggleClass('task_checked');
}
//return to the landing page when user click logo
function logOut(){
    window.location.href="index.html";
}
$("#logo").on('click', logOut);
// When user clicks on (x) close the modal
$('.close').on('click', function () {
    $('#createEventModal').addClass('hidden');
});
//submit event's name by pressing Enter key
$('#eventName').keypress((event) => {
    if (event.which == 13) {
        event.preventDefault();
        eventHandler();
    }
})
//submit event's name by clicking on Save button
$('#submitButton').on('click', (event) => {
    event.preventDefault();
    eventHandler();
    });
//render the event on the calendar
function eventHandler() {
    $('#createEventModal').addClass('hidden');
    $("#calendar").fullCalendar('renderEvent',
        {
        title: $('#eventName').val(),
        start: (new Date($('#eventStartTime').val())).toISOString(),
        end:  (new Date($('#eventEndTime').val())).toISOString(),
        allDay: ($('#eventAllDay').val() == "true"),
    },
    true);
}
