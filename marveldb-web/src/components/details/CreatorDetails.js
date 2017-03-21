import React, { Component } from 'react';
import { connect } from 'react-redux';
import LinkedGrid from './cards/LinkedGrid';
import CreatorGridItem from '../gridContainer/griditems/CreatorGridItem';
import { LOAD_DETAILS } from '../../redux/actions';

class CreatorDetails extends Component {
	constructor(props) {
		super(props);
		this.props.loadDetails("creators", parseInt(props.params.id, 10));
	}

	render() {
		if (this.props.data.creators.length === 0) {
			// TODO Use NotFoundComponent
			return (
				<div>
					404 Creator Not Found
				</div>
			);
		}

		return (
			<div>
				<CreatorGridItem inGrid={false} {...this.props.data.creators[0]} />
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

export default connect(mapStateToProps, mapDispatchToProps)(CreatorDetails);
