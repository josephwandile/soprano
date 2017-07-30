import React, { Component } from 'react';
import '../node_modules/bulma/css/bulma.css';
import 'react-toastify/dist/ReactToastify.min.css';
import './App.css';
import Recorder from './Recorder.js';
import Participants from './Participants.js';
import Transcript from './Transcript.js';
import TranscriptMock from './TranscriptMock.js';
import 'whatwg-fetch';
import update from 'immutability-helper';
import { ToastContainer, toast } from 'react-toastify';
import * as moment from 'moment'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      transcript: TranscriptMock,//{},
      participants: {},
      summary: null,
    };
  }

  componentDidMount() {
    fetch(`http://${window.location.hostname}:8080/reset`, {method: 'POST', credentials: 'include'});
    setTimeout(this.fetchObservation, 1000);
  }

  fetchObservation = () => {
    fetch(`http://${window.location.hostname}:8080/observe`, {credentials: 'include'})
      .then(resp => resp.json())
      .then(resp => {
        if (!resp.error && resp.transcripts) {
          this.appendToTranscript(resp.id, resp.transcripts);
          this.onActions(resp.actions);
        }
        setTimeout(this.fetchObservation, 1000);
      });
  }

  appendToTranscript = (id, transcripts) => {
    let transcript = update(this.state.transcript, {[id]: {$set: transcripts}});
    this.setState({transcript});
  }

  onActions = (actions) => {
    actions.forEach(action => {
      switch(action.type) {
        case 'calendar':
          toast(
            <div>
              <h3>Scheduled calendar event</h3>
              <h4>See you {moment(action.start_time).fromNow()} at {action.location}!</h4>
            </div>
          );
          break;
        case 'ticket':
          toast(<p>Filed JIRA ticket!</p>);
          break;
        case 'summary':
          this.setState({summary: action.body});
          break;
        default:
          break;
      }
    });
  }

  addParticipantHandler = (p) => {
    this.setState({participants: {
      ...this.state.participants,
      [p.email]: p.color,
    }})
  }

  render() {
    return (
      <div>
        <div className="hero is-primary is-bold has-text-centered">
          <div className="hero-body">
            <div className="title">
              Soprano
            </div>
            <div className="subtitle">
              Speech-to-text meeting assistant
            </div>
          </div>
        </div>
        <div className="section">
          <Participants
            participants={this.state.participants}
            onAddParticipant={(p) => this.addParticipantHandler(p)}
          />
        </div>
        <div className="section">
          <Recorder appendToTranscript={this.appendToTranscript}/>
          <Transcript
            summary={this.state.summary}
            participants={this.state.participants}
            transcript={this.state.transcript}
          />
        </div>
        <ToastContainer position="bottom-right" autoClose={10000} />
      </div>
    );
  }
}

export default App;
