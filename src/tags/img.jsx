import React from 'react';

export default function (props) {
  const { format, height, width, align, children } = props;

  const style = {
    textAlign: align,
  };

  const imgStyle = {
    maxWidth: '100%',
  };

  return (
    <div style={style}>
      <img style={imgStyle} src={`data:image/${format};base64,${children}`} />
    </div>
  );
}
