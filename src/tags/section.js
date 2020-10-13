import React from 'react';
import Element from './element';

export default function (props) {
  const { id, children } = props;

  return (
    <div className="print-section" data-section-id={id}>
      {children &&
        children.map((node, i) => <Element key={i} isa="esc" node={node} />)}
    </div>
  );
}
