import React, { Component } from 'react';
import Segment from './Segment.js';

class Transcript extends Component {
  render() {
    let segments = Object.entries(this.props.transcript).map(([id, trans]) => <Segment participants={this.props.participants} id={id} key={id} transcript={trans}/>);
    return <div>{segments}</div>;
  }
};

export default Transcript;
