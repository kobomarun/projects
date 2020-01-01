function validationcheck(){
  if (document.mylogin.username.value == "") {
    navigator.notification.alert("Please Enter Your Phone Number.");
    document.mylogin.username.focus();
  } else if (document.mylogin.password.value == "") {
    navigator.notification.alert("Please Enter Password.");
    document.mylogin.password.focus();
  }
  else
  {
    //disable loginButton
    document.getElementById("submitButton").innerHTML="Checking .....";
    $("#submitButton",form).attr("disabled","disabled");
    //check if there is data connection
    var networkState =  navigator.onLine;
    if (networkState == false){
      navigator.notification.alert("Check your internet connection");
    } else {
      //$(function(){
      var Username = $('#username').val();
      var Password = $('#password').val();

      $.ajax({
        type: 'POST',
        crossDomain: true,
        url: 'http://communitylifeproject.ngo/lg/Api/pipeline/login',
        data: {
        username : Username,
        pass : Password
      },
      beforeSend : function() {$.mobile.loading('show')},
      complete   : function() {$.mobile.loading('hide')},
      dataType: 'json',
      success: function(response){
      console.log(response);
      if(response !== 'error') {
      //set user details in localStorage
      localStorage.setItem("phone",response['phone']);
      localStorage.setItem("id",response['id']);
      localStorage.setItem("fname",response['fname']);
      localStorage.setItem("lname",response['lname']);
      localStorage.setItem("bname",response['bname']);
      localStorage.setItem("ctotal",response['ctotal']);
      localStorage.setItem("dtotal",response['dtotal']);


      if(response['type'] == 1) {
      location.href='dashboard.html';
    } else {
      location.href='customer-dash.html';
    }
    } else {
      navigator.notification.alert("Wrong Phone Number or Password");
      document.getElementById("submitButton").innerHTML="Login to your Account";

    }

      },
      error: function(response) {
        console.log(response);
        alert("Something Went Wrong");
        document.getElementById("submitButton").innerHTML="Login to your Account";

      }
    });
    return false;
    //});
  }}
}
