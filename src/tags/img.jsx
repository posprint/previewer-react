import React, { Component } from 'react';

export default class extends Component {

  constructor(props) {
    super(props);
    this.divRef = React.createRef();
  }

  componentDidMount() {
    this.scale();
  }

  componentDidUpdate(prevProps) {
    (prevProps.size !== this.props.size || prevProps.children !== this.props.children) &&  this.scale();
  }

  scale() {
    const { size, children, format } = this.props;
    const div = this.divRef.current;
    if (size === 'normal') {
      const image = new Image();
      image.src = `data:image/${format};base64,${children}`;
      image.onload = () => {
        div.style.marginTop = `-${image.width / 2}px`;
        if (image.width > div.offsetWidth) {
          div.style.transformOrigin = 'left bottom';
        } else {
          div.style.transformOrigin = 'center bottom';
        }
      }
    } else {
      div.style.marginTop = '0';
    }
  }

  render () {
    const { format, height, width, size, align, children, wapperStyle, imgStyle } = this.props;

    const style = {
      textAlign: align,
      transformOrigin: 'center bottom'
    };

    if (size === 'normal') {
      Object.assign(style, {
        transform: 'scale(0.5)'
      })
    } else {
      Object.assign(style, {
        transform: 'none',
        marginTop: '0'
      })
    }

    wapperStyle && Object.assign(style, wapperStyle);

    return (
      <div ref={this.divRef} style={style}>
        <img src={`data:image/${format};base64,${children}`} style={imgStyle} />
      </div>
    );
  }
}
