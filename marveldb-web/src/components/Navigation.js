import React, { Component } from 'react';
import { Navbar, Nav, NavItem, } from 'react-bootstrap';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';
import './styles/Navigation.css';

class Navigation extends Component {
	render() {
		return (
			<Navbar inverse collapseOnSelect>
				<Navbar.Header>
					<Navbar.Toggle />
					<Navbar.Brand>
						<IndexLinkContainer to="/"><a>MarvelDB</a></IndexLinkContainer>
					</Navbar.Brand>
				</Navbar.Header>
				<Navbar.Collapse>
					<Nav>
						<LinkContainer to="/characters">
							<NavItem>Characters</NavItem>
						</LinkContainer>
						<LinkContainer to="/comics">
							<NavItem>Comics</NavItem>
						</LinkContainer>
						<LinkContainer to="/series">
							<NavItem>Series</NavItem>
						</LinkContainer>
						<LinkContainer to="/creators">
							<NavItem>Creators</NavItem>
						</LinkContainer>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		);
	}
}

export default Navigation;