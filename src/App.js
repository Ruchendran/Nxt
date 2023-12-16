import {Component} from 'react'

import {BrowserRouter, Switch, Route} from 'react-router-dom'

import Login from './components/Login'

import Home from './components/Home'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={Login} />

          <Route exact path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
