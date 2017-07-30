import React, { Component } from 'react';

class Words extends Component {
  render() {
    return <span>{this.props.words.join(' ')}</span>;
  }
};

export default Words;
