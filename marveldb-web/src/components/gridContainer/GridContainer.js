import React, { Component } from 'react';
import { Grid, Col, Row } from 'react-bootstrap';

export default class GridContainer extends Component {
	render() {
		const GridItem = this.props.gridItem;
		let data = this.props.data;

		// Sort the data when sortData changes
		const field = this.props.sortData.field;
		const order = this.props.sortData.order === "ascending" ? 1 : -1;
		data.sort((a, b) => order * (a[field] !== b[field] ? a[field] < b[field] ? -1 : 1 : 0));

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