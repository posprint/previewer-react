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
        let width = image.width > div.offsetWidth ? div.offsetWidth : image.width;
        div.style.marginTop = `-${width / 2}px`;
      }
    } else {
      div.style.marginTop = '0';
    }
  }

  render () {
    const { format, height, width, size, align, children } = this.props;

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

    const imgStyle = {
      maxWidth: '100%',
    };

    return (
      <div ref={this.divRef} style={style}>
        <img style={imgStyle} src={`data:image/${format};base64,${children}`} />
      </div>
    );
  }
}
