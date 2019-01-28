import React, { Component } from 'react'
// npm install --save react-router-dom
import { BrowserRouter, Link, Route,Switch } from 'react-router-dom'
import Api from './api'
import Home from './home'
import Contact from './contact'
import About from './about'
import Leadership from './leadership'
import ShowUser from './show-user';
import FourOhFour from './not-found'







class ReactRouter extends Component {
    render() {
        return (
            <BrowserRouter>
                <div >
                    <ul>
                        <li key="1"> <Link to="/"> Home </Link> </li>
                        <li key="2"> <Link to="/about"> About </Link> </li>
                        <li key="3"> <Link to="/contact"> Contact </Link></li>
                        <li key="4"> <Link to="/users"> Users </Link> </li>
                    </ul>
                    <Switch>
                        <Route path="/" component={Home} exact />
                        <Route path="/about" component={About} exact />
                        <Route path="/about" component={Leadership} />
                        <Route path="/contact" component={Contact} />
                        <Route path="/users" component={Api} exact />
                        <Route path="/users/:id" component={ShowUser} />
                        {/* <Route render={()=> {
                            return <h2>404</h2>
                        }}/> */}
                        <Route component={FourOhFour}/>
                    </Switch>

                </div>
            </BrowserRouter>
        )
    }
}

export default ReactRouter