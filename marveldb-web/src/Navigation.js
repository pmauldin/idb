import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

class Navigation extends Component {
	render() {
		return (
			<Navbar inverse collapseOnSelect>
				<Navbar.Header>
					<Navbar.Brand>
						<a href="#">MarvelDB</a>
					</Navbar.Brand>
					<Navbar.Toggle />
				</Navbar.Header>
				<Navbar.Collapse>
					<Nav>
						<NavItem eventKey={1} href="/characters">Characters</NavItem>
						<NavItem eventKey={2} href="/comics">Comics</NavItem>
						<NavItem eventKey={3} href="/series">Series</NavItem>
						<NavItem eventKey={4} href="/creators">Creators</NavItem>
						<NavItem eventKey={5} href="/about">About</NavItem>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		);
	}
}

export default Navigation;