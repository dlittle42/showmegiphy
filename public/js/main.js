$(document).ready(function(){

	var query;

	$('#searchgif').bind('submit', function(event) {
    //$('#enter').click(function(e){  
    	//e.preventDefault();

     	searchGiphy();
     });  

	var searchGiphy = function(term){

		if (term){
			query = term;
		}else{
			query = $("#searchbox").val();
		}

		$.ajax({ 
           url: '/search',
           type: 'POST',
           cache: false, 
           data: {'query':query},
           crossDomain: true,
           //data: JSON.stringify(somejson),
           dataType: "json",
           beforeSend: function( xhr ) {
           		$('#anigif').fadeOut();
           },
           success: function(data){
              console.log('Success: '+data.image);
             // $('#anigif').attr('src', data.image);
              $('#anigif').css('background-image', 'url(' + data.image + ')');
              $('#anigif').fadeIn();
           }
           , error: function(jqXHR, textStatus, err){
               console.log('text status '+textStatus+', err '+err);
               $('#anigif').css('background-image', 'url(/img/tron-no.gif)');
              	$('#anigif').fadeIn();
           }
        });
	}


	$('body').keypress(function (e) {
	  if (e.which == 13) {
	    $('form#searchgif').submit();
	    return false;    //<---- Add this line
	  }
	});

	if (annyang) {
	  // Let's define our first command. First the text we expect, and then the function it should call
	  var commands = {
	    'show me *term': searchGiphy//,
	    //'more': searchGiphy
	  };

	  // Add our commands to annyang
	  annyang.addCommands(commands);

	  // Start listening. You can call this here, or attach this call to an event, button, etc.
	  annyang.start();

	 }

});
