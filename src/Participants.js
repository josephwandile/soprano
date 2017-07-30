import React, { Component } from 'react';
import '../node_modules/bulma/css/bulma.css';
import '../node_modules/font-awesome/css/font-awesome.css';
import './App.css';
import Participant from './Participant.js';
import update from 'immutability-helper';

class Participants extends Component {

  constructor(props) {
    super(props);
    this.state = {
      participants: [
        {
          email: 'joekahn13@gmail.com',
        },
        {
          email: 'yasyfm@gmail.com',
        },
      ],
      training: {
        'joekahn13@gmail.com': 0,
        'yasfym@gmail.com': 0,
      },
    };
  }

  participantClicked = (email) => {
    let count = this.state.training[email] + 1;
    const training = update(this.state.training, {[email]: {$set: count}});
    this.setState({training});
  }

  render = () => {

    const participants = this.state.participants.map((participant) =>
      <Participant key={participant.email} email={participant.email} onClickHandler={() => this.participantClicked(participant.email)} />
    );

    return (
      <div className="container">
        {participants}
      </div>
    );
  }
};

export default Participants;
