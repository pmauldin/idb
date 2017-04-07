import React, { Component } from 'react';
import Navigation from './Navigation';
import './styles/App.css';

class App extends Component {
	render() {
		window.scrollTo(0, 0);

		return (
			<div className="App">
				<Navigation />
				{this.props.children}
			</div>
		)
	}
}

export default App;