import React, { Component } from 'react';
import { Grid, Col, Row } from 'react-bootstrap';

export default class GridContainer extends Component {
	render() {
		const GridItem = this.props.gridItem;
		const data = this.props.data;

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