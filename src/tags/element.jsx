import React, { Component } from 'react';
import camelCase from 'camelcase';
import Blank from './blank';
import Text from './text';
import Separator from './separator';
import Table from './table';
import Command from './command';
import Img from './img';
import Qrcode from './qrcode';
import TscText from './tsc-text';
import Section from './section';

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
    },
    tsc: {
      text: TscText,
      separator: Separator,
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

      const props = {};
      Object.keys(attributes).forEach(key => {
        props[camelCase(key)] = attributes[key];
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
