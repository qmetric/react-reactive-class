import DOM from 'react-dom-factories';
import createReactiveClass from './createReactiveClass';

export function reactive(reactClass) {
  return createReactiveClass(reactClass);
}

export const dom = Object.keys(DOM).reduce((result, tag) => {
  // eslint-disable-next-line no-param-reassign
  result[tag] = createReactiveClass(tag);
  return result;
}, {});
