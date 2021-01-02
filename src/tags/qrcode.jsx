import React from 'react';
import QRCode from 'qrcode.react';

export default function (props) {
  const { align, margin, level, size, children } = props;

  const style = {
    textAlign: align || 'center',
  };

  return (
    <div style={style}>
      <QRCode size={160} value={children || ''} level={level} />
    </div>
  );
}
