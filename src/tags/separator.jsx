import React from 'react';

export default function (props) {
  const { char = '-' } = props;

  let str = '';
  for (let i = 0; i < 100; i++) {
    str += char;
  }

  const style = {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  };

  return <div style={style}>{str}</div>;
}
