import React from 'react';
import { QRCode } from 'react-qrcode';

export default function (props) {
  const { align, margin, level, size, children } = props;

  const style = {
    textAlign: align || 'center',
  };

  return (
    <div style={style}>
      <QRCode
        value={children}
        margin={margin || 2}
        errorCorrectionLevel={level}
      />
    </div>
  );
}
