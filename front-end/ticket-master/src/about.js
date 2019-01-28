import React, {Component} from 'react'
import {Link} from 'react-router-dom'

function About(){
    return (
        <div>
            <h2>About us Page</h2>
            <p>We are an established firm</p>
            <h2>Our team</h2>
            <ul>
            <li key="1"><Link to="/contact/leadership"> Ragu</Link></li>
            <li key="2"><Link to="/contact/leadership"> Ravi</Link></li>
            </ul>
        </div>
    )
}

export default About