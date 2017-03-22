import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';
import './styles/Home.css';

export default class Home extends Component {
	render() {
		const links = ["http://www.wallpaperup.com/uploads/wallpapers/2014/11/20/521987/big_thumb_d484e756ff70c1d89f5fcdb27cff5e4e.jpg",
					 "https://www.wired.com/wp-content/uploads/blogs/geekmom/wp-content/uploads/2012/03/marvel-characters.jpg",
					 "http://kingofwallpapers.com/marvel-comics/marvel-comics-003.jpg"];

		const carouselItems = links.map((link) => (<Carousel.Item key={link}><div className="carousel-img" style={{backgroundImage: "url("+link+")"}} /></Carousel.Item>))

		return (
			<Carousel>
				{carouselItems}
			</Carousel>
		);
	}
}
