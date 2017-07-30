import React, { Component } from 'react';
import '../node_modules/bulma/css/bulma.css';
import '../node_modules/font-awesome/css/font-awesome.css';
import './App.css';
import Participant from './Participant.js';
import 'whatwg-fetch';
import randomColor from 'randomcolor';


class Participants extends Component {

  constructor(props) {
    super(props);
    this.waiting = null;
    this.state = {
      participants: {},
      newEmail: '',
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

    const trained = this.state.participants[email].trained;
    const training = this.state.participants[email].training;

    if (trained) {
      console.log("Already trained.");
    } else if (training) {
      console.log("Currently training.");
    } else {


      // Start recording for training data
      this.setState(Object.assign(this.state, {
        participants: {
          ...this.state.participants,
          [email]: {
            'training': true,
          },
        }
      }));

      this.waiting = {status: 'STOPPING', email};
      this.sendControlMessage(email, 'STARTING').then(() => window.recorder.startOrResumeRecording(e));

      // After n seconds, end the training recording and re-enable the UI.
      setTimeout(() => {
        window.recorder.stopRecording(e);

        this.setState(
          Object.assign(this.state, {
            participants: {
              ...this.state.participants,
              [email]: {
                'trained': true,
                'training': false,
              },
            }
          })
        )
      }, 4000);
    }

  }

  handleChange = e => {
    this.setState(Object.assign(this.state, {
      ...this.state,
      newEmail: e.target.value,
    }));
  }

  handleSubmit = e => {

    if (!this.state.newEmail.length) {
      return;
    }

    this.setState(Object.assign(this.state, {
      participants: {
        ...this.state.participants,
        [this.state.newEmail]: {
          'training': false,
          'color': randomColor(),
        },
      },
      newEmail: '',
    }))
  }

  render = () => {
    const participants = Object.keys(this.state.participants).map(email =>
      <Participant
        key={email}
        training={this.state.participants[email].training}
        email={email}
        onClickHandler={(e) => this.participantClicked(e, email)}
        trained={this.state.participants[email].trained}
        color={this.state.participants[email].color}
      />
    );

    return (
      <div className="container custom-container">
        <div className="field has-addons">
          <div className="control">
            <input
              value={this.state.newEmail}
              placeholder='example@gmail.com'
              className="input"
              type="text"
              onChange={this.handleChange}
            />
          </div>
          <div className="control" onClick={this.handleSubmit}>
            <a
              disabled={this.state.newEmail.length == 0 ? true : false}
              className="button is-info"
              >
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
