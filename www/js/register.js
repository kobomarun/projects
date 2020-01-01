function validateNow() {

	if (document.register.fname.value == "") {
			alert("Please Enter Your Fullname");
			document.register.fname.focus();

		} else if (document.register.phone.value == "") {
			alert("Please Enter Your Phone Number.");
			document.register.phone.focus();
		} else if (document.register.email.value == "") {
			alert("Please Enter Your Email.");
			document.register.email.focus();
		}
		else if (document.register.password.value == "") {
			alert("Please Enter Your Password.");
			document.register.password.focus();
		}
		else {



$(function(){


   var myphone = $('#phone').val();
   var myfname = $('#fname').val();
   var myemail = $('#email').val();
   var mypassword = $('#password').val();

            $.ajax({
                type: 'POST',
				 url: 'http://chainsandchannels.com/get-register.php',
               data: {
			   phone : myphone,
			   fname: myfname,
			   email: myemail,
			   password: mypassword,
			   },
			    beforeSend : function() {$.mobile.loading('show')},
				 complete   : function() {$.mobile.loading('hide')},
				 dataType: 'json',


                success: function(response){
                    console.log("sucees",response);
                    location.href= 'dashboard.html';
                },
                error: function(response){
                    console.log("errro", response);
                    alert('Can not add customer!!!', myphone);
										location.href= 'dashboard.html';
                }
            });

            return false;

     });
	 }
 }
	 //});

//}}
