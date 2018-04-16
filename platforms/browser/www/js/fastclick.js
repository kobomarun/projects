$(document.body).
	on('tap', 'div', function(e)
	{
		var action = this.getAttribute('onTap');
		if (e.defaultPrevented || !action) return;
		e.preventDefault();
		eval(action);
	}).
	on('click', 'div', function(e)
	{
		e.preventDefault();
	});

$(document.body).
	on('tap', 'img', function(e)
	{
		var action = this.getAttribute('onTap');
		if (e.defaultPrevented || !action) return;
		e.preventDefault();
		eval(action);
	}).
	on('click', 'img', function(e)
	{
		e.preventDefault();
	});