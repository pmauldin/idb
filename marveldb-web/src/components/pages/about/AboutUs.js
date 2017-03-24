import React, { Component } from 'react';
import '../styles/About.css';
import { Image } from 'react-bootstrap';

export default class AboutUs extends Component {
	constructor(props) {
		super(props);

		const members = [
			{
				name: "Peter Mauldin",
				bio: "Peter Mauldin is a Computer Science student at The University of Texas at Austin, with an expected " +
				"graduation date of December, 2017. He interned (and was eventually hired full-time) as a Software Engineer " +
				"at a Austin startup, where he worked until October of 2016. In the summer of 2017, Peter will head to New York " +
				"for a 12-week Software Engineering internship with MongoDB. In his spare time, Peter enjoys playing video games, " +
				"reading (mostly Fantasy), and playing Dungeons & Dragons (usually a Ranger).",
				pic: "http://i.imgur.com/cIjpd6p.jpg",
				responsibilities: "Worked on Front-End development (UI, dynamic content, routing, and communication with the back-end " +
				"server), defined data models, and manually created static instances of each model.",
				num_commits: 24,
				num_issues: 18,
				num_tests: 0
			},
			{
				name: "Tirey Morris",
				bio: "Tirey (Ty) Morris is a senior studying Computer Science at the University of Texas at Austin. During the " +
				"summer of 2015, he was a software engineering intern at UnboundID (now Ping), where he continued to work until " +
				"Spring 2016. Ty spent the summer of 2016 as a full-stack web development intern at Bluebeam in Pasadena, CA, " +
				"where he plans to continue working during the upcoming summer. Ty's non-CS hobbies include drinking coffee, " +
				"hiking, playing video games, and hanging out with his cats Walrus and Toulouse.",
				pic: "https://i.imgur.com/VE8DXni.jpg",
				responsibilities: "Focused on implementing frontend features, including dynamic content, routing, communication " +
				"with the backend API, and page/component styling. Also helped define data models, and styled grid components for Grid Pages.",
				num_commits: 16,
				num_issues: 15,
				num_tests: 0
			},
			{
				name: "Charles Gong",
				bio: "Charles Gong is a computer science major at the University of Texas at Austin, one of the premier computer science " +
				"schools in the nation. Over the summer, he worked as a contractor for a startup in Dallas, Texas. In his spare time he " +
				"likes developing iOS applications, hoping to make the next big mobile trend. He also likes to play basketball, go to concerts, " +
				"and watch every Netflix show.",
				pic: "http://i.imgur.com/4naGWp5.jpg",
				responsibilities: "API design and implementation, Server creation and management, " +
				"Frontend and backend deployment onto Google Cloud Platform, Domain name management",
				num_commits: 7,
				num_issues: 9,
				num_tests: 0
			},
			{
				name: "Edward Bigelow",
				bio: "Edward Bigelow (Casey) is a 3rd-year computer science major at the University of Texas at Austin. " +
				"He spends most of his spare time playing video games as well as playing dungeons and dragons. " +
				"He enjoys being both a player and a dungeon master and hopes to develop video games in his future.",
				pic: "http://i.imgur.com/0R7zazt.jpg",
				responsibilities: "TODO",
				num_commits: 0,
				num_issues: 2,
				num_tests: 0
			},
			{
				name: "Christiano Contreras",
				bio: "Christiano Contreras is a fourth Computer Science major at the University of Texas at Austin. " +
				"He currently works with the Longhorn Center for Academic Excellence, as a Webmaster. He wishes to get a " +
				"job as a Software Engineer, Systems Engineer, Full Stack Developer, or Backend Developer after he graduates from UT.",
				pic: "https://scontent-dft4-2.xx.fbcdn.net/v/t1.0-9/13322092_1046065268801497_4817712812014478821_n.jpg?oh=7bdf3827371b3882165f566d2ba1a1a2&oe=59511DE5",
				responsibilities: "Creation of database models, Writing Unit Tests for database models, Creation of UML Diagram",
				num_commits: 5,
				num_issues: 3,
				num_tests: 9
			},
			{
				name: "Jorge Zapien-Diaz",
				bio: "Jorge Zapien-Diaz is a 4th-year computer science major at the University of Texas at Austin. During the " +
				"summer of 2016, he worked as a software engineering intern for Optum in Boston, MA. Since August 2016, he’s " +
				"taken the role of Teaching Assistant for a Data Structures course at school. His interests in computer science " +
				"consist of artificial intelligence and supercomputing. Currently, he is part of an undergraduate team that is " +
				"learning to build a computer cluster for the SC17 competition (http://www.studentclustercompetition.us/). " +
				"Other hobbies and interests include playing in the University of Texas Longhorn Band, tennis, running, and hiking.",
				pic: "https://scontent.xx.fbcdn.net/v/t1.0-9/10952351_1056227341070280_2622929811254831170_n.jpg?oh=6f4273ba67f2c07a753aa1d77e2c1296&oe=59262EB5",
				responsibilities: "Creation of database models, Writing Unit Tests for database models",
				num_commits: 9,
				num_issues: 5,
				num_tests: 3
			}
		];

		const membersHtml = members.map(member => {
			return (
				<div key={member.name} className="memberCard">
					<div className="aboutPicContainer">
						<Image responsive rounded className="aboutPic" src={member.pic}/>
					</div>
					<div>
						<strong>{member.name}</strong><br/>
						{member.bio}<br/>
						<strong>Major Responsibilities: </strong>{member.responsibilities}<br/>
						<strong>Number of commits: </strong>{member.num_commits}<br/>
						<strong>Number of issues: </strong>{member.num_issues}<br/>
						<strong>Number of unit tests: </strong>{member.num_tests}<br/>
					</div>
				</div>
			);
		});

		this.state = {
			membersHtml
		};
	}

	render() {
		return (
			<div className="aboutContainer">
				<div className="aboutDescription">
					MarvelDB is a catalogue of Marvel characters, comics, series, and creators that helps every superhero
					fanboy/girl out there visualize and understand connections within the Marvel universe.
				</div>
				<div className="aboutHeader">
					Superhero Fan Club
				</div>
				{this.state.membersHtml}
				<div className="aboutHeader">
					Stats
				</div>
				<strong>Number of commits: </strong>71<br/>
				<strong>Number of issues: </strong>26<br/>
				<strong>Number of unit tests: </strong>12<br/>
				<strong>Apiary API: </strong><a href="http://docs.marveldb.apiary.io/#reference/0/characters/list-all-characters">http://docs.marveldb.apiary.io/#reference/0/characters/list-all-characters</a><br/>
				<strong>Github Issue Tracker: </strong><a href="https://github.com/pmauldin/idb/issues">https://github.com/pmauldin/idb/issues</a><br/>
				<strong>Github Repo: </strong><a href="https://github.com/pmauldin/idb">https://github.com/pmauldin/idb</a><br/>
				<div className="aboutHeader">
					Data
				</div>
				<strong>Marvel API: </strong><a href="https://developer.marvel.com/">https://developer.marvel.com/</a><br/>
				The Marvel API made it really easy to get the data we needed. Their object models are very similar to our internal ones,
				so getting the static data was as trivial as searching their API for some instances of the models, copying the JSON, and
				modifying the values a small amount.
				<div className="aboutHeader">
					Tools
				</div>
				For a full rundown of the tools used in this project, refer to the "Technical Report" tab at the top of this page.
			</div>
		)
	}
}