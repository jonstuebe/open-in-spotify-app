import React from 'react';
import { render } from 'react-dom';
import Styles from './index.scss';

const convertToEmbed = function(val){

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

const App = React.createClass({
	getInitialState() {
		return {
			url: '',
			embed: '',
			open: false
		}
	},
	onKeyUp(e) {

		if(e.type == 'keyup' && e.nativeEvent.keyCode == 13)
		{
			this.openInSpotify();
		}
		else
		{
			this.setState({
				url: e.target.value,
				embed: convertToEmbed(e.target.value),
				open: false
			});
		}

	},
	openInSpotify(e) {

		if(this.state.url != '')
		{
			const self = this;

			self.setState({
				open: false
			});

			setTimeout(function(){
				self.setState({
					open: true
				});
			}, 50);
		}

		if(e) e.preventDefault();
	},
	copyToClipboard(e) {

		window.getSelection().removeAllRanges();

		var range = document.createRange();
		range.selectNode(this.refs.copyInput);
		window.getSelection().addRange(range);

		try {
			var successful = document.execCommand('copy');
			var msg = successful ? 'successful' : 'unsuccessful';
			alert('copied to clipboard');
		} catch(err) {
			alert('unable to copy');
		}

		window.getSelection().removeAllRanges();

		e.preventDefault();
	},
	render() {
		return (
			<div className="container">
				<Logo />
				<Url url={this.state.originalUrl} onKeyUp={this.onKeyUp} />
				<input type="text" ref="copyInput" className="hidden-input" value={this.state.embed} />
				<Generate url={this.state.url} openInSpotify={this.openInSpotify} copyToClipboard={this.copyToClipboard} open={this.state.copy} open={this.state.open} />
			</div>
		)
	}
})

const Url = ({ url, onKeyUp }) => {
	return (
		<div>
			<p className="example">Paste the url to the song <br />(e.g. https://open.spotify.com/track/2Th9BGKvfZG8bKQSACitwG)</p>
			<input type="text" placeholder="enter spotify url" id="val" value={url} onChange={onKeyUp} onKeyUp={onKeyUp} />
		</div>
	)
}

const Generate = ({ url, openInSpotify, copyToClipboard, open }) => {

	let embed = (url != '' && open) ? convertToEmbed(url) : '';

	return (
		<div>
			<div className="buttons">
				<button onClick={copyToClipboard}>copy to clipboard</button>
				<button onClick={openInSpotify}>open in spotify</button>
				<iframe src={embed} frameborder="0"></iframe>
			</div>
		</div>
	)

}

const Logo = () => {
	return (
		<h1 id="logo"></h1>
	)
}

render(<App />, document.getElementById('root'));
