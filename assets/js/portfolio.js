function init() {
	var previousPhotoClickTarget = $('#previousPhoto');
	var nextPhotoClickTarget = $('#nextPhoto');
	previousPhotoClickTarget.click(previousPhoto);
	nextPhotoClickTarget.click(nextPhoto);
	loadPhotos(function() {setArrowState();});
}
var currentPhoto;
function previousPhoto() {
	var prev = getPreviousPhoto();
	if(prev) {
		currentPhoto.addClass('unseen');
		currentPhoto = prev;
		currentPhoto.removeClass("dismissed");
	}
	setArrowState();
}
function nextPhoto() {
	var next = getNextPhoto();
	if(next) {
		currentPhoto.addClass("dismissed");
		currentPhoto = next;
		currentPhoto.removeClass('unseen');
	}
	//Load the url into the one behind the one that's becoming current
	//so the image isn't loading while we're trying to transition to it
	var photo = getNextPhoto();
	if(photo) {
		activatePhoto(photo);
	}
	setArrowState();
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
function setArrowState() {
	var prev = getPreviousPhoto();
	if(prev) {
		$('#previousArrow').removeClass('hidden');
		$('#previousPhoto').addClass('clickable');
	}else{
		$('#previousArrow').addClass('hidden');
		$('#previousPhoto').removeClass('clickable');
	}
	var next = getNextPhoto();
	if(next) {
		$('#nextArrow').removeClass('hidden');
		$('#nextPhoto').addClass('clickable');
	}else{
		$('#nextArrow').addClass('hidden');
		$('#nextPhoto').removeClass('clickable');
	}
}
function loadPhotos(callback) {
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

			var photoDiv = $('<div class="photo unseen"></div>');
			container.prepend(photoDiv);
			jQuery.data(photoDiv[0], 'photo', largePhotoURL);
        });
		currentPhoto = $('.photo:last-child');
		currentPhoto.removeClass('unseen');
		activatePhoto(currentPhoto);
		//Queue up photo #2 so it's not loading while the user is switching to it
		activatePhoto(currentPhoto.prev());
		callback();
    });
}
/**
*  Moves the photo url from the div's data to it's background-image url.  An
*  optimiztion to keep from having to load all images at once and slow down
*  the gallery's load time.
*/
function activatePhoto(photoDiv){
	var url = jQuery.data(photoDiv[0], 'photo');
	if(url) {
		$(photoDiv).css('background-image', 'url(' + url + ')');
		jQuery.removeData(photoDiv[0], 'photo');
	}
}
init();