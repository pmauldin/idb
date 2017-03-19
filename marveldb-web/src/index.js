import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './App';
import Home from './Home';
import Characters from './Characters';
import Comics from './Comics';
import Series from './Series';
import Creators from './Creators';
import './index.css';

ReactDOM.render ((
		<Router history={browserHistory}>
			<Route path="/" component={App}>
				<IndexRoute component={Home} />
				<Route path="/characters" component={Characters} />
				<Route path="/comics" component={Comics} />
				<Route path="/series" component={Series} />
				<Route path="/creators" component={Creators} />
			</Route>
		</Router>
	), document.getElementById('root')
);
