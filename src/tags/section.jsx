import React from 'react';
import Element from './element';

export default function (props) {
  const { isa, id, children, selectedSection, onSectionSelect, style = {}, width, flex, position } = props;

  const onSelect = () => {
    console.log('select', id);
    if (onSectionSelect) {
      onSectionSelect(id);
    }
  };

  const selected = selectedSection === id;
  const wapperStyle = {}
  if (flex) {
    wapperStyle.display = 'flex';
  }
  if (position === 'bottom') {
    wapperStyle.position = 'absolute'
    wapperStyle.bottom = 0
    wapperStyle.width = '100%'
    wapperStyle.paddingRight = '8px'
    wapperStyle.boxSizing = 'border-box'
  }
  if (width) {
    wapperStyle.width = `${width * 100}%`;
  }
  Object.assign(style, wapperStyle)

  return (
    <div
      className={'print-section' + (selected ? ' selected' : '')}
      data-section-id={id}
      onClick={onSelect}
      style={style}
    >
      {children &&
        children.map((node, i) => <Element key={i} isa={isa} node={node} />)}
    </div>
  );
}
