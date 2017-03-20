import React, { Component } from 'react';
import { Link } from 'react-router';
import './styles/common.css';

export default class LinkedGrid extends Component {
	render() {
		let innerHtml;

		if (this.props.data !== undefined && this.props.data.length > 0) {
			innerHtml = this.props.data.map(item => <Link key={item.id} to={`/${this.props.linkType.toLowerCase()}/${item.id}`} >{item[this.props.displayField]}</Link>);
		} else {
			innerHtml = `No Related ${this.props.linkType} Found`;
		}

		return (
			<div className="linkedGridCard">
				{this.props.linkType}: {innerHtml}
			</div>
		);
	}
}
