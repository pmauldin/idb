import React, { Component } from 'react';
import { Carousel, Image } from 'react-bootstrap';
import '../css/Home.css';

class Home extends Component {
	render() {
		let links = ["http://www.wallpaperup.com/uploads/wallpapers/2014/11/20/521987/big_thumb_d484e756ff70c1d89f5fcdb27cff5e4e.jpg",
					 "https://www.wired.com/wp-content/uploads/blogs/geekmom/wp-content/uploads/2012/03/marvel-characters.jpg",
					 "http://kingofwallpapers.com/marvel-comics/marvel-comics-003.jpg"]

		return (
			<Carousel>
				<Carousel.Item>
					<div className="carousel-img" style={{backgroundImage: "url("+links[0]+")"}} />
				</Carousel.Item>
				<Carousel.Item>
					<div className="carousel-img" style={{backgroundImage: "url("+links[1]+")"}} />
				</Carousel.Item>
				<Carousel.Item>
					<div className="carousel-img" style={{backgroundImage: "url("+links[2]+")"}} />
				</Carousel.Item>
			</Carousel>
		);
	}
}

export default Home;
