import React, { Component } from 'react';
import Segment from './Segment.js';

class Transcript extends Component {
  render() {

    let full_transcript = [];
    let id = "0"
    for (id in this.props.transcript) {
      full_transcript = full_transcript.concat(this.props.transcript[id]);
    }
    let summary = this.props.summary ? (
      <div className="content">
        <h3>
          Executive Summary
        </h3>
        <p>{this.props.summary}</p>
      </div>
    ) : null;
    return (
      <div className="container">
        <div className="content">
          {summary}
          <h3>Meeting Transcript</h3>
          <Segment participants={this.props.participants} id={"0"} transcript={full_transcript}/>
        </div>
      </div>
    );
  }
};

export default Transcript;
