import React, { Component } from 'react';
import Break from './Break.js';
import Words from './Words.js';

class Segment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      transcript: this.props.transcript,
    };
  }

  componentDidMount() {
    setTimeout(this.fetchObservation, 1000);
  }

  fetchObservation = () => {
    fetch(`http://localhost:5000/observe/${this.props.id}`, {credentials: 'include'})
      .then(resp => resp.json())
      .then(resp => {
        if (resp.error) {
          return;
        } else if (resp.retry) {
          setTimeout(this.fetchObservation, 2000);
        } else {
          this.setState({transcript: resp.transcripts});
        }
      });
  }


  render() {
    if (!this.state.transcript.length) {
      return null;
    }

    let items = [];
    let i = 0;
    this.state.transcript.forEach(trans => {
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
