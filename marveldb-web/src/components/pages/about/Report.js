import React, {Component} from 'react';

export default class Report extends Component {
    render() {
        return (
            <div className="reportContainer">
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
                        <li><a href="#oldDataSource">The Old Data Source</a></li>
                        <li><a href="#dataSource">The New Data Source</a></li>
                        <li><a href="#http">The HTTP Methods</a></li>
                        <li><a href="#deployment">The Deployment</a></li>
                        <li><a href="#search">Search Capabilities</a></li>
                        <li><a href="#visualization">API Visualization</a></li>
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
                                <li><a href="#pagination">Pagination</a></li>
                                <li><a href="#sortingfiltering">Sorting/Filtering</a></li>
                            </ul>
                        </ul>
                        <li><a href="#back">Back-End</a></li>
                        <ul>
                            <li><a href="#backOverview">Overview</a></li>
                            <li><a href="#backStructure">Database Models/Structure</a></li>
                            <li><a href="#backPostgres">PostgreSQL</a></li>
                            <ul>
                                <li><a href="#character">Character</a></li>
                                <li><a href="#comic">Comic</a></li>
                                <li><a href="#creator">Creator</a></li>
                                <li><a href="#series">Series</a></li>
                            </ul>
                            <li><a href="#relationships">Relationships of Database Models</a></li>
                            <li><a href="#scraping">Scraping the Marvel API</a></li>
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
                    <li><a href="#stories">User Stories</a></li>
                </ul>
                <h2 id="intro">Introduction</h2>
                MarvelDB is a responsive web application for exploring all things Marvel. This internet database
                provides detailed information for comic readers by presenting comics, characters, creators, and series
                all in one site. Readers of Marvel comics can explore this database to learn more about the series the
                comic is apart of, the characters in the comic, and the creators of the series/comic. For those new to
                Marvel comics, this database can provide a way for people to learn more about the characters in their
                favorite comic or other comics that the character shows up in. Because the application was designed with
                various kinds of users in mind, it is easy to use from any screen size and is simple to navigate.
                <h2 id="design">Design</h2>
                The RESTful API for MarvelDB is written in Python using the Flask framework. The data, provided by the
                Interactive Marvel API, consists of character info, comic info, creator info, and series info. It is
                supplied through HTTP GET calls to our API. There is a model of the database used to store the data, but
                for this phase the database is not used. The API is hosted on Google Cloud Platform using the App
                Engine.
                <h3 id="app">app.py</h3>
                The meat of the RESTful API. This is where the API methods are declared, defined, and routed to their
                URLs so each request can be mapped to the correct method. This is fully implemented with the Flask
                framework. We use the flask_cors library to allow Cross Origin Requests; this was necessary to allow
                the react front-end library "axios" to communicate with the back-end flask server.
                <h3 id="oldDataSource">The Old Data Source</h3>
                For the first phase of the project, a fully working database was not required but the data needed to
                come from somewhere. First the data for characters, comics, creators, and series were scraped from the
                official Marvel API. Then that data was stored inside data.py. To get this data to app.py, a helper was
                used. Data_machine.py took the data from data.py and provided them to app.py to use. App.py turned the
                data into JSON form and returned them as the response to the respective callers.
                <h3 id="dataSource">The New Data Source</h3>
                For the past data source, dummy data was used to give users a demo of the website. The new data source
                uses a fully functioning PostgreSQL database to store its data and query data from. The data from the
                interactive Marvel API is scraped and only a few data is stored into the new database. The API then
                queries the database and returns that data to the request caller.
                <h3 id="http">The HTTP Methods</h3>
                The hostname for the API is developer.marveldbs.me and the resources can be requested at the endpoint
                /api/*, where */ can be character, comics, creators, or series. Right now there are a total of four GET
                methods:
                <ul>
                    <li><a href="http://developer.marveldbs.me/api/characters">http://developer.marveldbs.me/api/characters</a>
                    </li>
                    <ul>
                        <li>Returns the character resource, giving the callers the data for all characters in the
                            database. This model contains things such as: name of the character, the issues they've
                            appeared in, a description of the character, and a thumbnail of the character.
                        </li>
                    </ul>
                    <li><a href="http://developer.marveldbs.me/api/characters/count">http://developer.marveldbs.me/api/characters/count</a>
                    </li>
                    <ul>
                        <li>This returns the character resource count, giving the total number of characters in the
                            database.
                        </li>
                    </ul>
                    <li><a href="http://developer.marveldbs.me/api/comics">http://developer.marveldbs.me/api/comics</a>
                    </li>
                    <ul>
                        <li>Returns the comics resource, giving the callers the data for all comics in the database.
                            This model contains things such as: name of the comic, the series it's a part of (if
                            applicable), a description of the comic's plot, and a thumbnail of the comic's cover.
                        </li>
                    </ul>
                    <li><a href="http://developer.marveldbs.me/api/comics/count">http://developer.marveldbs.me/api/comics/count</a>
                    </li>
                    <ul>
                        <li>This returns the comic resource count, giving the total number of comics in the database.
                        </li>
                    </ul>
                    <li><a
                        href="http://developer.marveldbs.me/api/creators">http://developer.marveldbs.me/api/creators</a>
                    </li>
                    <ul>
                        <li>Returns the creators resource, giving the callers the data for all creators in the
                            database. This model contains things such as: the creator's name, the number of comics
                            they've been involved in, and a thumbnail of the creator.
                        </li>
                    </ul>
                    <li><a href="http://developer.marveldbs.me/api/creators/count">http://developer.marveldbs.me/api/creators/count</a>
                    </li>
                    <ul>
                        <li>This returns the creator resource count, giving the total number of creators in the
                            database.
                        </li>
                    </ul>
                    <li><a href="http://developer.marveldbs.me/api/series">http://developer.marveldbs.me/api/series</a>
                    </li>
                    <ul>
                        <li>Returns the series resource, giving the callers the data for all series in the database.
                            This model contains things such as: name of the series, a description of the series, the
                            number of comics in the series, and a thumbnail of the series.
                        </li>
                    </ul>
                    <li><a href="http://developer.marveldbs.me/api/series/count">http://developer.marveldbs.me/api/series/count</a>
                    </li>
                    <ul>
                        <li>This returns the series resource count, giving the total number of series in the database.
                        </li>
                    </ul>
                    <li><a href="http://developer.marveldbs.me/api/test">http://developer.marveldbs.me/api/test</a></li>
                    <ul>
                        <li>This endpoint is used to run the unit tests for the database models. It takes no parameters
                            and returns a string response of the test outputs.
                        </li>
                    </ul>
                </ul>
                The endpoints that do not end in ‘/count’ can take the following parameters: page size, page number,
                sorting field, sort order, filter field, comparator, and filter value. When these methods are called,
                the database should be queried. These are implemented along with filtering, sorting, and pagination for
                customization of data returned, so only the required data from the given parameters will be returned.
                All of the data is returned in JSON for ease of parsing for information.
                <h3 id="deployment">The Deployment</h3>
                To get the API up and running, the application must be deployed on a public server. The public server
                used for this API is hosted on the App Engine in Google Cloud Platform. Configurations were defined in
                the app.yaml file and dependencies are defined in the requirements.txt file. In order to get code
                changes live on the production servers, we had to SSH in to the provided Google Cloud Platform machines
                and pull the changes from the github repos. Then, both the node and flask servers were enabled with
                hot reloading functionality, automatically deploying the changed codebase.
                <h3 id="search">Search Capabilities</h3>
                Search capability was added to give users a more refined view of the website application. Instead of
                showing users all the data in the database, it is now possible for users to search for a specific
                superhero, comic, series, or creator by name or a part of its description. This was implemented with a
                single API endpoint called ‘/search.’ This API function calls the search_term query in the backend. This
                function queries the whole database for results that matches the term that is being searched for. The
                ‘ILIKE’ clause from PostgreSQL is used to match any column with data that contains the term being
                searched for. The query first queries through the characters table, then it queries the comics table,
                then the creators table, and last but not least the series table. It then gathers all the data and
                returns a JSON structure back to the caller of the API. Of course the search can be limited to how much
                data can be returned. This allows pagination for the search and results page on the front end.
                <h3 id="visualization">API Visualization</h3>
                Creating a visualization for <a href="http://www.SWEatshop.tech/">SWEatshop.tech</a> provided many
                challenges. First and foremost was having to learn the d3 chart library. This was made especially
                difficult as it does not play nice with the React workflow very well. Eventually, we were able to find
                the react-d3-basic library which made this task much easier, by providing a nice abstraction for
                creating and displaying charts. Another challenge was integrating the other team's API, as it would
                frequently go down and return 500 errors, as well as not allowing CORS requests. This was fixed when
                we were able to get into contact with one of their team members and they added a fix for the cross
                origin requests. In the end, we were able to display a representation of their data that wasn't
                readily available on their website: Showing a breakdown of the top 10 companies in their dataset with
                the most funding.
                <h2 id="tools">Tools</h2>
                <h3 id="front">Front-End</h3>
                <h4 id="overview">Overview</h4>
                The frontend for MarvelDB is written in JavaScript (ECMAScript 6), HTML5, and CSS3, utilizing a number
                of frameworks to achieve code reuse, readability, and state management. The site was designed with a
                page hierarchy in mind, so that navigating between comics, creators, series, and characters is as
                generic and intuitive as possible.
                <h4 id="structure">Structure and Navigation</h4>
                <ul>
                    <li id="basic">Basic Site Structure</li>
                    <ul>
                        <li>Each page is separated into two main sections: a navigation bar filling a small portion of
                            the top of the page, and a content pane filling the rest of the page. The actual content in
                            this pane is what varies between pages of the site. The routing is done via the react-router
                            framework and implemented in index.js.
                        </li>
                    </ul>
                    <li id="pageTypes">Page Types</li>
                    <ul>
                        <li>All pages on the site except the Home and About page can be categorized as either a Grid
                            Page or Details Page. The Home page simply renders a carousel that fills the entire content
                            pane, and cycles between three static images. The About page contains two tabs: the left
                            opens a project summary with a thumbnail and biographic/logistic information for each
                            contributor to the project; the right renders this technical report. Each Grid Page contains
                            a responsive grid of items, each of which contains a.) a summary of the information
                            available for each item, and b.) a link to a Details page. Each Details page contains an
                            expanded summary for an individual item, and links to other Details pages (e.g. linking to a
                            comic's creator.)
                        </li>
                    </ul>
                    <ul>
                        <li><strong>Grid Pages:</strong> Comics, Characters, Creators, Series</li>
                        <li><strong>Details Pages:</strong> Comics, Characters, Creators, Series</li>
                        <li><strong>Other:</strong> Home, About (About Us and Technical Report), Visualization</li>
                    </ul>
                    <li id="navigation">Navigation</li>
                    <ul>
                        <li>To switch between pages, a user must click on its corresponding link in the top navigation
                            bar. Because full-fledged routing was also implemented, any of the Grid Pages can also be
                            accessed by appending its corresponding route to the page URL. Additionally, Details Pages
                            can be accessed by appending the corresponding ID to a Grid Page's route.
                        </li>
                    </ul>
                    <li id="frameworks">Frameworks</li>
                    <ul>
                        <li>Overview</li>
                        <ul>
                            <li>We used multiple frameworks in this project, each contributing a different feature, and
                                all written for JavaScript client programs. Most had very useful documentation and
                                overall likely saved hundreds of hours of development and bug-hunting time.
                            </li>
                        </ul>
                        <li>React</li>
                        <ul>
                            <li>A view library for building user interfaces via rendering HTML as a component hierarchy
                                (this hierarchy will be expanded upon later). It utilizes a unique programming language
                                called JSX, an extension of the JavaScript (ES6) language that allows classes (called
                                Components in React) to contain functions that return HTML templates. These HTML
                                templates can render either pure HTML, or additional React Components, to form a
                                limitless hierarchy of React Components. These custom Components (when written well) can
                                also form a library of modular, reusable UI elements, enabling large projects to reuse
                                large amounts of code and styles.
                            </li>
                        </ul>
                        <li>Redux</li>
                        <ul>
                            <li>A state containment framework that can be used with or without React, and is an
                                evolution of the Flux design pattern. As a Flux-like framework, Redux allows developers
                                to visualize an app as a state machine, where a single source of truth (called the Store
                                in Flux and Redux parlance) is the only container of application state. Therefore, in
                                order to render dynamic data, Components "subscribe" to the store (via a helper library
                                called React-Redux), and automatically update their own state when the state of the
                                store changes. The only way for a Component to change the application's state (e.g.
                                submitting a form, sorting a grid of items, etc.) is to send a message to the store
                                describing the operation in question - formally, this message is called an Action. The
                                Store then responds to these Actions using a predefined set of functions, called
                                Reducers, which modify application state inside the store. Finally, a re-render is
                                triggered inside the subscriber Components, which update their views using the new
                                application state. In essence, this approach allows Components to (when written with
                                this paradigm in mind) become easily-debuggable functions of application state. Because
                                all application state is kept in the Store, and all changes to the Store occur through
                                Actions and Reducers, the application developer can be keenly aware at all times of
                                where in the application (both in the code and in the UI) changes to the state are made.
                            </li>
                        </ul>
                        <li>Bootstrap</li>
                        <ul>
                            <li>A collection of CSS classes that abstract away common design choices into short class
                                names. Since we chose to implement our UI with React, a natural choice for integrating
                                Bootstrap into the UI was React-Bootstrap, a library of reusable React Components. We
                                made heavy use of bootstrap styling throughout the entire website, saving hours and
                                hours of development time while also making the website look clean and professional.
                            </li>
                        </ul>
                        <li>Axios</li>
                        <ul>
                            <li>An HTTP request library that implements JavaScript Promises for its asynchronous
                                requests. Any request library would be sufficient for accessing our backend API, but the
                                addition of Promises makes code written with Axios much more readable than the nested
                                callbacks typical of old-school asynchronous requests. The axios library also helped
                                by abstracting a lot of the HTTP request details, such as url encoding of parameters.
                            </li>
                        </ul>
                        <li>React-Router</li>
                        <ul>
                            <li>React-Router is a React-specific JavaScript framework for handling client-side routing.
                                Although client-side routing wasn't an explicit part of the specification for this
                                application, its inclusion allows for viewing the frontend and backend of the site as
                                two entirely different entities - this is in contrast to the typical approach of
                                rendering the entry point to the frontend on the server side (e.g. via Flask's
                                render_template method).
                            </li>
                        </ul>
                        <li>React-d3-basic</li>
                        <ul>
                            <li>React-d3-basic is a library that simplifies the use of d3 charts with React components.
                                This library abstracted away a lot the implementation details behind writing charts in
                                vanilla d3.js; instead, we could define the data for our chart in a javascript object
                                and pass it down to the provided "PieChart" react component. This made it quite easy
                                to just write a map function that took the data provided by SWEatshop.tech and producing
                                output that could be inserted into the d3 pie chart.
                            </li>
                        </ul>
                    </ul>
                    <li id="pagination">Pagination</li>
                    <ul>
                        <li>Phase 2 required our group to think more strategically about displaying and manipulating
                            large amounts of data. Although it would be technically feasible to load thousands of
                            resources (comics, characters, etc) at once from the backend, this would impact the user
                            experience in multiple ways: first, the user shouldn't be expected to scroll through
                            thousands of comics in order to browse the full gamut of results; second, waiting multiple
                            seconds for the entire collection of results to come back from the API and render on the
                            page creates an uncomfortable delay for the user. The solution to this issue was to
                            implement pagination (on the frontend as well as the backend), which allows the user to view
                            a subset - 10 items, by default - of the entire dataset. React-bootstrap conveniently
                            provides a Pagination component, which we hooked into our dataflow relatively easy, with
                            only minor customization. Navigating among the pages is intuitive and follows the pattern
                            typical of pagination in most websites - the user simply needs to click left or right to
                            navigate forward or backward among the pages. For convenience, we also included two buttons
                            for quickly accessing the first and last pages
                        </li>
                    </ul>
                    <li id="sortingfiltering">Sorting/Filtering</li>
                    <ul>
                        <li>As in the case of pagination, Phase 2 required us to adopt a more engineering-centric view
                            on a problem - in this case, the sorting and filtering of results. In Phase 1, all sorting
                            and filtering was done on the frontend, directly prior to the render() call in the results
                            page container component. This solution is fine when operating on small data sets. As a
                            result, it was never apparent during Phase 1 that sorting/filtering of data needed to be
                            implemented differently. However, once we scraped the full Marvel API data set into our
                            database, it was immediately obvious that sorting/filtering would have to be done on the
                            backend to be performant. Once we moved these operations out of the frontend, implementing
                            sorting and filtering became a relatively simple matter of implementing the needed UI
                            components and making the appropriate backend calls.
                        </li>
                    </ul>
                </ul>
                <h3 id="back">Back-End</h3>
                <h4 id="backOverview">Overview</h4>
                The backend is implemented using Flask and SQLAlchemy in python 3.4. For the first phase of this
                project, the database remains only partially implemented. That is, only the database models have been
                created. Unit tests have also been written to test each model. The data being used for this project is
                pulled from Marvel’s database using their developer API/tools, also known as Marvel Comics API (<a
                href="https://developer.marvel.com/">https://developer.marvel.com/</a>).<br/>
                For phase two the database models are represented as table schemas that live within our postgresql
                database. Each row is an instance of each model, and can be queried, and used for testing purposes.
                <h4 id="backPostgres">PostgreSQL</h4>
                The database used to store all the data is PostgreSQL. PostgreSQL complemented well with the sqlalchemy
                framework we used to insert and query data from our database. There were good tutorials on how to use
                sqlalchemy to connect and work with our postgreSQL database. We initially forgot to create indexes for
                the various tables/columns in the database, but we were able to easily add the indexes to the database
                after creation, greatly improving database query performance.
                <h4 id="backStructure">Database Models/Structure</h4>
                There are four models:
                <ul>
                    <li id="character">Character</li>
                    <ul>
                        <li>This model will be used to store/represent data for each marvel character. We make a table
                            schema of all the character attributes and store it into the database. Each row inserted
                            into the table represents a character. Characters have a unique ID, an English name, a
                            description (typically a long biographical block of text), a link to a thumbnail, a link to
                            a wikipedia-like page, a link to their official Marvel page, a list of the IDs of all the
                            comics they appear in, the number of comics they appear in, a list of IDs of series they
                            appear in, and the number of series they appear in.
                        </li>
                    </ul>
                    <li id="comic">Comic</li>
                    <ul>
                        <li>This model will be used to store/represent data for each marvel comic. We make a table
                            schema of all the comic attributes and store it into the database. Each row inserted into
                            the table represents a comic. Comics have a unique ID, an English title, an issue number, a
                            description (typically a long summary), a "format" (trade paperback, volume, single issue,
                            etc.), page count, the price of a digital copy of the comic, the price of a print copy, the
                            release date, a comma-separated string/list of links to relevant images, a link to a
                            thumbnail, a link to a wikipedia-like page, the ID of the series the comic appears in, a
                            list of IDs of characters appearing in the comic, the number of characters appearing in the
                            comic, a list of IDs of creators who contributed, and the number of creators who
                            contributed.
                        </li>
                    </ul>
                    <li id="creator">Creator</li>
                    <ul>
                        <li>This model will be used to store/represent data for each marvel creator. We make a table
                            schema of all the creator attributes and store it into the database. Each row inserted into
                            the table represents a creator. Creators have a unique ID, an English name, a link to a
                            thumbnail (either a picture of the Creator or a comic they contributed to), a link to their
                            official Marvel page, a list of the IDs of all the comics they contributed to, the number of
                            comics they contributed to, a list of IDs of series they contributed to, and the number of
                            series they contributed to.
                        </li>
                    </ul>
                    <li id="series">Series</li>
                    <ul>
                        <li>This model will be used to store/represent data for each marvel series. We make a table
                            schema of all the series attributes and store it into the database. Each row inserted into
                            the table represents a series. Series have a unique ID, an English title, a description
                            (typically a long summary), a start year, an end year, an ESRB rating, a link to a
                            thumbnail, a link to their official Marvel page, the ID of the series that preceded it, the
                            ID of the series that succeeds it, a list of the IDs of all the comics appearing in it, the
                            number of comics appearing in it, a list of IDs of creators who contributed to it, and the
                            total number of creators who contributed to it.
                        </li>
                    </ul>
                </ul>
                <h4 id="scraping">Scraping the Marvel API</h4>
                <ul>
                    <li>To correctly create and set up our API for phase two, we had to scrape data off from a Marvel
                        API and store it into a postgresql database located remotely on our hosting server. The Marvel
                        API is a free to use API with a limit of three thousand requests per day. In all we had to write
                        nine scrapers, four for our models, and five for the association tables that represent the many
                        to many relationships. This scraping was done on a local machine then the database was
                        transported from the local machine to the remote machine hosting the site.
                        <br /><strong>Scraping for Models</strong><br />
                        Each scraper is a python script that sends a HTTP GET request to the Marvel API. The Marvel API
                        lets us specify what piece of data we want. For example if we wanted a json object that contains
                        a list of characters I can send a json request like this.
                        https://gateway.marvel.com:443/v1/public/comics?apikey=d7ddd341e81cf87ce24ba23e95706a62
                        If the request is valid, We get a json object that is always in the same schema form. The data
                        that we are interested in, is inside json_object[“data”][“results”], which contains a list of
                        dictionaries containing information we need for each model.
                        <br /><strong>Scraping for association tables</strong><br />
                        Before we could scrape for the association tables, we had to scrape out data for every model
                        Because every foreign key in the association tables have to exist somewhere else as a primary
                        key.
                        Now to create an association table we had to scrape again for a particular model involved in a
                        many to many relationship, but this time collect a list from the json of the models located in
                        json_object[“data”][“results”][“some list name”] .
                        Afterwards we Look at a particular model, and get a list of some other model instances, and
                        insert into the association table (primary_id, primary_model_id from root of json object,
                        other_model_id from list json_object[“data”][“results”][“some list name”]).
                    </li>
                </ul>
                <h4 id="unit">Unit Testing</h4>
                <ul>
                    <li>For phase 1 of this project, since the database wasn't fully implemented, the unit tests
                        couldn’t effectively test for querying a database. However it was still possible to test for
                        correctness of model instantiation. This was done by instantiating a model object (e.g.
                        Character, Comic, etc.) with sampled data as arguments. Then, each attribute value in the newly
                        created object was compared to the actual data that was used to instantiate the object; this is
                        excluding data that would form relationships between models. This procedure was followed for
                        each model. The sample data used for testing was pulled from the Marvel Developer website and is
                        stored as a list of python dictionaries in a separate file (data.py).
                    </li>
                </ul>
                <ul>
                    <li>For phase two of the project we can now query out of our database and test it against some
                        sample data stored inside data.py. This was done by grabbing a table object for each model that
                        exists within our database, and using those objects to query out rows from the tables, then the
                        row values were tested against the sample data for correctness.
                    </li>
                </ul>
                <h4 id="googleSDK">Google Cloud SDK</h4>
                <ul>
                    <li>This necessary tool makes the use of deploying and using Google Cloud Platform easy and quick.
                        It was used to deploy code directly from local environments through the command line. It was
                        also used to initialize and manage projects, create virtual machines, and switch access from
                        user to user.
                    </li>
                </ul>
                <h4 id="npm">NPM and Forever</h4>
                <ul>
                    <li>The node package manager (or npm, as the development community refers to it) is necessary to
                        run, manage, and deploy Node.js applications. Since the frontend is hosted via an embedded
                        lightweight node server, npm is needed to jointly upgrade and install packages, manage package
                        dependencies, and run scripts (e.g. for deployment or running the development server). NPM and
                        React's hot reloading features made it much easier to deploy new code without disrupting the
                        uptime of the website.
                    </li>
                </ul>
                <ul>
                    <li>Forever is a tool to keep the application running continuously even when the shell is no longer
                        in use. As long as the machine is up and running so will the application. This tool made it
                        possible to get the front end application running. Forever was also configured to restart the
                        application when the machine is restarted or the application goes down unexpectedly.
                        Essentially, Forever allows treating the npm script that runs the frontend as a long-running
                        daemon rather than a traditional process.
                    </li>
                </ul>
                <h2 id="hosting">Hosting</h2>
                <h3 id="gcp">Google Cloud Platform</h3>
                <ul>
                    <li>MarvelDB is completely hosted on Google Cloud Platform. It was chosen for its reliability,
                        flexibility, and good documentation on how to go about setting up an application host. MarvelDB
                        is comprised of two entities: the front end and the back end. The front end is run completely in
                        Google App Engine and the back end is run completely in Google Compute Engine.
                    </li>
                    <ul>
                        <li id="appEngine">App Engine</li>
                        <ul>
                            <li>The App Engine hosts the API and requires a few files to work. These files include
                                app.yaml, appengine_config.py, and requirements.txt. In order to set up the App Engine,
                                a few things has to happen. First, the app.yaml file must be created to let the machine
                                know what type of code is running. It specifies the language as Python and the startup
                                script as app.py. There are much more options available but these are the most necessary
                                ones. Next, the dependencies must be included. The requirements.txt file lists all the
                                tools used in the application. Then, the Google Cloud SDK (gcloud) is used to install
                                all the tools inside a lib directory. The appengine_config.py file is used by Google App
                                Engine to determine where the dependencies are so they can be included in the build.
                                After that the application can be deployed through the command line with gcloud and it
                                becomes up and running through a domain name. When a new change is made, it can be
                                deployed locally using the gcloud command, overriding the previous version of the App
                                Engine.
                            </li>
                        </ul>
                        <li id="compute">Compute Engine</li>
                        <ul>
                            <li>The Compute Engine hosts the front end application for MarvelDB. No extra files were
                                needed to set up the compute engine. A virtual machine, running Ubuntu 14.04 was made in
                                the compute engine with mostly default options. The proper tools had to be installed in
                                the newly created virtual machine and then the actual application could be run. Git is
                                used to manage the application and deploy onto these virtual machines. The application
                                is kept up running with npm and forever, two Node.js tools used for servers. Whenever
                                changes are made to the front end application, these changes need to be updated on the
                                server. First the current running front end application must be stopped. Then newly
                                created changes is pulled from Git on the virtual machine. Finally, the new application
                                is restarted with forever and npm, and is kept running again.
                            </li>
                        </ul>
                    </ul>
                </ul>
                <h3 id="domain">Domain Name</h3>
                <ul>
                    <li>The given IP addresses for the virtual machine in the Compute Engine and App Engine were mapped
                        to a purchased domain name from Namecheap.com. The API was given the subdomain
                        developer.marveldbs.me to do this, a DNS record had to be created in Namecheap, which was
                        verified through G Suite. The CNAME record mapped the subdomain developer.marveldbs.me to the
                        given domain of the App Engine. The website was given the domain marveldbs.me. The A record
                        mapped marveldbs.me to the IP address of the virtual machine and the CNAME record mapped the
                        subdomain www.marveldbs.me to the naked domain marveldbs.me. Also port 80 was forwarded to port
                        3000, the port of the front end application so clients can reach the server.
                    </li>
                </ul>
                <h2 id="stories">User Stories</h2>
                We used <a href="http://www.planitpoker.com">planitpoker.com</a> to develop user stories that describe
                common use cases on our websites, come up with tasks that would enable those users, estimate those
                tasks' difficulties, and vote to come up with an accurate estimate for the time commitment that would
                be required for each task.
                <ul>
                    <li className="userStory">"I can easily find the search bar and enter text into the search bar to
                        search for something"
                    </li>
                    <ul>
                        <li><strong>Average Estimated Time:</strong> 45 minutes</li>
                        <li><strong>Actual Time Taken:</strong> 15 minutes</li>
                        <li><strong>Comments:</strong> The actual front-end implementation of the search bar
                            was made very simple by the react-bootstrap library.
                        </li>
                    </ul>
                    <li className="userStory">"When I search for something I want all the results that match that
                        search, no subset,
                        where each page has at least ten results"
                    </li>
                    <ul>
                        <li><strong>Average Estimated Time:</strong> 2 hours 30 minutes</li>
                        <li><strong>Actual Time Taken:</strong> 3 hours</li>
                        <li><strong>Comments:</strong> This took the longest amount of time, but was worth it in the
                            end, as it provided extremely useful functionality.
                        </li>
                    </ul>
                    <li className="userStory">"Id like to click on the search results and be given more information in
                        one form or the other, about the results"
                    </li>
                    <ul>
                        <li><strong>Average Estimated Time:</strong> 45 minutes</li>
                        <li><strong>Actual Time Taken:</strong> 15 minutes</li>
                        <li><strong>Comments:</strong> This was trivial to implement due to the way we had implemented
                            the detail pages in previous phases.
                        </li>
                    </ul>
                    <li className="userStory">"I can access a visualization of sweatshop.tech’s API functionality"</li>
                    <ul>
                        <li><strong>Average Estimated Time:</strong> 3 hours 30 minutes</li>
                        <li><strong>Actual Time Taken:</strong> 3 hours</li>
                        <li><strong>Comments: We were pretty close in our estimation, and the reason this took
                            so long to implement was two-fold: first, inexperience with d3 caused a tough learning
                            curve,
                            especially when integrating it into the React component life-cycle; second, we had several
                            issues utilizing the other group's API, including problems with their API going down
                            and having to resolve Cross-Origin-Request Headers.</strong></li>
                    </ul>
                    <li className="userStory">"I can search for creators by attribute"</li>
                    <ul>
                        <li><strong>Average Estimated Time:</strong> 1 hour</li>
                        <li><strong>Actual Time Taken:</strong> 30 minutes</li>
                        <li><strong>Comments:</strong> Once the overall search feature was fully implemented,
                            extending it to work with the creator models was very simple, if tedious.
                        </li>
                    </ul>
                    <li className="userStory">"I can search for series by attribute"</li>
                    <ul>
                        <li><strong>Average Estimated Time:</strong> 1 hour 30 minutes</li>
                        <li><strong>Actual Time Taken:</strong> 30 minutes</li>
                        <li><strong>Comments:</strong> Once the overall search feature was fully implemented,
                            extending it to work with the creator models was very simple
                        </li>
                    </ul>
                    <li className="userStory">"I can search for characters by attribute"</li>
                    <ul>
                        <li><strong>Average Estimated Time:</strong> 1 hour</li>
                        <li><strong>Actual Time Taken:</strong> 30 minutes</li>
                        <li><strong>Comments:</strong> Once the overall search feature was fully implemented,
                            extending it to work with the creator models was very simple
                        </li>
                    </ul>
                    <li className="userStory">"I can search for comics by attribute"</li>
                    <ul>
                        <li><strong>Average Estimated Time:</strong> 1 hour 30 minutes</li>
                        <li><strong>Actual Time Taken:</strong> 30 minutes</li>
                        <li><strong>Comments:</strong> Once the overall search feature was fully implemented,
                            extending it to work with the creator models was very simple
                        </li>
                    </ul>
                    <li className="userStory">"I'd like my search terms in the results to be highlighted"</li>
                    <ul>
                        <li><strong>Average Estimated Time:</strong> 2 hours 15 minutes</li>
                        <li><strong>Actual Time Taken:</strong> N/A</li>
                        <li><strong>Comments:</strong> We weren't able to finish this before the due date, because
                            it turned out to be much more difficult to implement in React than we anticipated
                        </li>
                    </ul>
                    <li className="userStory">"When I enter multiple words into the search bar, I want two sets of
                        results, the first set of
                        the results matches every word entered, and the second set of
                        results matches at least one word entered"
                    </li>
                    <ul>
                        <li><strong>Average Estimated Time:</strong> 2 hours 30 minutes</li>
                        <li><strong>Actual Time Taken:</strong> N/A</li>
                        <li><strong>Comments:</strong> This ended up being a nightmare to implement, and so we focused
                            on many other, smaller features in that time frame
                        </li>
                    </ul>
                </ul>
            </div>
        )
    }
}