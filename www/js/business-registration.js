function registerBusiness() {
  if (document.register.bname.value == "") {
			alert("Please Enter Your Fullname");
			document.register.bname.focus();

		} else if (document.register.cname.value == "") {
  			alert("Please Contact Persons name");
  			document.register.cname.focus();

  	} else if (document.register.address.value == "") {
  			alert("Please Business full address");
  			document.register.fname.focus();

  	} else if (document.register.phone.value == "") {
  			alert("Please Business Phone Number");
  			document.register.phone.focus();

  		}
    else if (document.register.pwd.value == "") {
        alert("Please Business Password");
        document.register.pwd.focus();

      } else {
  var btn = document.getElementById("submit");
  btn.innerHTML ="Saving.....";
  //btn.style="display:none"
  var bname = document.getElementById("bname").value;
  var address = document.getElementById("address").value;
  var phone = document.getElementById("phone").value;
  var lg = document.getElementById("lg").value;
  var cat = document.getElementById("businessCategory").value;
  var type = document.getElementById("businessType").value;
  var city = document.getElementById("city").value;
  var cname = document.getElementById("cname").value;
  var pwd = document.getElementById("pwd").value;


  var form_data = {
    'name': bname,
    'address': address,
    'city': city,
    'lg':lg,
    'type': type,
    'category': cat,
    'phone': phone,
    'cname':cname,
    'pwd':pwd
  }
  var networkState =  navigator.onLine;
  if (networkState == false){
    navigator.notification.alert("Check your internet connection");
  } else {

  $.ajax({
          type: "post",
          url: "http://communitylifeproject.ngo/lg/Api/pipeline/addBusiness",
          data: form_data,
          beforeSend : function() {$.mobile.loading('show')},
          complete   : function() {$.mobile.loading('hide')},
          success: function(response) {
            if(response = 'true') {
              console.log(response);
              alert("You have Successfully added" + bname + "to Owo ori Ijoba");
              document.getElementById("bname").value ='';
              document.getElementById("phone").value ='';
              cname="";

              lg="";
              city="";
              location.href="dashboard.html";
            } else {
              alert("Error while adding to database Please try again");
              btn.innerHTML = "Save ";
            }
          },
          error: function(response) {
            console.log(response);
          }
        });
      }
    }

}
