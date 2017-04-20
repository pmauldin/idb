import React, { Component } from 'react';
import { Navbar, Nav, NavItem, } from 'react-bootstrap';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import './styles/Navigation.css';
import SearchingMenu from './menus/searching/SearchingMenu';

class Navigation extends Component {
	render() {
		return (
			<Navbar inverse collapseOnSelect>
				<Navbar.Header>
					<Navbar.Toggle />
					<Navbar.Brand>
						<Link to="/">MarvelDB</Link>
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
						<LinkContainer to="/about">
							<NavItem>About</NavItem>
						</LinkContainer>
						<LinkContainer to="/visualization">
							<NavItem>Visualization</NavItem>
						</LinkContainer>
					</Nav>
					<SearchingMenu />
				</Navbar.Collapse>
			</Navbar>
		);
	}
}

export default Navigation;