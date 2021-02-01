import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Login } from './views/Auth/Login';
import { Register } from './views/Auth/Register';
import { Dashboard } from './views/Dashboard/Dashboard';
import { About } from './views/HomePage/About';
import { Contact } from './views/HomePage/Contact';
import { Courses } from './views/HomePage/Courses';
import { FAQ } from './views/HomePage/FAQ';
import { HomePage } from './views/HomePage/HomePage';

class Routes extends React.Component {
    render() {
        return (
            <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path='/login' component={Login} />
                <Route path='/register' component={Register} />
                <Route path='/dashboard' component={Dashboard} />
                <Route path='/about' component={About} />
                <Route path='/contact' component={Contact} />
                <Route path='/courses' component={Courses} />
                <Route path='/faq' component={FAQ} />
            </Switch>
        );

    }
}
export default Routes;