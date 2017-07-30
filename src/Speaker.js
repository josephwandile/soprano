import React from 'react';
import './App.css';

const Speaker = (props) => {

  return (
      <span className="tag speaker-tag">
        {props.email}
      </span>
  );
}

export default Speaker;
