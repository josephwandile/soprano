import React from 'react';
import Segment from './Segment.js';

const Transcript = (props) => {

  // TODO: This is inefficient, but without merging the text snippets it becomes
  // really difficult to display the transcript usably.
  let full_transcript = [];
  for (let id in props.transcript) {
    full_transcript = full_transcript.concat(props.transcript[id]);
  }

  // Is an executive summary avilable?
  let summary = props.summary ? (
    <div className="content">
      <h3>
        Executive Summary
      </h3>
      <p>{props.summary}</p>
    </div>
  ) : null;

  return (
    <div className="container">
      <div className="content">
        {summary}
        <h3>Meeting Transcript</h3>
        <Segment participants={props.participants} transcript={full_transcript}/>
      </div>
    </div>
  );
};

export default Transcript;
