$(document).ready(function(){

	var query;
	var intro = "SHOW ME ";

	var setSearchBox = function(term){
		if (term){
			$('#myTextArea').text(intro + term);
		}else{
			$('#myTextArea').text(intro);
		}
		
	}


	setSearchBox();

	$('#searchgif').bind('submit', function(event) {
    //$('#enter').click(function(e){  
    	//e.preventDefault();

     	searchGiphy();
     	return false;
     });  

	var searchGiphy = function(term){

		if (term){
			query = term;
			setSearchBox(term);
		}else{
			query = $("#searchbox").val();
		}

		$.ajax({ 
           url: '/search',
           type: 'POST',
           cache: false, 
           data: {'query': query},
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


	$('body').keydown(function (e) {
		

	  //enter
	  if (e.which == 13) {
	    //$('form#searchgif').submit();
	    searchGiphy(getTerm());
	    return false;    //<---- Add this line
	  }else if (e.which == 46 || e.which == 8) {
	  	console.log('delete or backspace');
	  	deleteTerm();
	    //$('form#searchgif').submit();
	    return false;    //<---- Add this line
	  }else{
	  	$('#myTextArea').append(String.fromCharCode(event.which));
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

	 var getTerm = function(){
	 	var str = $('#myTextArea').text();
		str = str.replace(intro, "");
		return str;
	 }

	 var deleteTerm = function(){
	 	var str = $('#myTextArea').text();
	 	if (str.length > intro.length){
	 		str = str.substring(0, str.length - 1);
	 		console.log(str);
	 		$('#myTextArea').text(str);
	 	}else{
	 		console.log('hey, too far!!');
	 	}
	 }






	// var nlform = new NLForm( document.getElementById( 'nl-form' ) );

});
