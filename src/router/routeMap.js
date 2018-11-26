import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import App from '../App';
import LoginPage from '../containers/login/login'
import TaskHallPage from '../containers/taskHall/taskHall';
import CashPage from '../containers/cash/cash';

class RouteMap extends Component {
  updateHandle() {
      console.log('每次router变化之后都会触发')
  }

  render() {
      return (
           <Router history={this.props.history} onUpdate={this.updateHandle.bind(this)}>
              <Route path='/' component={App}>
                  <Route exact component={TaskHallPage}/>
                  <Route path='cash' component={CashPage}/>
                  <Route path='login/:id' component={LoginPage}/>
              </Route>
          </Router>
      )
  }
}

export default RouteMap
