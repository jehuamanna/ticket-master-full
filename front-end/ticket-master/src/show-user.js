import React from 'react'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'

class ShowUser extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: '',
            loading: false
        }
    }


    // componentDidMount(){
    //     const id = this.props.match.params.id
    //     axios.get(`https://jsonplaceholder.typicode.com/users/${id}`).then(response => {
    //         this.setState({
    //             user: response.data,
    //             loading: false
    //         })
    //     })
    // }

    render () {
        console.log(this.props)
        let id, email,username
        if(this.props.location.state){
            const {state} = this.props.location
            id = state.id
            email = state.email
            username = state.username
        }
        else{
            return <Redirect to='/404'/>
        }
        return(
            <div>
                <h2> User Detail</h2>
                {
                    this.state.loading
                    ? <p>Loading</p>
                    : <div>
                    <p>id - {id}</p>
                    <p>email - {email}</p>
                    <p>username - {username}</p>
                    <Link to="/users" >back</Link>
                    </div>
                }
            </div>
        )
    }
}

export default ShowUser