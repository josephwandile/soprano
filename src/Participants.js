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
      newEmail: 'example@gmail.com',
    };
  }

  participantClicked = email => {
    let formData = new FormData();
    formData.append('email', email);
    const status = this.state.participants[email].training ? 'STOPPING' : 'STARTING';
    formData.append('status', status);
    fetch('http://localhost:5000/control', {method: 'POST', body: formData});

    const newState = Object.assign(this.state, {
      participants: {
        ...this.state.participants,
        [email]: {
          'training': !this.state.participants[email].training
        },
      }
    });

    this.setState(newState);
  }

  handleChange = e => {
    this.setState(Object.assign(this.state, {
      ...this.state,
      newEmail: e.target.value,
    }));
  }

  handleSubmit = e => {
    this.setState(Object.assign(this.state, {
      participants: {
        ...this.state.participants,
        [this.state.newEmail]: {
          'training': false,
        },
      }
    }))
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
        <div className="field has-addons">
          <div className="control">
            <input
              value={this.state.newEmail}
              className="input"
              type="text"
              onChange={this.handleChange}
            />
          </div>
          <div className="control" onClick={this.handleSubmit}>
            <a className="button is-info">
              Add Participant
            </a>
          </div>
        </div>
        {participants}
      </div>
    );
  }
};

export default Participants;
