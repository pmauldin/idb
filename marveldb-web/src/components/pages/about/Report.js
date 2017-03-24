import React, { Component } from 'react';

export default class Report extends Component {
	render() {
		return (
			<div className="aboutContainer">
				<h1>SuperHeroFanClub</h1>
				<ul>
					<li>Peter Mauldin</li>
					<li>Tirey Morris</li>
					<li>Charles Gong</li>
					<li>Edward Bigelow</li>
					<li>Christiano Contreras</li>
					<li>Jorge Zapien-Diaz</li>
				</ul>
				<h3>Table of Contents</h3>
				<ul>
					<li><a href="#intro">Introduction</a></li>
					<li><a href="#design">Design</a></li>
					<ul>
						<li><a href="#app">app.py</a></li>
						<li><a href="#dataSource">The Data Source</a></li>
						<li><a href="#http">The HTTP Methods</a></li>
						<li><a href="#deploymeny">The Deployment</a></li>
					</ul>
					<li><a href="#tools">Tools</a></li>
						<ul>
							<li><a href="#front">Front-End</a></li>
								<ul>
									<li><a href="#overview">Overview</a></li>
									<li><a href="#structure">Structure and Navigation</a></li>
									<ul>
										<li><a href="#basic">Basic Site Structure</a></li>
										<li><a href="#pageTypes">Page Types</a></li>
										<li><a href="#navigation">Navigation</a></li>
										<li><a href="#frameworks">Frameworks</a></li>
									</ul>
								</ul>
							<li><a href="#back">Back-End</a></li>
								<ul>
									<li><a href="#backOverview">Overview</a></li>
									<li><a href="#backStructure">Database Models/Structure</a></li>
									<ul>
										<li><a href="#character">Character</a></li>
										<li><a href="#comic">Comic</a></li>
										<li><a href="#creator">Creator</a></li>
										<li><a href="#series">Series</a></li>
									</ul>
									<li><a href="#relationships">Relationships of Database Models</a></li>
									<li><a href="#unit">Unit Testing</a></li>
									<li><a href="#googleSDK">Google Cloud SDK</a></li>
									<li><a href="#npm">NPM and Forever</a></li>
								</ul>
						</ul>
					<li><a href="#hosting">Hosting</a></li>
						<ul>
							<li><a href="#gcp">Google Cloud Platform (GCP)</a></li>
								<ul>
									<li><a href="#appEngine">App Engine</a></li>
									<li><a href="#computeEngine">Compute Engine</a></li>
								</ul>
							<li><a href="#domain">Domain Name</a></li>
						</ul>
				</ul>
				<h2 id="intro">Introduction</h2>
				This Marvel database exists to provide more detailed information for comic readers. Readers of Marvel comics can explore this database to learn more about the series the comic is apart of, the characters in the comic, and the creators of the series/comic. For those new to Marvel comics, this database can provide a way for people to learn more about the characters in their favorite comic or other comics that the character shows up in.
				<h2 id="design">Design</h2>
					<h3 id="app">app.py</h3>
					The meat of the RESTful API. This is where the API methods are declared, defined, and routed to their URLs so each request can be mapped to the correct method. This is fully implemented with the Flask framework.
					<h3 id="dataSource">The Data Source</h3>
					For this phase of the project, a fully working database is not required but the data must come from somewhere. First the data for characters, comics, creators, and series are scraped from the official Marvel API. Then that data is stored inside data.py. To get this data to app.py, a helper is used. Data_machine.py takes the data from data.py and provides them to app.py to use. App.py turns the data into JSON form and returns them as the response to the respective callers.
					<h3 id="http">The HTTP Methods</h3>
					The hostname for the API is developer.marveldbs.me and the resources can be requested at the endpoint /api/*, where */ can be character, comics, creators, or series. Right now there are a total of four GET methods:
					<ul>
						<li><a href="http://developer.marveldbs.me/api/characters">http://developer.marveldbs.me/api/characters</a></li>
						<ul><li>Returns the character resource, giving the callers the data for all characters in the database.</li></ul>
						<li><a href="http://developer.marveldbs.me/api/comics">http://developer.marveldbs.me/api/comics</a></li>
						<ul><li>Returns the comics resource, giving the callers the data for all comics in the database.</li></ul>
						<li><a href="http://developer.marveldbs.me/api/creators">http://developer.marveldbs.me/api/creators</a></li>
						<ul><li>Returns the creators resource, giving the callers the data for all creators in the database.</li></ul>
						<li><a href="http://developer.marveldbs.me/api/series">http://developer.marveldbs.me/api/series</a></li>
						<ul><li>Returns the series resource, giving the callers the data for all series in the database.</li></ul>
					</ul>
					<h3 id="deployment">The Deployment</h3>
					To get the API up and running, the application must be deployed on a public server. The public server used for this API is hosted on the App Engine in Google Cloud Platform. Configurations were defined in the app.yaml file and dependencies are defined in the requirements.txt file.
				<h2 id="tools">Tools</h2>
					<h3 id="front">Front-End</h3>
						<h4 id="overview">Overview</h4>
						The frontend for MarvelDB is written in JavaScript (ECMAScript 6), HTML5, and CSS3, utilizing a number of frameworks to achieve code reuse, readability, and state management. The site was designed with a page hierarchy in mind, so that navigating between comics, creators, series, and characters is as generic and intuitive as possible.
						<h4 id="structure">Structure and Navigation</h4>
						<ul>
							<li id="basic">Basic Site Structure</li>
							<ul><li>Each page is separated into two main sections: a navigation bar filling a small portion of the top of the page, and a content pane filling the rest of the page. The actual content in this pane is what varies between pages of the site. The routing is done via the react-router framework and implemented in index.js.</li></ul>
							<li id="pageTypes">Page Types</li>
							<ul><li>All pages on the site except the Home and About page can be categorized as either a Grid Page or Details Page. The Home page simply renders a carousel that fills the entire content pane, and cycles between three static images. The About page contains two tabs: the left opens a project summary with a thumbnail and biographic/logistic information for each contributor to the project; the right renders this technical report. Each Grid Page contains a responsive grid of items, each of which contains a.) a summary of the information available for each item, and b.) a link to a Details page. Each Details page contains an expanded summary for an individual item, and links to other Details pages (e.g. linking to a comic's creator.)</li></ul>
								<ul>
									<li><strong>Grid Pages: Comics, Characters, Creators, Series</strong></li>
									<li><strong>Details Pages: Comics, Characters, Creators, Series</strong></li>
									<li><strong>Other: Home, About (About Us and Technical Report)Home, About (About Us and Technical Report)</strong></li>
								</ul>
							<li id="navigation">Navigation</li>
							<ul><li>To switch between pages, a user must click on its corresponding link in the top navigation bar. Because full-fledged routing was also implemented, any of the Grid Pages can also be accessed by appending its corresponding route to the page URL. Additionally, Details Pages can be accessed by appending the corresponding ID to a Grid Page's route.</li></ul>
							<li id="frameworks">Frameworks</li>
							<ul>
								<li>Overview</li>
								<ul><li>We used multiple frameworks in this project, each contributing a different feature, and all written for JavaScript client programs.</li></ul>
								<li>React</li>
								<ul><li>A view library for building user interfaces via rendering HTML as a component hierarchy (this hierarchy will be expanded upon later). It utilizes a unique programming language called JSX, an extension of the JavaScript (ES6) language that allows classes (called Components in React) to contain functions that return HTML templates. These HTML templates can render either pure HTML, or additional React Components, to form a limitless hierarchy of React Components. These custom Components (when written well) can also form a library of modular, reusable UI elements, enabling large projects to reuse large amounts of code and styles.</li></ul>
								<li>Redux</li>
								<ul><li>A state containment framework that can be used with or without React, and is an evolution of the Flux design pattern. As a Flux-like framework, Redux allows developers to visualize an app as a state machine, where a single source of truth (called the Store in Flux and Redux parlance) is the only container of application state. Therefore, in order to render dynamic data, Components "subscribe" to the store (via a helper library called React-Redux), and automatically update their own state when the state of the store changes. The only way for a Component to change the application's state (e.g. submitting a form, sorting a grid of items, etc.) is to send a message to the store describing the operation in question - formally, this message is called an Action. The Store then responds to these Actions using a predefined set of functions, called Reducers, which modify application state inside the store. Finally, a re-render is triggered inside the subscriber Components, which update their views using the new application state. In essence, this approach allows Components to (when written with this paradigm in mind) become easily-debuggable functions of application state. Because all application state is kept in the Store, and all changes to the Store occur through Actions and Reducers, the application developer can be keenly aware at all times of where in the application (both in the code and in the UI) changes to the state are made.</li></ul>
								<li>Bootstrap</li>
								<ul><li>A collection of CSS classes that abstract away common design choices into short class names. Since we chose to implement our UI with React, a natural choice for integrating Bootstrap into the UI was React-Bootstrap, a library of reusable React Components.</li></ul>
								<li>Axios</li>
								<ul><li>An HTTP request library that implements JavaScript Promises for its asynchronous requests. Any request library would be sufficient for accessing our backend API, but the addition of Promises makes code written with Axios much more readable than the nested callbacks typical of old-school asynchronous requests.</li></ul>
								<li>React-Router</li>
								<ul><li>React-Router is a React-specific JavaScript framework for handling client-side routing. Although client-side routing wasn't an explicit part of the specification for this application, its inclusion allows for viewing the frontend and backend of the site as two entirely different entities - this is in contrast to the typical approach of rendering the entry point to the frontend on the server side (e.g. via Flask's render_template method).</li></ul>
							</ul>
						</ul>
					<h3 id="back">Back-End</h3>
						<h4 id="backOverview">Overview</h4>
						The backend is implemented using Flask and SQLAlchemy in python 3.4. For the first phase of this project, the database remains only partially implemented. That is, only the database models have been created. Unit tests have also been written to test each model. The data being used for this project is pulled from Marvel’s database using their developer API/tools, also known as Marvel Comics API (<a href="https://developer.marvel.com/">https://developer.marvel.com/</a>).
						<h4 id="backStructure">Database Models/Structure</h4>
						There are four models:
						<ul>
							<li id="character">Character</li>
								<ul>
									<li>This model will be used to store/represent data for each marvel character. Character is a user-defined Python class where it is associated with a database table. Each Character instance is associated with a row of the Character database table. Characters have a unique ID, an English name, a description (typically a long biographical block of text), a link to a thumbnail, a link to a wikipedia-like page, a link to their official Marvel page, a list of the IDs of all the comics they appear in, the number of comics they appear in, a list of IDs of series they appear in, and the number of series they appear in.</li>
								</ul>
							<li id="comic">Comic</li>
								<ul>
									<li>This model will be used to store/represent data for each marvel comic. Comic is a user-defined Python class where it is associated with a database table. Each Comic instance is associated with a row of the Comic database table. Comics have a unique ID, an English title, an issue number, a description (typically a long summary), a "format" (trade paperback, volume, single issue, etc.), page count, the price of a digital copy of the comic, the price of a print copy, the release date, a comma-separated string/list of links to relevant images, a link to a thumbnail, a link to a wikipedia-like page, the ID of the series the comic appears in, a list of IDs of characters appearing in the comic, the number of characters appearing in the comic, a list of IDs of creators who contributed, and the number of creators who contributed.</li>
								</ul>
							<li id="creator">Creator</li>
								<ul>
									<li>This model will be used to store/represent data for each marvel comic. Creator  is a user-defined Python class where it is associated with a database table. Each Creator instance is associated with a row of the Creator database table. Characters have a unique ID, an English name, a link to a thumbnail (either a picture of the Creator or a comic they contributed to), a link to their official Marvel page, a list of the IDs of all the comics they contributed to, the number of comics they contributed to, a list of IDs of series they contributed to, and the number of series they contributed to.</li>
								</ul>
							<li id="series">Series</li>
								<ul>
									<li>This model will be used to store/represent data for each marvel series. Series is a user-defined Python class where it is associated with a database table. Each Series instance is associated with a row of the Series database table. Series have a unique ID, an English title, a description (typically a long summary), a start year, an end year, an ESRB rating, a link to a thumbnail, a link to their official Marvel page, the ID of the series that preceded it, the ID of the series that succeeds it, a list of the IDs of all the comics appearing in it, the number of comics appearing in it, a list of IDs of creators who contributed to it, and the total number of creators who contributed to it</li>
								</ul>
						</ul>
						<h4 id="unit">Unit Testing</h4>
						<ul><li>For this phase, since the database isn’t fully implemented, the unit tests cannot effectively test for querying a database for models. However is was still possible to test for correctness of model instantiation. This was done by instantiating a model object (e.g. Character, Comic, etc.) with sampled data as arguments. Then, each attribute value in the newly created object was compared to the actual data that was used to instantiate the object; this is excluding data that would form relationships between models. This procedure was followed for each model. The sample data used for testing was pulled from the Marvel Developer website and is stored as a list of python dictionaries in a separate file (data.py)</li></ul>
						<h4 id="googleSDK">Google Cloud SDK</h4>
						<ul><li>This necessary tool makes the use of deploying and using Google Cloud Platform easy and quick. It was used to deploy code directly from local environments through the command line. It was also used to initialize and manage projects, create virtual machines, and switch access from user to user.</li></ul>
						<h4 id="npm">NPM and Forever</h4>
						<ul><li>The node package manager is necessary to run, manage, and deploy Node.js applications. This tool made it possible to get the front end application running. Forever is a tool to keep the application running continuously even when the shell is no longer in use. As long as the machine is up and running so will the application. Forever was also configured to restart the application when the machine is restarted or the application goes down unexpectedly.
						</li></ul>
				<h2 id="hosting">Hosting</h2>
					<h3 id="gcp">Google Cloud Platform</h3>
					<ul>
						<li>MarvelDB is completely hosted on Google Cloud Platform. It was chosen for its reliability, flexibility, and good documentation on how to go about setting up an application host. MarvelDB is comprised of two entities: the front end and the back end. The front end is run completely in Google App Engine and the back end is run completely in Google Compute Engine.</li>
						<ul>
							<li id="appEngine">App Engine</li>
								<ul><li>The App Engine hosts the API and requires a few files to work. These files include app.yaml, appengine_config.py, and requirements.txt. In order to set up the App Engine, a few things has to happen. First, the app.yaml file must be created to let the machine know what type of code is running. It specifies the language as Python and the startup script as app.py. There are much more options available but these are the most necessary ones. Next, the dependencies must be included. The requirements.txt file lists all the tools used in the application. Then, the Google Cloud SDK (gcloud) is used to install all the tools inside a lib directory. The appengine_config.py file is used by Google App Engine to determine where the dependencies are so they can be included in the build. After that the application can be deployed through the command line with gcloud and it becomes up and running through a domain name. When a new change is made, it can be deployed locally using the gcloud command, overriding the previous version of the App Engine.</li></ul>
							<li id="compute">Compute Engine</li>
								<ul><li>The Compute Engine hosts the front end application for MarvelDB. No extra files were needed to set up the compute engine. A virtual machine, running Ubuntu 14.04 was made in the compute engine with mostly default options. The proper tools had to be installed in the newly created virtual machine and then the actual application could be run. Git is used to manage the application and deploy onto these virtual machines. The application is kept up running with npm and forever, two Node.js tools used for servers. Whenever changes are made to the front end application, these changes need to be updated on the server. First the current running front end application must be stopped. Then newly created changes is pulled from Git on the virtual machine. Finally, the new application is restarted with forever and npm, and is kept running again.</li></ul>
						</ul>
					</ul>
					<h3 id="domain">Domain Name</h3>
					<ul><li>The given IP addresses for the virtual machine in the Compute Engine and App Engine were mapped to a purchased domain name from Namecheap.com. The API was given the subdomain developer.marveldbs.me to do this, a DNS record had to be created in Namecheap, which was verified through G Suite. The CNAME record mapped the subdomain developer.marveldbs.me to the given domain of the App Engine. The website was given the domain marveldbs.me. The A record mapped marveldbs.me to the IP address of the virtual machine and the CNAME record mapped the subdomain www.marveldbs.me to the naked domain marveldbs.me. Also port 80 was forwarded to port 3000, the port of the front end application so clients can reach the server.</li></ul>
			</div>
		)
	}
}