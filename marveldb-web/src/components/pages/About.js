import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import './styles/About.css';
import AboutUs from './about/AboutUs';
import Report from './about/Report';

export default class About extends Component {
	render() {
		return (
			<Tabs defaultActiveKey={2} id="uncontrolled-tab">
				<Tab eventKey={1} title="About Us"><AboutUs/></Tab>
				<Tab eventKey={2} title="Technical Report"><Report/></Tab>
			</Tabs>
		);
	}
}
