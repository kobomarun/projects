function validateAirtime() {

	if (document.airtime.su_amount.value == "") {
			alert("Please Enter Amount");
			document.airtime.su_amount.focus(); 
			
			
			} else if (document.airtime.su_phones.value == "") {
			alert("Please Enter Phone Number.");
			document.airtime.su_phones.focus();
			}
			
		

$(function(){
   
   
   var myphone = $('#su_phones').val();
   var myamount = $('#su_amount').val();
   var mynet = $('input[name="radio-choice"]:checked').val();
   
   
            $.ajax({
                type: 'POST',
				 url: 'http://chainsandchannels.com/get-airtime.php',
               data: {
			   phone : myphone,
			   amount: myamount, 
			   radio: mynet
			   },
			    beforeSend : function() {$.mobile.loading('show')},
				 complete   : function() {$.mobile.loading('hide')},
				 dataType: 'json', 
				
				 
                success: function(response){
                    console.log(response);
                    goTo('#success');
					alert('Customer Registration Successful!!!');
                },
                error: function(response){
                    console.log(response);
                    alert('Can not add Airtime!!!');
                }
            });
            
            return false;
        
     });
	 }
	 //});

//}}

