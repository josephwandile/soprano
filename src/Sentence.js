import React from 'react';
import './App.css';

const Sentence = (props) => {

  return (
      <span>
        {`${props.words} `}
      </span>
  );
}

export default Sentence;
