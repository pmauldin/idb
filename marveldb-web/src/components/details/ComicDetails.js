import React, { Component } from 'react';
import { connect } from 'react-redux';
import LinkedGrid from './cards/LinkedGrid';
import LinkedSeries from './cards/LinkedSeries';
import ComicGridItem from '../gridContainer/griditems/ComicGridItem';
import { LOAD_DETAILS } from '../../redux/actions';

class ComicDetails extends Component {
	constructor(props) {
		super(props);
		this.props.loadDetails("comics", parseInt(props.params.id, 10));
	}

	render() {
		if (this.props.data.comics.length === 0) {
			// TODO Use NotFoundComponent
			return (
				<div>
					404 Comic Not Found
				</div>
			);
		}

		return (
			<div>
				<ComicGridItem inGrid={false} {...this.props.data.comics[0]} />
				<LinkedSeries series={this.props.data.series} />
				<LinkedGrid linkType="Characters" displayField="name" data={this.props.data.characters} />
				<LinkedGrid linkType="Creators" displayField="fullName" data={this.props.data.creators} />
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

export default connect(mapStateToProps, mapDispatchToProps)(ComicDetails);