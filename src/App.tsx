import React from 'react';

import logo from './logo.svg';
import './App.css';
import { MainRouter } from './routes/Router';
import { AlertBox } from './components/AlertBox/AlertBox';

function App() {
	return (
		<div className="App">
      <AlertBox/>
			<MainRouter />
		</div>
	);
}

export default App;
