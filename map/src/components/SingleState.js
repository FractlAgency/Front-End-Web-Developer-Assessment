import React from 'react';
import dataStates from "util/data-states";
import objectByState from "util/objectByState";

const SingleState = props => {
  const { dimensions, fill, state, onClickState, handleHover } = props;
  const allStates = objectByState(dataStates);
  const details = allStates[state];
  return (
    <path data-tip={JSON.stringify(details)} onMouseEnter={handleHover.bind(this, state)} d={dimensions} fill={fill} data-name={state} className={`${state} state grow pointer tooltip`} onClick={onClickState} />
  );
}


export default SingleState;