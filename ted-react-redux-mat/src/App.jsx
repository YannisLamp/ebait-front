import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import MyNavbar from './components/Navbar/Navbar';
import { MyLogin } from './components/Login/Login';
import { HomePage } from './components/HomePage/HomePage';
import Footer from './components/Footer/Footer';

import { PrivateRoute } from './routes'

import './App.scss';

//{!this.state.user && <Redirect to='/login' />}


function App() {
  return (
    <div>
      <MyNavbar/>
      <div className="App">
        {/*<header className="App-header">*/}
          <Switch>
              <PrivateRoute exact path="/" component={HomePage} />
              <Route path="/login" component={MyLogin} />

              

              <PrivateRoute render={() => <Redirect to="/" /> } />
              <Route render={() => <Redirect to="/login"/> } />
          </Switch>
        {/*</header>*/}
        <Footer/>
      </div>
    </div>
  );
}

export default App;
