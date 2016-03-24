$('form').on('submit', function(e){

	var $input = $('#val'),
		val = $input.val();
	var _url = val;

	if(val.indexOf('https://open.spotify.com') == 0)
	{
		var regexTrack = /https:\/\/open.spotify.com\/track\/(.*)/;
		var matches = val.match(regexTrack);

		_url = 'spotify:track:' + matches[1];
	}

	var embed_url = 'https://embed.spotify.com/openspotify/?spuri=' + _url + '&closedelay=5000';
	$('iframe').attr('src',embed_url);

	e.preventDefault();

});
