
# React Rx Props

Take a React element that receives a RxJS Observable as a property and replace it with a subscribed property of the same name.

## Example

Assumes that the prop `rxStore` being passed is an RxJS observable with a `.title` property. When the observable stream updates with a new title value `TitleComponent` will update as well.

```javascript
import RxProps from 'react-rx-props';

const TitleComponent = ({
  rxStore
}) => (<h1>{ rxStore.title }</h1>);

export default RxProps(TitleComponent);
```
