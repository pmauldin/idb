import React, { Component } from 'react';
import Navigation from './Navigation';
import './styles/App.css';

class App extends Component {
	render() {
		return (
			<div className="App">
				<Navigation />
				{this.props.children}
			</div>
		)
	}
}

export default App;