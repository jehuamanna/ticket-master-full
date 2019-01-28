import React from 'react'

export default class TableRow extends React.Component {

    constructor(){
        super()
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event){
        this.props.statusChange(event.target.name, event.target.value)

    }


    render() {
        let data = this.props.data
        return (    < tbody >
            {
                this.props.tickets.map(function (data) {
                    return (<tr key={data.ticket_code}>
                        <td>{data.ticket_code}</td>
                        <td>{data.name}</td>
                        <td>{data.department}</td>
                        <td>{data.priority}</td>
                        <td>{data.message}</td>
                        <td> <input type="checkbox" value={data.status} onChange={this.handleChange} name={data.ticket_code} checked={data.status == "closed" ? "checked" : ""} />
                            {console.log(this.props.loading)}
                            {this.props.loading.loading && this.props.loading.id == data.ticket_code
                                ? <img src="https://media.giphy.com/media/3o7TKtnuHOHHUjR38Y/giphy.gif" alt="spinner" height="22" width="22"/>
                                : <div></div>
                            }
                        </td>
                    </tr>)
                }.bind(this))
            }
                    </tbody >
        )
    }
        
}