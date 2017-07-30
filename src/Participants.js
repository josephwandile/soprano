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
      }, 25000);
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
      <div className="columns">
        <div className="column is-5">
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
                disabled={this.state.newEmail.length === 0 ? true : false}
                className="button is-info"
                >
                Add Participant
              </a>
            </div>
          </div>
          {participants}
        </div>
        <div className="column is-7">
          <div className="content">
            <h3>
              Some text to help you train Soprano
            </h3>
            <h4>Generative Unadversarial Networks</h4>
            <code>https://arxiv.org/abs/1703.02528</code>
            <p>
                While the costs of human violence have attracted a great deal of attention from the research community, the effects of the network-on-network (NoN) violence popularised by Generative Adversarial Networks have yet to be addressed. In this work, we quantify the financial, social, spiritual, cultural, grammatical and dermatological impact of this aggression and address the issue by proposing a more peaceful approach which we term Generative Unadversarial Networks (GUNs). Under this framework, we simultaneously train two models: a generator G that does its best to capture whichever data distribution it feels it can manage, and a motivator M that helps G to achieve its dream. Fighting is strictly verboten and both models evolve by learning to respect their differences. The framework is both theoretically and electrically grounded in game theory, and can be viewed as a winner-shares-all two-player game in which both players work as a team to achieve the best score. Experiments show that by working in harmony, the proposed model is able to claim both the moral and log-likelihood high ground. Our work builds on a rich history of carefully argued position-papers, published as anonymous YouTube comments, which prove that the optimal solution to NoN violence is more GUNs.
            </p>
          </div>
        </div>
      </div>
    );
  }
};

export default Participants;
