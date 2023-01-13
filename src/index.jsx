import React, { Component } from 'react';
import Element from './tags/element';

export default class Previewer extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    console.error(error);
    return { error };
  }

  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.error) {
      return <div>{this.state.error.message}</div>;
    }

    const { dom, selectedSection, onSectionSelect } = this.props;
    const { attributes, elementName, children } = dom;

    const style = {
      padding: '16px',
      fontSize: '12px',
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
        padding: '0 4px',
        lineHeight: '14px',
        fontSize: '12px'
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
}
