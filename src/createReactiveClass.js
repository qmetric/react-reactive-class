import React from 'react';
import useSubscription from './useSubscription';
import mapValues from 'lodash/fp/mapValues';
import omit from 'lodash/fp/omit';

export default component => React.forwardRef((props, ref) => {
  const usePropSubscription = prop$ => {
    const [prop, setProp] = React.useState();

    useSubscription(prop$, setProp);

    return prop;
  };

  const newProps = {
    ...mapValues(prop => (prop.subscribe ? usePropSubscription(prop) : prop), props),
    ref
  };

  return React.createElement(
    React.Fragment,
    {},
    props.mount && !newProps.mount ? null : React.createElement(component, omit('mount', newProps))
  );
});
