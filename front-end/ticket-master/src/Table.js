import React from 'react'
import { Table } from 'reactstrap';
import TableRow from './TableRow';


class TableComponent extends React.Component {
    constructor() {
        super()
        this.state = {
            formData: []
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(name, value){
        this.props.statusChange(name, value)

    }

    render() {
        // console.log(this.state.formData)
        return (
            <div>
                <h2>Listing Tickets {this.props.tickets.length}</h2>
                <Table dark striped bordered>
                    <thead>
                        <tr>
                            <th> Code </th>
                            <th> Name </th>
                            <th> Department </th>
                            <th>Priority</th>
                            <th> Message </th>
                            <th> Status </th>
                        </tr>
                    </thead>
                    <TableRow tickets={this.props.tickets} loading={this.props.loading} statusChange={this.handleChange}/>
                </Table>
            </div >
        )
    }
}


export default TableComponent