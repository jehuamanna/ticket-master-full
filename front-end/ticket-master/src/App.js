import React, { Component } from 'react';
import TicketMaster from './TicketMaster'
import ReactRouter from './ReactRouter';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container">
          
          <TicketMaster/>
        </div>
      </div>
    );
  }
}

export default App
