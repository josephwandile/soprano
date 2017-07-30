import React, { Component } from 'react';

class Segment extends Component {
  render() {

    // Ignore empty transcripts
    if (!this.props.transcript.length) {
      return null;
    }

    let items = [];
    let i = 0;
    this.props.transcript.forEach(trans => {
      if (trans.new) {
        items.push(<br/>)
        items.push(<span key={`break-${i}`} className="tag">{trans.speaker}</span>);
      }
      items.push(<span key={`words-${i}`}>{trans.transcript.join(' ')}</span>);
      items.push(' ');
      i++;
    });
    return <div className="inline-block">{items}</div>;
  }
};

export default Segment;
