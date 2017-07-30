import React, { Component } from 'react';
import Speaker from './Speaker.js';
import Sentence from './Sentence.js';

class Segment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      transcript: this.props.transcript,
    };
  }

  render() {

    // Ignore empty transcripts
    if (!this.props.transcript.length) {
      return null;
    }

    let items = [];
    let i = 0;
    this.props.transcript.forEach(trans => {
      if (trans.new) {  // New speaker. Insert line break and speaker tag.
        items.push(<br key={`ogbreak-${i}`}/>)
        items.push(<Speaker key={`break-${i}`} email={trans.speaker} participants={this.props.participants}/>);
      }
      items.push(<Sentence key={`words-${i}`} words={trans.transcript.join(' ')}/>)
      i++;
    });
    return <div>{items}</div>;
  }
};

export default Segment;
