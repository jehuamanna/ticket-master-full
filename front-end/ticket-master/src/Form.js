import React from 'react'
import axios from 'axios'

class Form extends React.Component {
    constructor() {
        super()
        this.state = {
            name: "",
            department: 'hr',
            priority: '',
            message: ''
        }
        this.changeHandle = this.changeHandle.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    changeHandle(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmit(event){
        event.preventDefault()
        const formData = {
            name: this.state.name,
            department: this.state.department,
            priority: this.state.priority,
            message: this.state.message
        }
        console.log(formData)
        // axios.post('http://dct-api-data.herokuapp.com/tickets?api_key=6fc7ce15eecbbb73', formData).then(function(response){
        axios.post('http://localhost:3001/tickets', formData).then(function(response){
                this.props.setData(response.data)
        }.bind(this))

    }

    render() {
        return (
            <div>
                <h2>Add Ticket</h2>
                <form onSubmit={this.onSubmit}>

                <div className="form-group">
                    <label>
                            Name
                            <input type="text" value={this.state.name} onChange={this.changeHandle} name="name" className="form-control" />
                        </label>
                </div>
                  
                <div className="form-group">

                <label>Department
                    <select value={this.state.department} name="department" onChange={this.changeHandle} className="form-control">
                            <option value="sales">sales</option>
                            <option value="hr">hr</option>
                            <option value="technical">technical</option>
                        </select>
                    </label>
                </div>

                

                <div className="form-check form-check-inline">
                    <label className="form-check-label">
                        <input type="radio" name="priority" value="high" onChange={this.changeHandle}className="form-check-input" /> 
                        High
                    </label>
                </div>
                    
                    <input type="radio" name="priority" value="medium" onChange={this.changeHandle}/> Medium
                    <input type="radio" name="priority" value="low" onChange={this.changeHandle}/> Low
                   <br/>

                    <div className="form-group">
                    <label>
                        Message
                        <textarea value={this.state.message} name="message" onChange={this.changeHandle} className="form-control"></textarea>
                    </label>

                    </div>

                    <input type="submit" value="submit" className="btn btn-primary"/>

                </form>
            </div>
        )
    }
}

export default Form