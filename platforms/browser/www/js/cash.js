function validateCash() {

	if (document.cashout.su_money.value == "") {
			alert("Please Enter Amount");
			document.cashout.su_money.focus(); 
			
			
			} else if (document.cashout.su_pay.value == "") {
			alert("Please Enter Phone Number.");
			document.cashout.su_pay.focus();
			
			} else if (document.cashout.sud_pin.value == "") {
			alert("Please Enter PIN Number.");
			document.cashout.sud_pin.focus();
			}
			
		

$(function(){
   
   
   var mypin = $('#sud_pin').val();
   var myamount = $('#su_pay').val();
    var mymoney = $('#su_money').val();
   
   
   
            $.ajax({
                type: 'POST',
				 url: 'http://chainsandchannels.com/get-cash.php',
               data: {
			   pin : mypin,
			   amount: myamount, 
			   money: mymoney
			   },
			    beforeSend : function() {$.mobile.loading('show')},
				 complete   : function() {$.mobile.loading('hide')},
				 dataType: 'json', 
				
				 
                success: function(response){
                    console.log(response);
                    goTo('#success');
					alert('You Have Successfully Send Cash');
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

