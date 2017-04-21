import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navigation from './Navigation/Navigation';
import './styles/App.css';
import SearchResultsContainer from './resultsContainer/SearchResultsContainer';

// This code is bad. :(
// This code is bad because we don't have a high-level container that renders everything.
class App extends Component {
	render() {
		window.scrollTo(0, 0);

		if (!this.props.search.searchText || this.props.search.searchText === "") {
			return (
				<div className="App">
					<Navigation />
					{this.props.children}
				</div>
			);
		} 

		return (
				<div className="App">
					<Navigation />
					<SearchResultsContainer />
				</div>
			);
	}
}


function mapStateToProps(store) {
	return {
		search: store.search
	};
}

export default connect(mapStateToProps)(App);