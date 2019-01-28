import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

class Api extends React.Component{
    constructor() {
        super()
        this.state = {
            users:[]
        }
    }

    componentDidMount() {
        axios.get('http://jsonplaceholder.typicode.com/users').then(response =>{
            this.setState({
                users: response.data
            })
        })
    }
    render() {
        return (
            <div>
                <ul>
                {this.state.users.map(function(user){
                    return <li key={user.componentDidMount}><Link to={{
                            pathname:`/users/${user.id}`,
                            state:{
                                id:user.id,
                                username:user.username,
                                email:user.email,
                                name:user.name

                            }}
                    }>{user.username}</Link> </li>
                })}

                </ul>
            </div>
        )
    }

}
export default Api