import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Establishment } from '../app/Establishment/Establishment'
import { Home } from '../app/Home/Home'
import { ConfigPanel } from '../app/ConfigPanel/ConfigPanel'

export function MainRouter(): JSX.Element {

  return (
    <Router>
      <Switch>
        <Route path="/panel">
          <ConfigPanel />
        </Route>
        <Route path="/welcome">
          <Establishment />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  )
}
