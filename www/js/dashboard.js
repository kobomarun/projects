var fname = localStorage.getItem('fname');
var lname = localStorage.getItem('lname');
var phone = localStorage.getItem('phone');

var fullName = fname +" " + lname
 $('#name').html(fullName);
 $('#phone').html(phone);

 function showConfirm() {
   confirm(
       'Do you really want to exit?',  // message
       exitFromApp,              // callback to invoke with index of button pressed
       'Exit',            // title
       'Cancel,OK'         // buttonLabels
   );
 }


   function exitFromApp(buttonIndex) {
     if (buttonIndex==2){
      navigator.app.exitApp();
    }
  }
