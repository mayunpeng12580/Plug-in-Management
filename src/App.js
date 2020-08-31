import React from 'react';

import { Switch, Route, BrowserRouter } from 'react-router-dom'

import Login from './views/login/index'
import Index from './views/index/index'

//私有组件
import PrivateRoute from './components/privateRouter/index'
class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render(h) {
    return (
      <div className='main'>
          <BrowserRouter>
            <Switch>
              <Route component={ Login } exact   path="/"></Route>
              <PrivateRoute component={ Index }   path="/index"></PrivateRoute>
            </Switch>
          </BrowserRouter>
      </div>
    )
  }
}


export default App;
