import React, { useContext } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Login from './LoginComponent';
import Register from './RegisterComponent';
import Dashboard from './DashboardComponent';
import { AuthContext } from '../Context/AuthContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={(props) => {
            return (
                rest.isAuthenticated
                    ? <Component {...props} />
                    : <Redirect to='/' />
            )
        }} />
    )
}

function Main() {
    const authContext = useContext(AuthContext);

    return (
        <Switch>
            <Route exact path='/'>
                <Login />
            </Route>
            <Route path='/register'>
                <Register />
            </Route>
            <PrivateRoute path='/dashboard' component={Dashboard} isAuthenticated={authContext.isAuthenticated} />
        </Switch>
    )
}

export default withRouter(Main);