import React, { Component } from 'react';
import { Grid, Col, Row } from 'react-bootstrap';

export default class GridContainer extends Component {
	render() {
		const GridItem = this.props.gridItem;
		const results = this.props.results;

		const gridItems = results.map(result => 
			<Col key={result.id} xs={12} sm={4} md={4} lg={4}>
				<GridItem inGrid={true} {...result} />
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