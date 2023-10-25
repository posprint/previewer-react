import React from 'react';
import QRCode from 'qrcode.react';

export default function (props) {
  const { isa, align, margin, level, size, children, color } = props;
  const style = {
    textAlign: align || 'center',
  };
  let width;
  if (isa === 'tsc') {
    width = size === 'normal' ? 45 : 90
  } else {
    width = size === 'normal' ? 80 : 160
  }
  let colorValue;
  if (color && color.indexOf('-') > -1) {
    colorValue = color.split('-')[1];
  }

  const { id, selectedSection, onSectionSelect } = props;
  const onSelect = (e) => {
    e.stopPropagation();
    console.log('select qrcode', id);
    if (onSectionSelect) {
      onSectionSelect(id);
    }
  };

  const selected = selectedSection === id;

  return (
    <div style={style} className={selected ? 'selected' : ''} onClick={!!id ? onSelect : null}>
      <QRCode fgColor={colorValue} size={width} value={children || ''} level={level} />
    </div>
  );
}
