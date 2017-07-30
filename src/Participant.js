import React from 'react';
import '../node_modules/bulma/css/bulma.css';
import '../node_modules/font-awesome/css/font-awesome.css';
import './App.css';
import randomColor from 'randomcolor';

const Participant = (props) => {

  return (
    <div className="box">
        <div className="columns">
          <div className="column is-2">
            <span className="icon is-medium">
              <i style={{color: randomColor()}} className="fa fa-android"/>
            </span>
          </div>
          <div className="column is-6">
            <p>
              {props.email}
            </p>
          </div>
          <div className="column is-4">
            <p className="field">
              <a className="button" onClick={props.onClickHandler}>
                <span className="icon is-small">
                  <i className={props.training ? "fa fa-cog spinner" : "fa fa-cog"}/>
                </span>
              </a>
            </p>
          </div>
        </div>
    </div>
  );
}

export default Participant;
