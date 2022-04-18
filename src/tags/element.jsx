import React, { Component } from 'react';
import humps from 'humps';
import Blank from './blank';
import Text from './text';
import Separator from './separator';
import Table from './table';
import Command from './command';
import Img from './img';
import Qrcode from './qrcode';
import TscText from './tsc-text';
import Section from './section';
import BarCode from './barcode';

export default class extends Component {
  components = {
    esc: {
      text: Text,
      blank: Blank,
      separator: Separator,
      table: Table,
      command: Command,
      img: Img,
      qrcode: Qrcode,
      section: Section,
      barcode: BarCode
    },
    tsc: {
      text: Text,
      separator: Separator,
      qrcode: Qrcode,
    },
  };

  render() {
    const { isa, node, selectedSection, onSectionSelect } = this.props;

    const type = typeof node;
    if (type === 'string') {
      return node;
    } else if (type === 'object') {
      const { elementName, attributes, children } = node;
      const Comp = this.components[isa][elementName];

      const props = { isa };
      Object.keys(attributes).forEach(key => {
        props[humps.camelize(key)] = attributes[key];
      });

      if (Comp) {
        return (
          <Comp
            {...props}
            children={children}
            selectedSection={selectedSection}
            onSectionSelect={onSectionSelect}
          />
        );
      } else {
        throw new Error(`unexpected element: ${elementName}`);
      }
    } else {
      throw new Error(`unsupported dom node type: ${type}`);
    }
  }
}
