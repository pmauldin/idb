import React, { Component } from 'react';
import { Grid, Col, Row } from 'react-bootstrap';

export default class GridContainer extends Component {
	render() {
		const GridItem = this.props.gridItem;
		const results = this.props.results;

		const gridItems = results.map(result => 
			<Col key={result.id} xs={18} md={4} lg={2}>
				<GridItem {...result} />
			</Col>
		);
		return (
			<Grid>
				<Row>
					{gridItems}
				</Row>
			</Grid>
		);
	}
}