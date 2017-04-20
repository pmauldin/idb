import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import Chart from './Chart';
import loadingSpinner from '../../../assets/ring-alt.gif';
import dataService from '../../utils/dataService';
import './styles/Visualization.css';

export default class Visualization extends Component {
    constructor(props) {
        super(props);

        dataService.getVisualizationData()
            .then(response => {
                let data = response.objects.map(item => { return {company: item.name, funding: item.funding }});

                this.setState({
                    dataLoading: false,
                    data: data,
                    width: 800,
                        height: 400,
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
                });
            });

        this.state = {
            dataLoading: true
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
