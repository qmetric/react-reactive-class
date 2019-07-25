import React from 'react';
import createReactiveClass from './createReactiveClass';
import DOM from 'react-dom-factories';

export function reactive(reactClass) {
  return createReactiveClass(reactClass);
}

export const dom = Object.keys(DOM).reduce((result, tag) => {
  result[tag] = createReactiveClass(tag);
  return result;
}, {});
