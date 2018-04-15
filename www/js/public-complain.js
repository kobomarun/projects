function checkBusisness(){
  if (document.verify.phone.value == "") {
    alert("Please Enter Business Phone Number.");
    document.verify.phone.focus();
  }
  else
  {
    //disable loginButton
    $("#submitButton").attr("disabled","disabled");
    //check if there is data connection
    var networkState =  navigator.onLine;
    if (networkState == false){
      navigator.notification.alert("Check your internet connection");
    } else {


      var phone = $('#phone').val();
      console.log(phone);
      $.ajax({
        type: 'POST',
        crossDomain: true,
        url: 'http://communitylifeproject.ngo/lg/Api/pipeline/viewcomplaints',
        data: {
        phone : phone,
      },
      beforeSend : function() {$.mobile.loading('show')},
      complete   : function() {$.mobile.loading('hide')},
      dataType: 'json',
      success: function(response){

      if(response !== 'error') {
        document.getElementById('viewC').style="display:none";
        document.getElementById('viewComplain').style="display:block";
        response.map(function(row) {
          console.log(row.title);
          document.getElementById('title').innerHTML=row.title;
          document.getElementById('msg').innerHTML=row.message;

        });
      //set user details in localStorage
      //localStorage.setItem("bphone",response['phone']);
      //localStorage.setItem("bname",response['bname']);

    } else {
      alert("This phone number is not registered with any business");
    }

      },
      error: function(response) {
        console.log(response);
          alert("This phone number is not registered with any business");
      }
    });
    return false;
    //});
  }}
}
