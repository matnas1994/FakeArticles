import React from 'react';

const divStyle = {
    display: 'inline-flex'
  };

export const Tag = ({text}) =>
    <div className="tagClass" style={divStyle}>
       <span>{text}</span>
    </div>