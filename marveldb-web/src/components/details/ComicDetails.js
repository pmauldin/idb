import React, { Component } from 'react';
import { connect } from 'react-redux';
import LinkedGrid from './cards/LinkedGrid';
import LinkedSeries from './cards/LinkedSeries';
import ComicGridItem from '../gridContainer/griditems/ComicGridItem';
import { DATA_LOADED } from '../../redux/actions';
import detailsService from './detailsService';

class ComicDetails extends Component {
	constructor(props) {
		super(props);
		detailsService.loadDetails("comics", parseInt(this.props.params.id, 10), ["characters", "series", "creators"], this.props.dataLoaded);
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
		data: store.data
	};
}

function mapDispatchToProps(dispatch) {
	return {
		dataLoaded: (data, resultsType) => dispatch({ type: DATA_LOADED, data, resultsType })
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ComicDetails);