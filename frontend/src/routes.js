import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Error404 } from './components/Errors/Error404';
import { TestIntruction } from './components/Test/TestIntruction';
import { Login } from './views/Auth/Login';
import { Register } from './views/Auth/Register';
import { BlogList } from './views/Blog/BlogList';
import { BlogPage } from './views/Blog/BlogPage';
import { Dashboard } from './views/Dashboard/Dashboard';
import { About } from './views/HomePage/About';
import { Contact } from './views/HomePage/Contact';
import { FAQ } from './views/HomePage/FAQ';
import { HomePage } from './views/HomePage/HomePage';
import { Test } from './views/Test/Test';
import { TestAnalysis } from './views/Analysis/TestAnalysis';
import { TestSubmitted } from './views/Test/TestSubmitted';
import { CourseDescription } from './components/HomePage/CourseDescription';
import { ForgetPassword } from './views/Auth/ForgetPassword';

const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => {
        if(!localStorage.getItem("testid"))
        {
            return <Component />
        }
        else{
            const testID = localStorage.getItem("testid");
            return <Redirect to={"/test/"+testID} />
        }
    }} />
 );
 const ProtectedAuthRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => {
        if(!localStorage.getItem("token") && !localStorage.getItem("testid"))
        {
            return <Component />
        }
        else if(localStorage.getItem("token") && localStorage.getItem("testid"))
        {
            const testID = localStorage.getItem("testid");
            return <Redirect to={"/test/"+testID} />
        }
        else
        {
            return <Redirect to='/dashboard' />
        }
    }} />
 );
 
class Routes extends React.Component {
    render() {
        return (
            <Switch>
                <ProtectedRoute path="/" exact component={HomePage} />
                <ProtectedAuthRoute path='/login' component={Login} />
                <ProtectedAuthRoute path='/forget-password' component={ForgetPassword} />
                <ProtectedAuthRoute path='/register' component={Register} />
                <ProtectedRoute path='/dashboard' component={Dashboard} />
                <ProtectedRoute path='/about' component={About} />
                <ProtectedRoute path='/contact' component={Contact} />
                <ProtectedRoute path='/courses/:course' component={CourseDescription} />
                <ProtectedRoute path='/faq' component={FAQ} />
                <Route path='/test/:id' exact component={Test}/>
                <Route path='/testintruction' component={TestIntruction}/>
                <ProtectedRoute path='/testanalysis' component={TestAnalysis} />
                <Route path='/submitted' component={TestSubmitted} />
                <ProtectedRoute path='/blogs' exact component={BlogList} />
                <ProtectedRoute path='/blogs/:id' component={BlogPage} />
                <Route component={Error404} />
            </Switch>
        );
    }
}
export default Routes;