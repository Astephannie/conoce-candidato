$('.smooth-down').on('click', function(e) {
	e.preventDefault();
	var target = $(this).attr("href");
	$('html, body').stop().animate({
		scrollTop: $(target).offset().top
		}, 1000);
	});