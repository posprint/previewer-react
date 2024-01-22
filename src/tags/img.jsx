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
    const { size, children, format, isa } = this.props;
    const div = this.divRef.current;
    if (size === 'normal') {
      const image = new Image();
      image.src = `data:image/${format};base64,${children}`;
      image.onload = () => {
        div.style.marginTop = `-${image.height / 2}px`;
        div.style.marginLeft = '0';
        if (div.offsetWidth < image.width && isa !== 'tsc') {
            div.style.transformOrigin = 'left bottom';
            let marginLeft = (div.offsetWidth - (image.width / 2)) / 2
            div.style.marginLeft = `${marginLeft}px`
        } else {
          div.style.transformOrigin = 'center bottom';
          div.style.marginLeft = '0';
        }
      }
    } else {
      div.style.marginTop = '0';
      div.style.marginLeft = '0';
    }
  }


  render () {
    const { isa, format, height, width, size, align, children, wapperStyle, imgStyle } = this.props;

    const style = {
      textAlign: align,
      transformOrigin: 'center bottom'
    };

    if (size === 'normal') {
      Object.assign(style, {
        transform: `scale(0.5)`
      })
    } else {
      Object.assign(style, {
        transform: 'none',
        marginTop: '0'
      })
    }

    wapperStyle && Object.assign(style, wapperStyle);

    const { id, selectedSection, onSectionSelect } = this.props;
    const onSelect = (e) => {
      e.stopPropagation();
      console.log('select img', id);
      if (onSectionSelect) {
        onSectionSelect(id);
      }
    };

    const selected = selectedSection === id;

    return (
      <div ref={this.divRef} style={style} className={selected ? 'selected' : ''} onClick={!!id ? onSelect : null}>
        <img src={`data:image/${format};base64,${children}`} style={imgStyle} />
      </div>
    );
  }
}
