function CommaFormatted(amount)
{
	var delimiter = ","; // replace comma if desired
	var a = amount.split('.',2)
	var d = a[1];
	var i = parseInt(a[0]);
	if(isNaN(i)) { return ''; }
	var minus = '';
	if(i < 0) { minus = '-'; }
	i = Math.abs(i);
	var n = new String(i);
	var a = [];
	while(n.length > 3)
	{
		var nn = n.substr(n.length-3);
		a.unshift(nn);
		n = n.substr(0,n.length-3);
	}
	if(n.length > 0) { a.unshift(n); }
	n = a.join(delimiter);
	if(n.length < 1) { amount = n; }
	else { amount = n ; }
	amount = minus + amount;
	return amount;
}
// end of function CommaFormatted()

function goTo(target, reversal )
{

	reversal = reversal || 0;
	if (reversal == 0)
	{
	$.mobile.changePage(target, {transition:"slide"});
	}
	else
	{
		$.mobile.changePage(target, {transition:"slide",reverse:true});
	}
}

function onChange(e) {
	var value = document.getElementById("tariff").value
	document.getElementById("amount").value=value;
	console.log(value);
}

function Payment() {
	var confirmPayment = confirm("Are you sure about the payment");
	if(confirmPayment) {
		alert("dvkndn")
	} else {

	}
}
