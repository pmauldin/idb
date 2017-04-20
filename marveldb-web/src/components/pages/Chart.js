import React, { Component } from 'react';
import { PieChart } from 'react-d3-basic';

export default class Chart extends Component {
    render() {
        return (
            <PieChart {...this.props.data}/>
        );
    }
}