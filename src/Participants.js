import React, { Component } from 'react';
import '../node_modules/bulma/css/bulma.css';
import '../node_modules/font-awesome/css/font-awesome.css';
import './App.css';
import Participant from './Participant.js';
import 'whatwg-fetch';


class Participants extends Component {

  constructor(props) {
    super(props);
    this.waiting = null;
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

  componentDidMount() {
    window.participants = this;
  }

  sendControlMessage = (email, status) => {
    let formData = new FormData();
    formData.append('email', email);
    formData.append('status', status);
    return fetch('http://localhost:5000/control', {method: 'POST', body: formData, credentials: 'include'});
  }

  sendWaiting() {
    if (!this.waiting) {
      return;
    }
    let {status, email} = this.waiting;
    this.sendControlMessage(email, status).then(() => {
      window.recorder.toggleDisabled();
      this.waiting = null;
    });
  }

  participantClicked = (e, email) => {
    let training = this.state.participants[email].training;
    let status = training ? 'STOPPING' : 'STARTING';

    if (training) {
      this.waiting = {status, email};
      window.recorder.stopRecording(e);
    } else {
      window.recorder.toggleDisabled();
      this.sendControlMessage(email, status).then(() => window.recorder.startOrResumeRecording(e));
    }

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

  render = () => {
    const participants = Object.keys(this.state.participants).map(email =>
      <Participant
        key={email}
        training={this.state.participants[email].training}
        email={email}
        onClickHandler={(e) => this.participantClicked(e, email)}
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
