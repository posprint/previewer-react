import React from 'react';

export default function (props) {
  const { format, height, width, size, align, children } = props;

  const style = {
    textAlign: align,
  };

  const imgStyle = {
    maxWidth: size === 'normal' ? '50%' : '100%',
  };

  return (
    <div style={style}>
      <img style={imgStyle} src={`data:image/${format};base64,${children}`} />
    </div>
  );
}
