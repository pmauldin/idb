import React, { Component } from 'react';
import { connect } from 'react-redux';
import LinkedGrid from './cards/LinkedGrid';
import SeriesGridItem from '../gridContainer/griditems/SeriesGridItem';
import { LOAD_DETAILS } from '../../redux/actions';


class SeriesDetails extends Component {
	constructor(props) {
		super(props);
		this.props.loadDetails("series", parseInt(props.params.id, 10));
	}

	render() {
		if (this.props.data.series.length === 0) {
			// TODO Use NotFoundComponent
			return (
				<div>
					404 Series Not Found
				</div>
			);
		}

		return (
			<div>
				<SeriesGridItem inGrid={false} {...this.props.data.series[0]} />
				<LinkedGrid linkType="Comics" displayField="title" data={this.props.data.comics} />
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

export default connect(mapStateToProps, mapDispatchToProps)(SeriesDetails);