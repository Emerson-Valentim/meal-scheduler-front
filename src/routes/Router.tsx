import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Login } from "../app/Login/Login";

import { Counter } from "../features/counter/Counter";


export function MainRouter() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Counter />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}