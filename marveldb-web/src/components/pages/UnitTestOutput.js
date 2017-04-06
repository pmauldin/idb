import React, { Component } from 'react'
import dataService from '../../utils/dataService';

export default class UnitTestOutput extends Component {
	constructor(props) {
		super(props);

		this.state = {testOutput: "Loading test results..."};

		dataService.getTestOutput()
			.then(testOutput => {
				this.setState({testOutput});
			})
	}
	render() {
		return <span>{this.state.testOutput}</span>;
	}
}
