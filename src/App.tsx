import React from 'react'

import './App.css'
import { MainRouter } from './routes/Router'
import { AlertBox } from './components/AlertBox/AlertBox'
import { Loading } from './components/Loading/Loading'

function App() {
  return (
    <div className="App">
      <AlertBox/>
      <Loading/>
      <MainRouter />
    </div>
  )
}

export default App
