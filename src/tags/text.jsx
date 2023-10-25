import React, { Component } from 'react';

export default class extends Component {
  constructor(props) {
    super(props);
    this.divRef = React.createRef();
  }

  componentDidMount() {
    this.scale();
  }

  componentDidUpdate() {
    this.scale();
  }

  scale() {
    const div = this.divRef.current;

    // 先还原到未缩放状态
    div.style.display = 'block';
    div.style.paddingBottom = '';
    div.style.transformOrigin = 'left top';
    div.style.transform = '';
    div.style.width = '100%';
    div.style.position = 'relative';
    div.style.zIndex = 1;

    const { fontSize } = this.props;

    if (fontSize) {
      switch (fontSize) {
        case 'wide':
        case 'wide-high':
          // 设定宽度
          div.style.width = '50%';
          div.style.transform += ' scaleX(2)';
          div.style.zIndex = 0;
          break;
        default:
          break;
      }

      switch (fontSize) {
        case 'high':
        case 'wide-high':
          // 使用padding-bottom填充transform产生的新的高度
          div.style.paddingBottom = `${div.offsetHeight}px`;
          div.style.transform += ' scaleY(2)';
          div.style.lineHeight = '14px';
          div.style.zIndex = 0;
          break;
        default:
          break;
      }
    }
  }

  render() {
    const {
      marginPosition,
      marginSize,
      left,
      align,
      fontStyle,
      fontSize,
      textDecoration,
      color,
      borderWidth,
      borderStyle,
      children,
      wapperStyle,
      textStyle,
      reverseRange
    } = this.props;

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
      whiteSpace: 'pre-wrap',
      wordBreak: 'break-word',
      minHeight: '1em',
      width: '100%',
      overflow: 'hidden',
      overflowWrap: 'break-word',
      letterSpacing: '0.1px',
      marginLeft: `${(left || 0) * 7}px`,
    };

    const spanStyle = {
      display: 'inline-block',
      textDecoration,
    };

    if (align) {
      style.textAlign = align;
    }

    if (fontSize && Number.isInteger(parseInt(fontSize))) {
      const size = parseInt(fontSize);
      style.fontSize = size + 'px';
      style.lineHeight = size * 1.3 + 'px';
    }

    if (borderWidth) {
      spanStyle.padding = '2px';
      spanStyle.borderWidth = `${borderWidth}px`;
      spanStyle.borderStyle = `${borderStyle || 'solid'}`;
    }

    if (color === 'reverse' || color === 'red-reverse') {
      spanStyle.width = '100%';
      spanStyle.color = '#fff';
      spanStyle.backgroundColor = '#000';
      spanStyle.fontWeight = 'bold';
    } else if (color === 'reverse-block' || color === 'red-reverse-block') {
      spanStyle.color = '#fff';
      spanStyle.backgroundColor = '#000';
      spanStyle.fontWeight = 'bold';
    }

    wapperStyle && Object.assign(style, wapperStyle);
    textStyle && Object.assign(spanStyle, textStyle);
    if (reverseRange && Array.isArray(reverseRange)) {
      const [start, end] =  reverseRange
      const tempText = text;
      text = '';
      if (start !== 0) {
        text += tempText.substr(0, start);
      }
      text += `<span style="background-color: #000;color:#fff">${tempText.substr(start, end)}</span>`;
      text += tempText.substr(end, tempText.length);
    }

    const { id, selectedSection, onSectionSelect } = this.props;
    const onSelect = (e) => {
      e.stopPropagation();
      console.log('select text', id);
      if (onSectionSelect) {
        onSectionSelect(id);
      }
    };


    const selected = selectedSection === id;

    return (
      <div ref={this.divRef} style={style} className={selected ? 'selected' : ''} onClick={!!id ? onSelect : null}>
        <span style={spanStyle} dangerouslySetInnerHTML={{ __html: text }} />
      </div>
    );
  }
}
