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
        url: 'http://communitylifeproject.ngo/lg/Api/pipeline/checkBusisnessExist',
        data: {
        phone : phone,
      },
      beforeSend : function() {$.mobile.loading('show')},
      complete   : function() {$.mobile.loading('hide')},
      dataType: 'json',
      success: function(response){
      console.log(response);
      if(response !== 'error') {
      //set user details in localStorage
      localStorage.setItem("bphone",response['phone']);
      localStorage.setItem("bname",response['bname']);

      location.href='tariff-payment2.html';
    } else {
      alert("This phone number is not registered with any business");
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

var newV;

function onChange(e) {
	var value = document.getElementById("tariff").value

newV = e.options[e.selectedIndex].value
  var splitValue = newV.split(":");
  var tariffAmount = document.getElementById("amount").value=splitValue[0];
  var tariffName = document.getElementById("tariffName").value=splitValue[1];
  localStorage.setItem('tariffName', tariffName);
  localStorage.setItem('tariffAmount', tariffAmount);
console.log(splitValue[1]);
}

function Payment() {
	var confirmPayment = confirm("Are you sure about the payment");
	if(confirmPayment) {
    tname = localStorage.getItem('tariffName');
    tamount = localStorage.getItem('tariffAmount');
    bname = localStorage.getItem('bname');
    bphone = localStorage.getItem('bphone');
    officerid = localStorage.getItem('id');
    pmethod = document.getElementById('pmethod').value;

    form_data = {
      'tname': tname,
      'tamount': tamount,
      'bname': bname,
      'bphone': bphone,
      'p_method':pmethod,
      'officer_id':officerid
    }

    $.ajax({
      type: 'POST',
      crossDomain: true,
      url: 'http://communitylifeproject.ngo/lg/Api/pipeline/addPayment',
      data: form_data,
    beforeSend : function() {$.mobile.loading('show')},
    complete   : function() {$.mobile.loading('hide')},
    dataType: 'json',
    success: function(response){
    console.log("hello",response);
    if(response == "true") {

    location.href='sucess.html';
  } else {
    alert("Something went Wrong. Try Again");
  }

    },
    error: function(response) {
      console.log(response);
    }
  });
  return false;

	} else {

	}
}

function getAllTariff() {
  var networkState =  navigator.onLine;
  if (networkState == false){
    navigator.notification.alert("Check your internet connection");
  } else {
  $.ajax({
          type: "post",
          url: "http://communitylifeproject.ngo/lg/Api/pipeline/getAllTariff",
          beforeSend : function() {$.mobile.loading('show')},
          complete   : function() {$.mobile.loading('hide')},
          success: function(response) {
            if(response!=='') {
              document.getElementById("tariff").innerHTML=response;
            } else {
              alert("No Tariff Found");
            }

          },
          error: function(response) {
            console.log(response);
          }
        });
      }
}
