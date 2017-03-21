import React, { Component } from 'react';
import { connect } from 'react-redux';
import LinkedGrid from './cards/LinkedGrid';
import CharacterGridItem from '../gridContainer/griditems/CharacterGridItem';
import { LOAD_DETAILS } from '../../redux/actions';

class CharacterDetails extends Component {
	constructor(props) {
		super(props);
		this.props.loadDetails("characters", parseInt(props.params.id, 10));
	}

	render() {
		if (this.props.data.characters.length === 0) {
			// TODO Use NotFoundComponent
			return (
				<div>
					404 Character Not Found
				</div>
			);
		}

		return (
			<div>
				<CharacterGridItem inGrid={false} {...this.props.data.characters[0]} />
				<LinkedGrid linkType="Comics" displayField="title" data={this.props.data.comics} />
				<LinkedGrid linkType="Series" displayField="title" data={this.props.data.series} />
			</div>
		);
	}
}

function mapStateToProps(store) {
	return {
		data: store.details
	};
}

function mapDispatchToProps(dispatch) {
	return {
		loadDetails: (resultsType, id) => dispatch({ type: LOAD_DETAILS, resultsType, id })
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterDetails);

