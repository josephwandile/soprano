import React, { Component } from 'react';
import Segment from './Segment.js';

class Transcript extends Component {
  render() {
    let segments = Object.entries(this.props.transcript).map(([id, trans]) => <Segment participants={this.props.participants} id={id} key={id} transcript={trans}/>);
    let summary = this.props.summary ? <p className="center">Executive Summary <br /> {this.props.summary}</p> : null;
    return (
      <div>
        {summary}
        {segments}
      </div>
    );
  }
};

export default Transcript;
