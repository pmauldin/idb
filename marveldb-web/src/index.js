import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Characters from './components/Characters';
import Comics from './components/Comics';
import Series from './components/Series';
import Creators from './components/Creators';
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
