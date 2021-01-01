import React from 'react';
import Element from './element';

export default function (props) {
  const { id, children, selectedSection, onSectionSelect } = props;

  const onSelect = () => {
    console.log('select', id);
    if (onSectionSelect) {
      onSectionSelect(id);
    }
  };

  const selected = selectedSection === id;

  return (
    <div
      className={'print-section' + (selected ? ' selected' : '')}
      data-section-id={id}
      onClick={onSelect}
    >
      {children &&
        children.map((node, i) => <Element key={i} isa="esc" node={node} />)}
    </div>
  );
}
