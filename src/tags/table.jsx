import React from 'react';
import humps from 'humps';

import Text from './text';

function Row(props) {
  const { tableProps, tr, ...rest } = props;
  const { attributes, children } = tr;

  const trProps = {};
  if (attributes) {
    Object.keys(attributes).forEach(key => {
      trProps[humps.camelize(key)] = attributes[key];
    });
  }
  const rowProps = Object.assign({ ...rest }, tableProps, trProps);

  const { widths, aligns, overflows } = rowProps;

  return (
    <tr>
      {children &&
        typeof children.map === 'function' &&
        children.map((td, i) => (
          <Cell
            key={i}
            width={widths[i]}
            align={aligns[i]}
            overflow={overflows[i]}
            rowProps={rowProps}
            td={td}
          />
        ))}
    </tr>
  );
}

function Cell(props) {
  const { rowProps, td, ...rest } = props;
  const { attributes, children } = td;

  const tdProps = {};
  if (attributes) {
    Object.keys(attributes).forEach(key => {
      tdProps[humps.camelize(key)] = attributes[key];
    });
  }
  const cellProps = Object.assign({ ...rest }, rowProps, tdProps);

  const { width, align, overflow } = cellProps;

  const style = {
    margin: 0,
    padding: 0,
    verticalAlign: 'top'
  };
  if (width) {
    style.width = `${width}%`;
  }

  if (align) {
    style.textAlign = align;
  }

  return (
    <td style={style}>
      <Text {...cellProps} children={children} />
    </td>
  );
}

export default function (props) {
  const { columnsWidth, columnsAlign, columnsOverflow, children } = props;

  const style = {
    width: '100%',
    tableLayout: 'fixed',
    borderSpacing: 0,
    borderCollapse: 'collapse',
  };

  let widths = [];
  if (columnsWidth) {
    const intWidths = columnsWidth.split(',').map(x => parseFloat(x));
    const wholeWidth = intWidths.reduce((sum, x) => sum + x, 0);
    widths = intWidths.map(x => (x / wholeWidth) * 100);
  }

  let aligns = [];
  if (columnsAlign) {
    aligns = columnsAlign.split(',');
  }

  let overflows = [];
  if (columnsOverflow) {
    overflows = columnsOverflow.split(',');
  }

  return (
    <table style={style}>
      <tbody>
        {children &&
          typeof children.map === 'function' &&
          children.map((tr, i) => (
            <Row
              key={i}
              widths={widths}
              aligns={aligns}
              overflows={overflows}
              tableProps={props}
              tr={tr}
            />
          ))}
      </tbody>
    </table>
  );
}
