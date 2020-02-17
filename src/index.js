import createReactiveClass from './createReactiveClass';
import _useSubscription_ from './useSubscription';
import DOM from 'react-dom-factories';

export const useSubscription = _useSubscription_;

export const reactive = createReactiveClass;

export const dom = Object.keys(DOM).reduce((result, tag) => {
  result[tag] = createReactiveClass(tag);
  return result;
}, {});
