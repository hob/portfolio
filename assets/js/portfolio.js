function init() {
	var previousPhotoClickTarget = $('#previousPhoto');
	previousPhotoClickTarget.click(previousPhoto);
	previousPhotoClickTarget.mouseover(onPreviousPhotoMouseOver);
	previousPhotoClickTarget.mouseout(onPreviousPhotoMouseOut);

	var nextPhotoClickTarget = $('#nextPhoto');
	nextPhotoClickTarget.click(nextPhoto);
	nextPhotoClickTarget.mouseover(onNextPhotoMouseOver);
	nextPhotoClickTarget.mouseout(onNextPhotoMouseOut);
	loadPhotos();
}
function onPreviousPhotoMouseOver() {
	var prev = getPreviousPhoto();
	if(prev) {
		$('#previousArrow').removeClass('hidden');
		$('#previousPhoto').addClass('clickable');
	}else{
		$('#previousPhoto').removeClass('clickable');
	}
}
function onPreviousPhotoMouseOut() {
	$('#previousArrow').addClass('hidden');
}
function onNextPhotoMouseOver() {
	var next = getNextPhoto();
	if(next) {
		$('#nextArrow').removeClass('hidden');
		$('#nextPhoto').addClass('clickable');
	}else{
		$('#nextPhoto').removeClass('clickable');
	}
}
function onNextPhotoMouseOut() {
	$('#nextArrow').addClass('hidden');
}
var currentPhoto;
function previousPhoto() {
	var prev = getPreviousPhoto();
	if(prev) {
		currentPhoto.addClass('unseen');
		currentPhoto = prev;
		currentPhoto.removeClass("dismissed");
	}
	if(!getPreviousPhoto()) {
		$('#previousArrow').addClass('hidden');
		$('#previousPhoto').removeClass('clickable');
	}
}
function nextPhoto() {
	var next = getNextPhoto();
	if(next) {
		currentPhoto.addClass("dismissed");
		currentPhoto = next;
		currentPhoto.removeClass('unseen');
	}
	onNextPhotoMouseOver();
	if(!getNextPhoto()) {
		$('#nextArrow').addClass('hidden');
		$('#nextPhoto').removeClass('clickable');
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
function loadPhotos() {
	var container = $('#photoScroller');
    var apiKey = '55ee2fd5b04b436eb07f894a8f8213e2';
    var userId = '67916954@N00';
	var set = '72157634736643500';
	var flickrBaseURI = 'http://api.flickr.com/services/rest/?format=json';

    $.getJSON(flickrBaseURI + '&method=flickr.photosets.getPhotos&api_key=' + apiKey + '&user_id=' + userId + '&photoset_id=' + set + '&extras=tags' + '&jsoncallback=?', 
    function(data){
        $.each(data.photoset.photo, function(i, rPhoto){
          var basePhotoURL = 'http://farm' + rPhoto.farm + '.static.flickr.com/' + rPhoto.server + '/' + rPhoto.id + '_' + rPhoto.secret;            

            var thumbPhotoURL = basePhotoURL + '_s.jpg';
            var mediumPhotoURL = basePhotoURL + '.jpg';
			var largePhotoURL = basePhotoURL + '_b.jpg';

			var photoDiv = $('<div class="photo unseen" style="background-image:url(\'' + largePhotoURL + '\');"></div>');

			container.prepend(photoDiv);
        });
		currentPhoto = $('.photo:last-child');
		currentPhoto.removeClass('unseen');
    });
}
init();