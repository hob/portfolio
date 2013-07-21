function init() {
	var previousPhotoClickTarget = $('#previousPhoto');
	previousPhotoClickTarget.click(previousPhoto);
	previousPhotoClickTarget.mouseover(onPreviousPhotoMouseOver);
	previousPhotoClickTarget.mouseout(onPreviousPhotoMouseOut);

	var nextPhotoClickTarget = $('#nextPhoto');
	nextPhotoClickTarget.click(nextPhoto);
	nextPhotoClickTarget.mouseover(onNextPhotoMouseOver);
	nextPhotoClickTarget.mouseout(onNextPhotoMouseOut);
}
function onPreviousPhotoMouseOver() {
	var prev = getPreviousPhoto();
	if(prev) {
		$('#previousArrow').removeClass('hidden');
	}
}
function onPreviousPhotoMouseOut() {
	$('#previousArrow').addClass('hidden');
}
function onNextPhotoMouseOver() {
	var next = getNextPhoto();
	if(next) {
		$('#nextArrow').removeClass('hidden');
	}
}
function onNextPhotoMouseOut() {
	$('#nextArrow').addClass('hidden');
}
function animateOutCurrent(div) {
	div.addClass("dismissed");
}
function animateInPrevious(div) {
	div.removeClass("dismissed");
}
var currentPhoto = $("#photo1");
function previousPhoto() {
	var prev = getPreviousPhoto();
	if(prev) {
		currentPhoto = prev;
		animateInPrevious(currentPhoto);
	}
	if(!getPreviousPhoto()) {
		$('#previousArrow').addClass('hidden');
	}
}
function nextPhoto() {
	var next = getNextPhoto();
	if(next) {
		animateOutCurrent(currentPhoto);
		currentPhoto = next;
	}
	onNextPhotoMouseOver();
	if(!getNextPhoto()) {
		$('#nextArrow').addClass('hidden');
	}
}
function getNextPhoto() {
	var next = currentPhoto.prev();
	if(next.length > 0) {
		return next;
	}else{
		return null;
	}
}
function getPreviousPhoto() {
	var prev = currentPhoto.next();
	if(prev.length > 0) {
		return prev;
	}else{
		return null;
	}
}
init();