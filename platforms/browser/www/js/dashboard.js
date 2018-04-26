var fname = localStorage.getItem('fname');
var lname = localStorage.getItem('lname');
var phone = localStorage.getItem('phone');
var ctotal = localStorage.getItem('ctotal');
var dtotal = localStorage.getItem('dtotal');

var fullName = fname +" " + lname
 $('#name').html(fullName);
 $('#phone').html(phone);
 $('#ctotal').html("N"+ctotal);
  $('#dtotal').html("N"+dtotal);

   function showConfirm() {

    confirmed = function(buttonIndex) { if(buttonIndex == 1) { console.log("navigator.app.exitApp"); navigator.app.exitApp(); } }

    navigator.notification.confirm('Exit Owo-Ori App?', confirmed, 'Exit?');
  }
