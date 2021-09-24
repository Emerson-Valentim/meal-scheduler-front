import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home } from '../app/Home/Home';

export function MainRouter(): JSX.Element {

	return (
			<Router>
				<Switch>
					<Route path="/">
						<Home />
					</Route>
				</Switch>
			</Router>
	);
}
