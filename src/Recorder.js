import React, { Component } from 'react';
import '../node_modules/bulma/css/bulma.css';
import '../node_modules/font-awesome/css/font-awesome.css';
import './App.css';
import MediaStreamRecorder from 'msr';

class Recorder extends Component {

  constructor(props) {
    super(props);
    this.state = {
      recorder: null,
      isCurrentlyRecording: false,
    };
  }

  onMediaSuccess = (stream) => {
    const newRecorder = new MediaStreamRecorder(stream);
    newRecorder.mimeType = 'audio/wav';
    newRecorder.ondataavailable = function (blob) {
        console.log(blob);
        // TODO PUT to localhost:5000/submit
    };
    newRecorder.start(5000);  // Record blobs of 5 seconds each.
    this.setState({recorder: newRecorder, isCurrentlyRecording: true});
  }

  onMediaError = (e) => {
    console.error('media error', e);
  }

  showBanner = (msg) => {
    console.log(msg);
  }

  startRecording = (e) => {
    e.preventDefault();
    if (this.state.isCurrentlyRecording || this.state.recorder) {
      this.showBanner("Already recording.");
    } else {
      console.log("Recording started.");
      navigator.getUserMedia({ audio: true, }, this.onMediaSuccess, this.onMediaError);
    }
  }

  resumeRecording = (e) => {
    e.preventDefault();
    if (this.state.isCurrentlyRecording && this.state.recorder) {
      console.log("Already recording.");
    } else {
      console.log("Recording resumed.");
      this.setState({ isCurrentlyRecording: true, });
      this.state.recorder.resume();
    }
  }

  stopRecording = (e) => {
    e.preventDefault();
    if (this.state.isCurrentlyRecording || this.state.recorder) {
      console.log("Recording stopped.");
      this.state.recorder.stop();
      this.setState({ isCurrentlyRecording: false, recorder: null, })
    } else {
      this.showBanner("Not currently recording.");
    }
  }

  pauseRecording = (e) => {
    e.preventDefault();
    if (this.state.isCurrentlyRecording) {
      console.log("Recording paused.");
      this.state.recorder.pause();
      this.setState({ isCurrentlyRecording: false, })
    } else {
      this.showBanner("Not currently recording.");
    }
  }

  render() {
    return (
      <div className="field has-addons recorder">
        <p className="control">
          <a onClick={this.startRecording} disabled={this.state.isCurrentlyRecording || this.state.recorder} className="button">
            <span className="icon is-small">
              <i className={this.state.isCurrentlyRecording ? "fa fa-cog spinner" : "fa fa-microphone"}></i>
            </span>
            <span>Record</span>
          </a>
        </p>
        <p className="control">
          <a onClick={this.resumeRecording} disabled={this.state.isCurrentlyRecording || !this.state.recorder} className="button">
            <span className="icon is-small">
              <i className="fa fa-play"></i>
            </span>
            <span>Resume</span>
          </a>
        </p>
        <p className="control">
          <a onClick={this.pauseRecording} disabled={!this.state.isCurrentlyRecording} className="button">
            <span className="icon is-small">
              <i className="fa fa-pause"></i>
            </span>
            <span>Pause</span>
          </a>
        </p>
        <p className="control">
          <a onClick={this.stopRecording} disabled={!this.state.isCurrentlyRecording && !this.state.recorder} className="button">
            <span className="icon is-small">
              <i className="fa fa-stop"></i>
            </span>
            <span>Stop</span>
          </a>
        </p>
      </div>
    );
  }
};

export default Recorder;
