import React from 'react';
import Element from './element';

export default function (props) {
  const { isa, id, children, selectedSection, onSectionSelect, style = {}, wapperStyle, width, flex, position } = props;

  const onSelect = () => {
    console.log('select', id);
    if (onSectionSelect) {
      onSectionSelect(id);
    }
  };

  const selected = selectedSection === id;
  let sectionStyle = { ...style }
  if (flex) {
    sectionStyle.display = 'flex';
  }
  if (position === 'bottom') {
    sectionStyle.position = 'absolute'
    sectionStyle.bottom = 0
    sectionStyle.width = '100%'
    sectionStyle.paddingRight = '8px'
    sectionStyle.boxSizing = 'border-box'
  }
  if (width) {
    sectionStyle.width = `${width * 100}%`;
  }
  Object.assign(sectionStyle, wapperStyle)

  return (
    <div
      className={'print-section' + (selected ? ' selected' : '')}
      data-section-id={id}
      onClick={onSelect}
      style={sectionStyle}
    >
      {children &&
        children.map((node, i) => <Element key={i} isa={isa} node={node} selectedSection={selectedSection} onSectionSelect={onSectionSelect} />)}
    </div>
  );
}
