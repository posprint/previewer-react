import React from 'react';
import QRCode from 'qrcode.react';

export default function (props) {
  const { isa, align, margin, level, size, children } = props;
  const style = {
    textAlign: align || 'center',
  };
  let width;
  if (isa === 'tsc') {
    width = size === 'normal' ? 45 : 90
  } else {
    width = size === 'normal' ? 80 : 160
  }

  return (
    <div style={style}>
      <QRCode size={width} value={children || ''} level={level} />
    </div>
  );
}
