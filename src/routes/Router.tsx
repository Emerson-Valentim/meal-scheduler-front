import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Login } from '../app/Login/Login';


export function MainRouter(): JSX.Element {
	return (
		<div>
			<Router>
				<Switch>
					<Route path="/">
						<Login />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}
