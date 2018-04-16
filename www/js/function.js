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
    if(response !== 'error') {
      var row = response.responseText;
      response.map(function(row){
        console.log('success',row.tariffName);
        document.getElementById('confirm').innerHTML="<h4>Confirming ......</h4>";


          var div = $('#result');
          div.css({ display: "block" });
      
          document.getElementById('phone').value ="";
          document.getElementById('tariff-name').innerHTML=row.tariffName;
          document.getElementById('tariff-date').innerHTML=row.date;
          document.getElementById('tariff-amount').innerHTML=row.price;

          document.getElementById('pay-detail').innerHTML="Payment Details for " + phone;

      })

    } else {
      console.log('errorsss',response);
      alert("No record of payment for this phone number");
    }

    }
  });
  return false;
}}
  //});

function submitComplain() {
  var id = localStorage.getItem('id');
  var title = document.getElementById("title").value;
  var msg = document.getElementById("message").value;
  var phone = localStorage.getItem('phone');
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

//accordion
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    });
}
