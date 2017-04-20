import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import Chart from './Chart';
import loadingSpinner from '../../../assets/ring-alt.gif';
import dataService from '../../utils/dataService';
import './styles/Visualization.css';

export default class Visualization extends Component {
    constructor(props) {
        super(props);

        // dataService.getVisualizationData()
        //     .then(response => {
        //        console.log(response);
        //     });
        //
        // this.state = {
        //     dataLoading: true
        // };

        let data = [
            {
                company: "Company 1",
                funding: 99997
            },
            {
                company: "Company 2",
                funding: 1000000
            },
            {
                company: "Company 3",
                funding: 453534
            }
        ];

        this.state = {
            width: 800,
            height: 400,
            data: data,
            showLegend: false,
            chartSeries: data.map(item => {
                return {
                    field: item.company,
                    name: item.company + ": $" + item.funding
                }
            }),
            name: function (data) {
                return data.company
            },
            value: function (data) {
                return data.funding
            }
        };
    }

    render() {
        console.log(this.state.dataLoading);
        if (this.state.dataLoading) {
            return <Image className="loadingSpinner" responsive src={loadingSpinner} />;
        }

        return (
            <div className="chartWrapper">
                <div className="chartExplanation">This pie chart shows a breakdown of the 10 companies with the most funding, as provided by <a href="http://sweatshop.tech/">http://sweatshop.tech/</a></div>
                <div className="visChart"><Chart data={this.state}/></div>
            </div>
        );
    }
}
