'use strict';

$('form').on('submit', function (e) {

	var url = 'https://embed.spotify.com/openspotify/?spuri=' + $('input[type="text]').val() + '&closedelay=5000';
	$('iframe').attr('src', url);

	e.preventDefault();
});