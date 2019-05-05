import React, { Component } from 'react';
import './App.css'
import Articles from './containers/Articles'
import ArticleEditForm from './components/ArticleEditForm'
import NotFound from './components/NotFound'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Navbar from './components/Navbar'
import { CurrentUserProvider, CurrentUserConsumer } from './context/CurrentUser.context'
import Verification from './components/Verification';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Home from './components/Home'
import ArticleShow from './components/ArticleShow';
import NewArticleForm from './components/NewArticleForm';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      <CurrentUserConsumer>
        {({ user }) => (
          user ? (
            <Component {...props} />
          ) : (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: props.location }
                }}
              />
            )
        )}
      </CurrentUserConsumer>
    }
  />
)



class App extends Component {

  render() {
    return (
      <Router>
        <CurrentUserProvider>
          <Navbar />
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/login' component={LoginForm} />
              <Route exact path='/register' component={RegisterForm} />
              <Route exact path='/register/verify/:token' component={Verification} />
              <Route exact path='/password_reset' component={ForgotPassword} />
              <Route exact path='/password/reset/:token' component={ResetPassword} />
              <Route exact path='/articles' component={Articles} />
              <Route exact path='/articles/new' component={NewArticleForm} />
              <Route exact path='/articles/:itemId' component={ArticleShow} />
              <PrivateRoute exact path='/articles/edit/:itemId' component={ArticleEditForm} />
              <Route component={NotFound} />
            </Switch>
        </CurrentUserProvider>
      </Router>
    );
  }

}

export default App;
