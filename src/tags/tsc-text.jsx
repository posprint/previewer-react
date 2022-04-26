import React from 'react';

export default function (props) {
  const {
    marginPosition,
    marginSize,
    align,
    fontStyle,
    fontSize,
    rotation,
    children,
  } = props;

  let text;
  if (children == null) {
    text = '';
  } else if (typeof children === 'string') {
    text = children;
  } else if (Array.isArray(children)) {
    text = children.join('');
  } else {
    throw new Error(
      'text can only accept string or array of string as children',
    );
  }

  const style = {
    wordBreak: 'break-word',
    overflowWrap: 'break-word',
    marginLeft: `${(left || 0) * 7}px`
  };

  if (align) {
    style.textAlign = align;
  }

  if (fontSize) {
    switch (fontSize) {
      case 'wide':
      case 99:
        style.fontSize = '2em';
        style.transform = 'scaleY(0.5)';
        break;
      case 'high':
        style.fontSize = '2em';
        style.transform = 'scaleX(0.5)';
        break;
      case 'wide-high':
      case 2:
        style.fontSize = '2em';
        break;
      case 'normal':
      default:
        break;
    }
  }

  return (
    <div
      style={style}
      dangerouslySetInnerHTML={{
        __html: text,
        // __html: text && text.replace(/\s/g, '&nbsp;'),
      }}
    />
  );
}
