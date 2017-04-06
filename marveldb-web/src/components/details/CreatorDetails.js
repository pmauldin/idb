import React, { Component } from 'react';
import { connect } from 'react-redux';
import LinkedGrid from './cards/LinkedGrid';
import CreatorGridItem from '../gridContainer/griditems/CreatorGridItem';
import { DATA_LOADED } from '../../redux/actions';
import detailsService from './detailsService';
import './styles/common.css';

class CreatorDetails extends Component {
	constructor(props) {
		super(props);
		detailsService.loadDetails("creators", parseInt(this.props.params.id, 10), ["comics", "series"], this.props.dataLoaded);
	}

	render() {
		if (this.props.data.creators.length === 0) {
			return (
				<div>
					404 Creator Not Found
				</div>
			);
		}

		return (
			<div>
				<CreatorGridItem className="detailsGridItem" inGrid={false} {...this.props.data.creators[0]} />
				<LinkedGrid linkType="Comics" displayField="title" data={this.props.data.comics} />
				<LinkedGrid linkType="Series" displayField="title" data={this.props.data.series} />
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

export default connect(mapStateToProps, mapDispatchToProps)(CreatorDetails);
