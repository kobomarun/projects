function Validatemtn() {

	if (document.mtn.su_amount.value == "") {
			alert("Please Enter Amount");
			document.airtime.su_amount.focus();


			} else if (document.mtn.su_phone.value == "") {
			alert("Please Enter Phone Number.");
			document.airtime.su_phone.focus();

			} else if (document.mtn.su_accounttype.value == "") {
			alert("Please Enter Phone Number.");
			document.airtime.su_accounttype.focus();
			}

			else {
			 //check if there is data connection
	 var networkState =  navigator.network.connection.type;
    if (networkState == Connection.NONE){
                navigator.notification.alert("Check your data connection");

    }

			var acctype = $('#su_accounttype').val();
			var amount = $('#su_amount').val();
			var phone = $('#su_phone').val();


			var product = 5;

			localStorage.setItem('acctype','wallet');
			localStorage.setItem('amount',amount);
			localStorage.setItem('phone',phone);
			localStorage.setItem('productid', product);
			$('#outref').html(acctype);
			$('#outam').html(amount);
			$('#outnum').html(phone);

			goTo('#confirm');

}

    function verify_vend() {

		 //check if there is data connection
	 var networkState =  navigator.network.connection.type;
    if (networkState == Connection.NONE){
                navigator.notification.alert("Check your data connection");

    }


			var acctype = localStorage.getItem('acctype');
			var amount = localStorage.getItem('amount');
			var phone = localStorage.getItem('phone');
			var productid = localStorage.getItem('productid');
			var wallet = localStorage.getItem('walletbal');
			var agentid = localStorage.getItem('agent_id');
			var walletnum = localStorage.getItem('walletnum');
			var pin = $('#su_mtnpin').val();

			 $.ajax({
                type: 'POST',
				 url: 'https://909agent.com/windpipe/process',
				 crossDomain: true,
               data: {
			   acct : acctype,
			   amount : amount,
			   ref_number : phone,
			   product : productid,
			   agent_id : agentid,
			   wallet_num: walletnum,
			   pin : pin
			   },
			    beforeSend : function() {$.mobile.loading('show')},
				 complete   : function() {$.mobile.loading('hide')},
				 dataType: 'json',


                success: function(response){
                    console.log(response);

					var statusp = response.message;


					 if(statusp == 'success') {
						 alert(statusp);
						//goTo('#success');
					 } else {
						  alert(statusp);
					 }


                },

            });

            return false;


	}
