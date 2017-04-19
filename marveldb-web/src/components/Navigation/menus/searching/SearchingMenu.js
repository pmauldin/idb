import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormGroup, Navbar, FormControl, Button } from 'react-bootstrap';
import './styles/SearchingMenu.css';
import { UPDATE_SEARCH_OPTIONS, RESET_STATE } from '../../../../redux/actions';

// TODO: Searching from Details Page is broken

class SearchingMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchText: ""
		}
	}

	updateSearchText(event) {
		var text = ("" + event.target.value).trim();
		this.setState({searchText: text});

		if (!text || text === "") {
			this.props.resetState();
		}
	}

	performSearch() {
		this.props.searchOptionsUpdated({searchText: this.state.searchText});
	}

	render() {
		return (
			<FormGroup className="searchingFormGroup" controlId="searchingMenuForm">
				<Navbar.Form pullRight>
					<FormControl type="text" placeholder="Search" onChange={this.updateSearchText.bind(this)} />
					<Button onClick={this.performSearch.bind(this)} type="submit">Submit</Button>
				</Navbar.Form>
			</FormGroup>
		);
	}
};

function mapStateToProps(store) {
	return {
		search: store.search
	};
}

function mapDispatchToProps(dispatch) {
	return {
		searchOptionsUpdated: (value) => dispatch({type: UPDATE_SEARCH_OPTIONS, value}),
		resetState: () => dispatch({ type: RESET_STATE })
	};
}

SearchingMenu = connect(mapStateToProps, mapDispatchToProps)(SearchingMenu);

export default SearchingMenu;
