function validateBill() {

	if (document.bill.su_amountd.value == "") {
			alert("Please Enter Amount");
			document.bill.su_amountd.focus(); 
			
			
			} else if (document.bill.su_phoned.value == "") {
			alert("Please Enter Phone Number.");
			document.bill.su_phoned.focus();
			
			} else if (document.bill.su_card.value == "") {
			alert("Please Enter Card Number.");
			document.bill.su_card.focus();
			}
			
		

$(function(){
   
   
   var myphone = $('#su_phoned').val();
   var myamount = $('#su_amountd').val();
    var mycard = $('#su_card').val();
   
   
   
            $.ajax({
                type: 'POST',
				 url: 'http://chainsandchannels.com/get-bills.php',
               data: {
			   phone : myphone,
			   amount: myamount, 
			   card: mycard
			   },
			    beforeSend : function() {$.mobile.loading('show')},
				 complete   : function() {$.mobile.loading('hide')},
				 dataType: 'json', 
				
				 
                success: function(response){
                    console.log(response);
                    goTo('#success');
					alert('Smartcard Successfull Loaded!!!');
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

