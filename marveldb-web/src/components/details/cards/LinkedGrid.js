import React, { Component } from 'react';
import { Link } from 'react-router';
import { Image } from 'react-bootstrap';
import '../styles/common.css';

export default class LinkedGrid extends Component {
	render() {
		let innerHtml;

		if (this.props.data !== undefined && this.props.data.length > 0) {
			innerHtml = this.props.data.map(item => {
				const link = `/${this.props.linkType.toLowerCase()}/${item.id}`;

				return (
					<div key={item.id} className="relatedItem">
						<div className="relatedItemThumbnailContainer">
							<Image responsive src={item.thumbnail} className="relatedItemThumbnail"/>
						</div>
						<Link to={link} >{item[this.props.displayField]}</Link>
					</div>);
			});
		} else {
			innerHtml = `No Related ${this.props.linkType} Found`;
		}

		return (
			<div className="linkedGridCardContainer">
				{this.props.linkType}:<br/>
				<div className="linkedGridCard">
					 {innerHtml}
				</div>
			</div>
		);
	}
}
