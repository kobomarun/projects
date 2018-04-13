function verifyPayment() {
  var phone = $('#phone').val();
if(phone.length !== 11) {
  alert("Your phone number should be 11 numbers");
} else {

  $.ajax({
    type: 'POST',
    crossDomain: true,
    url: 'http://communitylifeproject.ngo/lg/Api/pipeline/verifyPayment',
    data: {
    phone : phone,
  },
  beforeSend : function() {$.mobile.loading('show')},
  complete   : function() {$.mobile.loading('hide')},
  dataType: 'json',
  success: function(response){
  console.log(response);
  if(response !== 'error') {
    document.getElementById('confirm').innerHTML="Confirming ......";
    setInterval(function() {
      var div = $('#result');
      div.css({ display: "block" });
      document.getElementById('confirm').style="display:none";
      document.getElementById('phone').value ="";
      document.getElementById('tariff-name').innerHTML=response['tariffName'];
      document.getElementById('tariff-date').innerHTML=response['date'];
      document.getElementById('tariff-amount').innerHTML=response['price'];

      document.getElementById('pay-detail').innerHTML="Payment Details for " + phone;
     }, 2000);



  } else {
    alert("No record of payment for this phone number");
  }

    },
    error: function(response) {
      console.log(response);
    }
  });
  return false;
}}
  //});

function submitComplain() {
  var id = localStorage.getItem('id');
  var title = document.getElementById("title").value;
  var msg = document.getElementById("message").value;
  var phone = document.getElementById("phone").value;
  var location = document.getElementById("location").value;
  var random = Math.floor((Math.random() * 1000000) +1);
  if(title  == '') {
    alert("We can not accept empty complain");
  } else if(msg  == '') {
    alert("We can not accept empty complain");
  }else {
    form_data = {
      'random': random,
      'title': title,
      'msg': msg,
      'id': id,
      'phone': phone,
      'location': location
    }
    $.ajax({
      type: 'POST',
      crossDomain: true,
      url: 'http://communitylifeproject.ngo/lg/Api/pipeline/addComplain',
      data: form_data,
    beforeSend : function() {$.mobile.loading('show')},
    complete   : function() {$.mobile.loading('hide')},
    dataType: 'json',
    success: function(response){
    console.log(response);
    if(response !== 'error') {
      document.getElementById('status').innerHTML="Submitting your complain ......";
      setInterval(function() {
        document.getElementById('status').innerHTML="Your complain has been submitted. your complain id is " + random;
       }, 2000);
       location.href='sucess.html';

    } else {
      alert("Error submitting your complain");
    }

      },
      error: function(response) {
        console.log(response);
      }
    });
  }
}
