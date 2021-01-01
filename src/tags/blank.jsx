import React from 'react';

export default function (props) {
  const { lines = 1 } = props;

  const elements = [];
  for (let i = 0; i < lines; i++) {
    elements.push(<div key={i}>&nbsp;</div>);
  }

  return <>{elements}</>;
}
