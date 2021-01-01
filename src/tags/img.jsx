import React from 'react';

export default function (props) {
  const { format, height, width, align, children } = props;

  const style = {
    textAlign: align,
  };

  return (
    <div style={style}>
      <img src={`data:image/${format};base64,${children}`} />
    </div>
  );
}
