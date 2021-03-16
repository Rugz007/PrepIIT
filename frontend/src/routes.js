import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Error404 } from './components/Errors/Error404';
import { TestIntruction } from './components/Test/TestIntruction';
import { Login } from './views/Auth/Login';
import { Register } from './views/Auth/Register';
import { BlogList } from './views/Blog/BlogList';
import { BlogPage } from './views/Blog/BlogPage';
import { Dashboard } from './views/Dashboard/Dashboard';
import { About } from './views/HomePage/About';
import { Contact } from './views/HomePage/Contact';
import { Courses } from './views/HomePage/Courses';
import { FAQ } from './views/HomePage/FAQ';
import { HomePage } from './views/HomePage/HomePage';
import { Test } from './views/Test/Test';
import { TestAnalysis } from './views/Analysis/TestAnalysis';
import { TestsPage } from './views/Test/TestsPage';

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
                <Route path='/test' component={Test}/>
                <Route path='/mytests' component={TestsPage}/>
                <Route path='/testintruction' component={TestIntruction}/>
                <Route path='/testanalysis' component={TestAnalysis} />
                <Route path='/blogs' exact component={BlogList} />
                <Route path='/blogs/:id' component={BlogPage} />
                <Route component={Error404} />
            </Switch>
        );

    }
}
export default Routes;