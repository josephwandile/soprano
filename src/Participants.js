import React, { Component } from 'react';
import '../node_modules/bulma/css/bulma.css';
import '../node_modules/font-awesome/css/font-awesome.css';
import './App.css';
import Participant from './Participant.js';
import 'whatwg-fetch';


class Participants extends Component {

  constructor(props) {
    super(props);
    this.state = {
      participants: {
        'joekahn13@gmail.com': {
          training: false,
        },
        'yasyfm@gmail.com': {
          training: false,
        },
      },
    };
  }

  participantClicked = email => {
    let formData = new FormData();
    formData.append('email', email);
    const status = this.state.participants[email].training ? 'STOPPING' : 'STARTING';
    formData.append('status', status);
    fetch('http://localhost:5000/control', {method: 'POST', body: formData});
  }

  render = () => {

    const participants = Object.keys(this.state.participants).map(email =>
      <Participant
        key={email}
        training={this.state.participants[email].training}
        email={email}
        onClickHandler={() => this.participantClicked(email)}
      />
    );

    return (
      <div className="container">
        {participants}
      </div>
    );
  }
};

export default Participants;
