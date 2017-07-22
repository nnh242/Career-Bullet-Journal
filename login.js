const pass = "iwillgetadeveloperjob";
const btn = $('#submit');


function submitHandler (){
    event.preventDefault();
    let input = $('#password').val();
    console.log(input);
    if (input === pass){
        window.location.href ="dashboard.html";
    }
    else {
        btn.text('Try Again');
    }
}

$( document ).ready(function() {
    btn.on('click', submitHandler);
});

