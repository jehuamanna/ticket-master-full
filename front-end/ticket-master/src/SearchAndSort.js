import React from 'react'
import { Button } from 'reactstrap'
import { Progress } from 'reactstrap';

class SearchAndSort extends React.Component {

    constructor() {
        super()
        this.state = {
            formData: [],
            search:'',
            sort : 'all'
        }
        this.handleChange = this.handleChange.bind(this)
        this.clickHandle = this.clickHandle.bind(this)

    }

    handleChange(event) {
        event.persist()
        this.setState({search: event.target.value})
        this.props.search(event.target.value, this.state.sort)
    }

    clickHandle(event){
        console.log(event.target.value)
        this.setState({sort:event.target.value})
        this.props.sort(event.target.value, this.state.search)
    }

    render() {
        return (
            <div>
                <div className="mb-3 mt-2 col-md-3">  
                    <input type="text" placeholder="search" onChange={this.handleChange} className="form-control" />
                </div>
                <Button color="secondary" value="all" onClick={this.clickHandle} name='all'>All</Button> &emsp;
                <Button color="secondary" value="high" onClick={this.clickHandle} name='high'>High</Button>&emsp;
                <Button color="secondary" value="medium" onClick={this.clickHandle} name='medium'>Medium</Button>&emsp;
                <Button color="secondary" value="low" onClick={this.clickHandle} name='low'>Low</Button><br/>&emsp;

                <Progress color="info" value={this.props.progress} />
            </div>
        )
    }
}

export default SearchAndSort