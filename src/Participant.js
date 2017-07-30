import React from 'react';
import '../node_modules/bulma/css/bulma.css';
import '../node_modules/font-awesome/css/font-awesome.css';
import './App.css';

const Participant = (props) => {

  let btn_text = "Train";
  if (props.trained) {
    btn_text = "Trained";
  } else if (props.training) {
    btn_text = "Training";
  }

  return (
    <div className="box">
        <div className="columns">
          <div className="column is-2">
            <span className="icon is-medium">
              <i style={{color: props.color}} className="fa fa-android"/>
            </span>
          </div>
          <div className="column is-6">
            <p>
              {props.email}
            </p>
          </div>
          <div className="column is-4">
            <p className="field">
              <a disabled={props.trained} className={props.trained ? "button is-success" : "button is-danger"} onClick={props.onClickHandler}>
                <span className="icon is-small">
                  <i className={props.training ? "fa fa-cog spinner" : "fa fa-microphone"}/>
                </span>
                <span>
                  {btn_text}
                </span>
              </a>
            </p>
          </div>
        </div>
    </div>
  );
}

export default Participant;
