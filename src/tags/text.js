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

    // 复制节点并挂载，修复Ionic下React生命周期不加载的问题
    const div2 = div.cloneNode(true);
    document.body.appendChild(div2);

    // 先还原到未缩放状态
    div.style.display = 'block';
    div.style.paddingBottom = '';
    div.style.width = '100%';
    div.style.transform = '';
    div.style.transformOrigin = '';

    const { fontSize } = this.props;
    console.log('fontSize', fontSize);

    if (fontSize) {
      switch (fontSize) {
        case 'wide':
        case 'wide-high':
          // 设定宽度
          div.style.width = '50%';
          break;
        default:
          break;
      }

      // setTimeout(() => {
      // 拿到原始高度
      const initialHeight = div2.offsetHeight;
      console.log('initialHeight', initialHeight);

      switch (fontSize) {
        case 'wide':
          div.style.transform = 'scaleX(2)';
          div.style.transformOrigin = 'left top';
          break;
        case 'high':
          // 使用padding-bottom填充transform产生的新的高度
          div.style.paddingBottom = `${initialHeight}px`;
          div.style.transform = 'scaleY(2)';
          div.style.transformOrigin = 'left top';
          break;
        case 'wide-high':
          // 使用padding-bottom填充transform产生的新的高度
          div.style.paddingBottom = `${initialHeight}px`;
          div.style.transform = 'scale(2)';
          div.style.transformOrigin = 'left top';
          break;
        case 'normal':
        default:
          break;
      }
      // }, 1000);
    }

    document.body.removeChild(div2);
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
      wordBreak: 'break-all',
      minHeight: '1em',
      width: '100%',
    };

    if (align) {
      style.textAlign = align;
    }

    return (
      <div
        ref={this.divRef}
        style={style}
        dangerouslySetInnerHTML={{
          __html: text && text.replace(/\s/g, '&nbsp;'),
        }}
      />
    );
  }
}
