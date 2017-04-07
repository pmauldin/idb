import React, { Component } from 'react';
import { Grid, Col, Row, Image } from 'react-bootstrap';
import loadingSpinner from '../../../assets/ring-alt.gif';
import './styles/GridContainer.css';

export default class GridContainer extends Component {
	render() {
		const GridItem = this.props.gridItem;
		let data = this.props.data;

		if (this.props.dataLoading) {
			return <Image className="loadingSpinner" responsive src={loadingSpinner} />;
		}

		if (data.length === 0) {
			return (
				<div>
					No Results Found
				</div>
			)
		}

		const gridItems = data.map(item =>
			<Col key={item.id} xs={12} sm={4} md={4} lg={4}>
				<GridItem inGrid={true} {...item} />
			</Col>
		);

		return (
			<Grid className="marginlessGrid">
				<Row>
					{gridItems}
				</Row>
			</Grid>
		);
	}
}