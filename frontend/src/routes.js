import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Login } from './views/Auth/Login';
import { Register } from './views/Auth/Register';
import { HomePage } from './views/HomePage/HomePage';

class Routes extends React.Component {
    render() {
        return (
            <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path='/login' component={Login}/>
                <Route path='/register' component={Register} />
            </Switch>
        );

    }
}
export default Routes;