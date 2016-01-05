$(document).ready(function(){

	var query;
	var intro = "SHOW ME ";
	var initState = true;

	var setSearchBox = function(term){
		if (term){
			$('#myTextArea').text(intro + term);
		}else{
			$('#myTextArea').text(intro);
		}
		
	}

   	$('#anigif').addClass('reveal');
	setSearchBox();

	$('#searchgif').bind('submit', function(event) {
    //$('#enter').click(function(e){  
    	//e.preventDefault();

     	searchGiphy();
     	console.log("#searchgif");
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
           data: {'query': encodeURIComponent(query)},
           crossDomain: true,
           //data: JSON.stringify(somejson),
           dataType: "json",
           beforeSend: function( xhr ) {
           		//$('#anigif').fadeOut();
           		$('#anigif').toggleClass('reveal').removeClass('redalert');
           
           },
           success: function(data){
              console.log('Success: '+data.image);
             // $('#anigif').attr('src', data.image);
              $('#anigif').css('background-image', 'url(' + data.image + ')');
              $('#anigif').toggleClass('reveal');
              //$('#anigif').fadeIn();
           }
           , error: function(jqXHR, textStatus, err){
               console.log(jqXHR + ' text status '+textStatus+', err '+err);
               $('#anigif').css('background-image', 'url(/img/tron-no.gif)');
               $('#anigif').toggleClass('reveal');
               $('#anigif').addClass('redalert');
               //$('#myTextArea').text("Sorry :(");
              	//$('#anigif').fadeIn();
           }
        });
	}


	$('body').keydown(function (e) {
		

	  //enter
	  if (e.which == 13) {
	    //$('form#searchgif').submit();
	    searchGiphy(getTerm());
	    console.log("return");
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
	 	if (initState == true) {

	 		$('#myTextArea').text("");
	 		initState = false;
	 		console.log("init");

	 	}else{
		 	if (str.length > intro.length){
		 		str = str.substring(0, str.length - 1);
		 		console.log(str);
		 		$('#myTextArea').text(str);
		 	}else{
		 		console.log('hey, too far!!');
		 	}
		 }
	 }



});
