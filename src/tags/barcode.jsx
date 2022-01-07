import React, { Component } from 'react';
import bwipjs from 'bwip-js';

export default class extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.generate();
  }

  componentDidUpdate () {
    this.generate();
  }

  generate () {
    try {
      const { type = '', children, width, height } = this.props;
      bwipjs.toCanvas('barcode-canvas', {
        bcid: type.toLowerCase() || 'code128',
        text: children,
        scale: parseInt(width) || 1,
        height: parseInt(height) || 10,
        includetext: true,
        textxalign: 'center'
      });
    } catch (e) {
       console.error(e.message);
    }
  }

  render () {
    const { align } = this.props;
    const style = {
      textAlign: align || 'center',
    };

    return (
      <div style={style}>
        <canvas id="barcode-canvas"></canvas>
      </div>
    );
  }
}
