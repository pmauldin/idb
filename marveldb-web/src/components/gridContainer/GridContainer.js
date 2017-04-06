import React, { Component } from 'react';
import { Grid, Col, Row } from 'react-bootstrap';

export default class GridContainer extends Component {
	render() {
		const GridItem = this.props.gridItem;
		let data = this.props.data;

		if (!data) {
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

		if (data.length === 0) {
			return (
				<div>
					No Results Found
				</div>
			)
		}

		return (
			<Grid className="marginlessGrid">
				<Row>
					{gridItems}
				</Row>
			</Grid>
		);
	}
}