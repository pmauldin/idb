import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';

class Navigation extends Component {
	render() {
		return (
			<Navbar inverse collapseOnSelect>
				<Navbar.Header>
					<Navbar.Toggle />
				</Navbar.Header>
				<Navbar.Collapse>
					<Nav>
						<IndexLinkContainer to="/">
							<NavItem>MarvelDB</NavItem>
						</IndexLinkContainer>
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