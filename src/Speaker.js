import React from 'react';
import './App.css';

const Speaker = (props) => {
  return (
      <span style={{background: props.email in props.participants ? props.participants[props.email] : 'inherit'}} className="tag speaker-tag">
        {props.email.indexOf("@") !== -1 ? props.email.split("@")[0] : props.email}
      </span>
  );
}

export default Speaker;
