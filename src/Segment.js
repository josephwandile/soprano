import React, { Component } from 'react';
import Break from './Break.js';
import Words from './Words.js';

class Segment extends Component {
  render() {
    if (!this.props.transcript.length) {
      return null;
    }

    let items = [];
    let i = 0;
    this.props.transcript.forEach(trans => {
      if (trans.new) {
        items.push(<Break key={`break-${i}`} speaker={trans.speaker}/>);
      }
      items.push(<Words key={`words-${i}`} words={trans.transcript} />);
      items.push(' ');
      i++;
    });

    return <div>{items}</div>;
  }
};

export default Segment;
