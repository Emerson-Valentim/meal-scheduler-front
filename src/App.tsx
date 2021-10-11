import React from 'react'

import './App.css'
import { MainRouter } from './routes/Router'
import { AlertBox } from './components/AlertBox/AlertBox'
import { Loading } from './components/Loading/Loading'
import { Modal } from './components/Modal/Modal'

function App(): JSX.Element {
  return (
    <div className="App">
      <AlertBox/>
      <Loading/>
      <Modal/>
      <MainRouter/>
    </div>
  )
}

export default App
