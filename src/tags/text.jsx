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
    div.style.width = '100%';
    div.style.transformOrigin = 'left top';
    div.style.transform = '';

    const { fontSize } = this.props;

    if (fontSize) {
      switch (fontSize) {
        case 'wide':
        case 'wide-high':
          // 设定宽度
          div.style.width = '50%';
          div.style.transform += ' scaleX(2)';
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
      align,
      fontStyle,
      fontSize,
      textSpacing,
      color,
      children,
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
    };

    const spanStyle = {
      display: 'inline-block',
    };

    if (align) {
      style.textAlign = align;
    }

    if (color === 'reverse') {
      spanStyle.width = '100%';
      spanStyle.color = '#fff';
      spanStyle.backgroundColor = '#000';
      spanStyle.fontWeight = 'bold';
    } else if (color === 'reverse-block') {
      spanStyle.color = '#fff';
      spanStyle.backgroundColor = '#000';
      spanStyle.fontWeight = 'bold';
    }

    return (
      <div ref={this.divRef} style={style}>
        <span style={spanStyle} dangerouslySetInnerHTML={{ __html: text }} />
      </div>
    );
  }
}
