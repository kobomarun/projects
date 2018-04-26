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
        console.log('success',response);
    },
    error: function error(response) {
      console.log(response);
      if(response.responseText != 'error') {

      document.getElementById('confirm').innerHTML="Confirming ......";

      setInterval(function() {
        var div = $('#result');
        div.css({ display: "block" });
        document.getElementById('confirm').style="display:none";
        document.getElementById('label').style="display:none";
        document.getElementById('phone').style ="display:none";
        document.getElementById('signup_btn_2').style ="display:none";
        document.getElementById('content').innerHTML=response.responseText;
        document.getElementById('pay-detail').innerHTML="Payment Details for " + phone;
       }, 2000);
     } else {
       alert("No Record of Payment Found");
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
        document.getElementById('status').innerHTML="Your complain has been submitted. Your complain ID is " + random;
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

function UploadSupport() {
  var img = document.getElementById('userfile');
  var title = document.getElementById("title").value;
  var phone = localStorage.getItem('phone');
  if(title  == '') {
    alert("We can not accept empty complain");
  } else if(img  == '') {
    alert("Pls Upload Your Payment Slip");
  }else {
    form_data = {
      'title': title,
      'img': img,
      'phone': phone
    }
    $.ajax({
      type: 'POST',
      crossDomain: true,
      url: 'http://communitylifeproject.ngo/lg/Api/pipeline/do_upload',
      data: form_data,
    beforeSend : function() {$.mobile.loading('show')},
    complete   : function() {$.mobile.loading('hide')},
    dataType: 'json',
    success: function(response){
    console.log(response);
    if(response !== 'error') {
      document.getElementById('status').innerHTML="Submitting......";
      setInterval(function() {
        document.getElementById('status').innerHTML="Your payment evidence has been submitted.";
       }, 2000);
       location.href='sucess.html';

    } else if(response == 'bad') {
      alert('Something is wrong with the image you uploaded')
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
