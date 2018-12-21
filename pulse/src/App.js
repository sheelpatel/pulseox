import React, {Component} from "react";

import {
    BrowserRouter as Router,
    Link, Route, Switch,
} from 'react-router-dom';

import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import {LinkContainer} from "react-router-bootstrap";
import {Nav, Navbar, NavItem} from "react-bootstrap";

import Reducers from './lib/reducers';


import LandingScene from "./scenes/LandingScene";
import LoginScene from "./scenes/LoginScene";
import SignupScene from "./scenes/SignupScene";
import UserProfile from "./scenes/UserProfile";
import PageNotFoundScene from "./scenes/PageNotFoundScene";
import AppliedRoute from './components/AppliedRoute';
import './App.css';

const store = createStore(Reducers, applyMiddleware(thunk));


class App extends Component {
  constructor(props) {
      super(props);

      this.state = {
      }
    }

    render() {
      const childProps = {

      };
        let page = (<div className="App container">
            <Navbar fluid>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">Home</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle/>
                </Navbar.Header>
                <Nav pullRight>
                  <React.Fragment>
                    <LinkContainer to="/signup">
                        <NavItem>Signup</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/login">
                        <NavItem>Login</NavItem>
                    </LinkContainer>
                  </React.Fragment>
                </Nav>

            </Navbar>
            <Switch>
                <AppliedRoute path="/" exact component={LandingScene} props={childProps}/>
                <AppliedRoute path="/login" exact component={LoginScene} props={childProps}/>
                <AppliedRoute path="/userprofile" exact component={UserProfile} props={childProps}/>
                <AppliedRoute path="/signup" exact component={SignupScene} props={childProps}/>
                <Route component={PageNotFoundScene}/>
            </Switch>
        </div>

    );


        return (
            <Provider store={store}>
                <Router>
                    {page}
                </Router>
            </Provider>
        );
    }
}

export default App;
