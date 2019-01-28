import React from 'react'
import TableComponent from './Table'
import Form from './Form'
import SearchAndSort from './SearchAndSort'
import axios from 'axios'
import { Chart } from 'react-google-charts';







class TicketMaster extends React.Component {
    constructor() {
        super()
        this.state = {
            tickets: [],
            originalTickets: [],
            loading: {
                loading: false,
                id: ""
            }

        }
        this.setData = this.setData.bind(this)
        this.search = this.search.bind(this)
        this.sort = this.sort.bind(this)
        this.statusChange = this.statusChange.bind(this)
    }
    componentDidMount() {
        //axios.get('http://dct-api-data.herokuapp.com/tickets?api_key=6fc7ce15eecbbb73').then(function (response) {
        axios.get(`http://localhost:3001/tickets`).then(function (response) {
            this.setState({
                tickets: response.data,
                originalTickets: response.data
            })
        }.bind(this))




    }



    setData(formDetails) {
        this.setState({
            tickets: this.state.tickets.concat(formDetails),
            originalTickets: this.state.originalTickets.concat(formDetails)
        })
    }

    search(searchValue, sortValue) {
        console.log('sort', sortValue)

        if (sortValue == 'all') {
            this.setState(function (prevState) {
                return {
                    tickets: prevState.originalTickets.filter(function (ticket) {
                        return ticket.ticket_code.toLowerCase().includes(searchValue.toLowerCase())
                    })
                }
            })

        }
        else {
            console.log(this.state.tickets)
            this.setState(function (prevState) {
                return {
                    tickets: prevState.originalTickets.filter(function (ticket) {
                        return ticket.ticket_code.toLowerCase().includes(searchValue.toLowerCase()) && ticket.priority == sortValue
                    })
                }
            })
        }
    }

    sort(sortValue, searchValue) {

        if (sortValue == 'all') {
            this.setState({
                isSorting: false
            })
            this.setState(function (prevState) {
                return {
                    tickets: prevState.originalTickets

                }
            })
        }

        else {
            this.setState(function (prevState) {
                let searchArray = prevState.originalTickets
                return {
                    tickets: searchArray.filter(function (ticket) {
                        return ticket.priority == sortValue && ticket.ticket_code.toLowerCase().includes(searchValue.toLowerCase())
                    })
                }
            })
        }
    }

    statusChange(id, ticketStatus) {
        let formData = {
            status: ticketStatus == "open" ? "closed" : "open"
        }
        this.setState({ 
                loading:{
                    loading: true,
                    id:id  
            }
        })
        //let url = `http://dct-api-data.herokuapp.com/tickets/${id}?api_key=6fc7ce15eecbbb73`
        let url = `http://localhost:3001/tickets/${id}`

        console.log(url)
        axios.put(url, formData).then(function (response) {
            // this.props.setData(response.data)            
            let status = this.state.originalTickets.find(function (ticket) {
                return ticket.ticket_code == id
            })
            status.status == "open" ? status.status = "closed" : status.status = "open"
            console.log(status.status)
            this.setState({ loading: false })
        }.bind(this))


    }

    render() {
        let closedTickets = this.state.tickets.filter(function (ticket) {
            return ticket.status == 'closed'

        })

        let progress = Math.round((closedTickets.length / this.state.originalTickets.length) * 100)



        let countHigh = this.state.originalTickets.filter(function (ticket) {
            return ticket.priority == 'high'
        }).length

        let countMedium = this.state.originalTickets.filter(function (ticket) {
            return ticket.priority == 'medium'
        }).length

        let countLow = this.state.originalTickets.filter(function (ticket) {
            return ticket.priority == 'low'
        }).length

        let highHr = this.state.tickets.filter(function (ticket) {
            return ticket.priority == 'high' && ticket.department == "hr"
        }).length



        return (


            <div>
                <SearchAndSort search={this.search} sort={this.sort} progress={progress} />

                <div className="row">
                    <div className="col-md-8">
                        <TableComponent setData={this.setNewData} tickets={this.state.tickets} statusChange={this.statusChange} loading={this.state.loading} />

                    </div>
                    <div className="col-md-4">
                        <Form setData={this.setData} />

                    </div>
                </div>

                <Chart
                    width={'500px'}
                    height={'300px'}
                    chartType="PieChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                        ['Tickets', 'Priority'],
                        ['High', countHigh],
                        ['Medium', countMedium],
                        ['Low', countLow],
                    ]}
                    options={{
                        title: 'Priorities',
                    }}
                    rootProps={{ 'data-testid': '1' }}
                />
                <Chart
                    width={'500px'}
                    height={'300px'}
                    chartType="Bar"
                    loader={<div>Loading Chart</div>}
                    data={[
                        ['Priority', 'Open', 'Closed'],
                        ['High',
                            this.state.tickets.filter(function (ticket) {
                                return ticket.priority == 'high' && ticket.status == 'open'
                            }).length,
                            this.state.tickets.filter(function (ticket) {
                                return ticket.priority == 'high' && ticket.status == 'closed'
                            }).length

                        ],
                        ['Medium',
                            this.state.tickets.filter(function (ticket) {
                                return ticket.priority == 'medium' && ticket.status == 'open'
                            }).length,
                            this.state.tickets.filter(function (ticket) {
                                return ticket.priority == 'medium' && ticket.status == 'closed'
                            }).length,
                        ],
                        ['Low',
                            this.state.tickets.filter(function (ticket) {
                                return ticket.priority == 'low' && ticket.status == 'open'
                            }).length,
                            this.state.tickets.filter(function (ticket) {
                                return ticket.priority == 'low' && ticket.status == 'closed'
                            }).length,
                        ]
                    ]}
                    options={{
                        // Material design options
                        chart: {
                            title: 'Priority',
                            subtitle: 'Open/Closed',
                        },
                    }}
                    // For tests
                    rootProps={{ 'data-testid': '2' }}
                />
            </div>
        )
    }
}



export default TicketMaster