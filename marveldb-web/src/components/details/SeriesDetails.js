import React, { Component } from 'react';
import { connect } from 'react-redux';
import LinkedGrid from './cards/LinkedGrid';
import SeriesGridItem from '../gridContainer/griditems/SeriesGridItem';
import { DATA_LOADED } from '../../redux/actions';
import detailsService from './detailsService';
import './styles/common.css';

class SeriesDetails extends Component {
	constructor(props) {
		super(props);
		detailsService.loadDetails("series", parseInt(this.props.params.id, 10), ["characters", "comics", "creators"], this.props.dataLoaded);
	}

	render() {
		if (this.props.data.series.length === 0) {
			return (
				<div>
					404 Series Not Found
				</div>
			);
		}

		return (
			<div>
				<SeriesGridItem className="detailsGridItem" inGrid={false} {...this.props.data.series[0]} />
				<LinkedGrid linkType="Comics" displayField="title" data={this.props.data.comics} />
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

export default connect(mapStateToProps, mapDispatchToProps)(SeriesDetails);