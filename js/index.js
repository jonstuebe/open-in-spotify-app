$(document).ready(function() {

	var getQueryVariable = function(variable)
	{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
           var pair = vars[i].split("=");
           if(pair[0] == variable){return pair[1];}
       }
       return(false);
	}

	var convertToEmbed = function(val){

		var _url = val;
		if(val.indexOf('https://open.spotify.com') == 0)
		{
			var regexTrack = /https:\/\/open.spotify.com\/track\/(.*)/;
			var matches = val.match(regexTrack);

			_url = 'spotify:track:' + matches[1];
		}
		var embed_url = 'https://embed.spotify.com/openspotify/?spuri=' + _url + '&closedelay=5000';
		return embed_url;
	}

	$(window).on('load', function(){

		if(getQueryVariable('url') != "")
		{
			$('iframe').attr('src', convertToEmbed(getQueryVariable('url')));
			window.location.search = '';
		}

	});

	$('form').on('submit', function(e){

		var $input = $('#val'),
			val = $input.val();

		$('iframe').attr('src',convertToEmbed(val));
		$input.val('');
		e.preventDefault();

	});


});
