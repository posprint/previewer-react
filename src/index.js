import React from 'react';
import Element from './tags/element';

export default function (props) {
  const { dom, selectedSection, onSectionSelect } = props;
  const { attributes, elementName, children } = dom;

  console.log('onSectionSelect', onSectionSelect);

  const style = {
    padding: '16px',
    fontSize: '10px',
    color: '#4a4a4a',
  };

  if (elementName !== 'root') {
    return <div style={style}>Dom must have root element to render.</div>;
  }

  let isa = 'esc';
  if (attributes && attributes.isa) {
    isa = attributes.isa;
  }

  if (!children || !Array.isArray(children) || children.length === 0) {
    return <div style={style}>Dom must have valid children to render.</div>;
  }

  if (isa === 'tsc') {
    Object.assign(style, {
      margin: '20px auto',
      borderRadius: '6px',
      padding: '8px',
      width: '184px',
      boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.2)',
    });
  }

  return (
    <div style={style}>
      {children &&
        children.map((node, i) => (
          <Element
            key={i}
            isa={isa}
            node={node}
            selectedSection={selectedSection}
            onSectionSelect={onSectionSelect}
          />
        ))}
    </div>
  );
}
