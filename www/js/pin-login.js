$(function(){
       // $('form').submit(function(e){
		//e.preventDefault();
           
			 var uname = localStorage.getItem('User');
			  var passd = localStorage.getItem('Pass');
			 
            $.ajax({
                type: 'POST',
				 url: 'http://chainsandchannels.com/get-pin.php',
               data: {
			   user : uname,
			   passw : passd
			   },
			    beforeSend : function() {$.mobile.loading('show')},
				 complete   : function() {$.mobile.loading('hide')},
				 dataType: 'json', 
				
				 
                success: function(response){
                    console.log(response);
                    alert('Success');
                },
                error: function(response){
                    console.log(response);
                    alert('Incorect Username/Password');
                }
            });
            
            return false;
        
     });
	 //});

}}
