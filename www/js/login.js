function validationcheck(){
  if (document.mylogin.username.value == "") {
    alert("Please Enter Your Phone Number.");
    document.mylogin.username.focus();
  } else if (document.mylogin.password.value == "") {
    alert("Please Enter Password.");
    document.mylogin.password.focus();
  }
  else
  {
    //disable loginButton
    document.getElementById("submitButton").innerHTML="loggin.....";
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
      localStorage.setItem("phone",response['email']);
      localStorage.setItem("id",response['id']);
      localStorage.setItem("fname",response['fname']);
      localStorage.setItem("lname",response['lname']);

      location.href='dashboard.html';
    } else {
      alert("Wrong Phone Number or Password");
      document.getElementById("submitButton").innerHTML="Login to your Account";

    }

      },
      error: function(response) {
        console.log(response);
      }
    });
    return false;
    //});
  }}
}