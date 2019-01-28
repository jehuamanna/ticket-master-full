import React from 'react'

class ClassComponent extends React.Component{
    render(){
        return (
            <div>
                <h2>First Class Component - {this.props.msg} </h2>
            </div>
        )
    }
}

export default ClassComponent