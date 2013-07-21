function init() {
	var previousPhotoClickTarget = $('#previousPhoto');
	previousPhotoClickTarget.click(previousPhoto);
	previousPhotoClickTarget.mouseover(function() {
		$('#previousArrow').removeClass('hidden');
	});
	previousPhotoClickTarget.mouseout(function() {
		$('#previousArrow').addClass('hidden');
	});
	var nextPhotoClickTarget = $('#nextPhoto');
	nextPhotoClickTarget.click(nextPhoto);
	nextPhotoClickTarget.mouseover(function() {
		$('#nextArrow').removeClass('hidden');
	});
	nextPhotoClickTarget.mouseout(function() {
		$('#nextArrow').addClass('hidden');
	});
}
function animateOutCurrent(div) {
	div.addClass("dismissed");
}
function animateInPrevious(div) {
	div.removeClass("dismissed");
}
var currentPhoto = $("#photo1");
function previousPhoto() {
	var prev = currentPhoto.prev();
	if(prev) {
		currentPhoto = prev;
		animateInPrevious(currentPhoto);
	}else{
		animate(currentPhoto, "wiggle", false);
	}
}
function nextPhoto() {
	var next = currentPhoto.next();
	if(next) {
		animateOutCurrent(currentPhoto);
		currentPhoto = next;
	}else{
		animate(currentPhoto, "wiggle" , false);
	}
}
init();