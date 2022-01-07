import React from 'react';
import QRCode from 'qrcode.react';

export default function (props) {
  const { align, margin, level, size, children } = props;

  const style = {
    textAlign: align || 'center',
  };
  const width = size === 'normal' ? 80 : 160

  return (
    <div style={style}>
      <QRCode size={width} value={children || ''} level={level} />
    </div>
  );
}
