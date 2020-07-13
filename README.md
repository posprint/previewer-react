# POS Print Previewer React

Previewer of template for POS Print in React

## Usage

```javascript
import { hydrate } from 'pos-print-template-jsx';
import Previewer from 'pos-print-previewer-react';

function render(props) {
  const { template, style, data, printer } = props;
  const dom = hydrate(template, style, data, printer);
  return <Previewer dom={dom} />;
}
```
