$(document).ready(function(){

	$('#searchgif').bind('submit', function(event) {
    //$('#enter').click(function(e){  
    	//e.preventDefault();

     	$.ajax({ 
           url: '/search',
           type: 'POST',
           cache: false, 
           data: {'query':$("#searchbox").val()},
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
               alert('text status '+textStatus+', err '+err)
           }
        });

        return false;
     });  
});
