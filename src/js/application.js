$('.navbar-toggler').on('click', function(){
	$('#navigation').attr('style', 'left:0');
});
$('#navigation .close-navigation').on('click', function(){
	$('#navigation').removeAttr('style');
});
$('.search-toggler').on('click', function(){
	$('.search-form').attr('style', 'top:0');
});
$('.navbar-nav .sub-menu').on('click', function(){
	var subLinks = "." + $(this).attr('data-target');
	$(this).closest(".navbar-nav").addClass('d-none');
	$(subLinks).removeClass('d-none');
	$('#navigation').find('.close-navigation').addClass('d-none');
	$('#navigation').find('.prev-menu').removeClass('d-none');
});
$('#navigation .prev-menu').on('click', function(){
	$(this).addClass('d-none');
	$(this).closest('#navigation').find('.close-navigation').removeClass('d-none');
	$(this).closest('#navigation').find('.main-menu').removeClass('d-none');
	$(this).closest('#navigation').find('.sub-links').addClass('d-none');
});