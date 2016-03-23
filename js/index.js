'use strict';

$('form').on('submit', function(e){

	var url = 'https://embed.spotify.com/openspotify/?spuri=' + $('#val').val() + '&closedelay=5000';
	$('iframe').attr('src',url);
	
	e.preventDefault();
	
});
