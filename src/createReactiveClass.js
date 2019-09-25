import React from 'react';
import {isRxObservable, pickProps} from './utils';

export default function createReactiveClass(tag) {
  class ReactiveClass extends React.PureComponent {
    constructor(props) {
      super(props);
      this.displayName = `ReactiveElement-${tag}`;
      this.state = pickProps(props, (key, value) => !isRxObservable(value));
      this.state.mount = true;

      this.subscribe(this.props);
    }

    componentDidUpdate() {
      this.subscribe(props);
      this.setState(pickProps(props, (key, value) => !isRxObservable(value)));
    }

    componentWillUnmount() {
      this.unsubscribe();
    }

    addPropListener(name, prop$) {
      return prop$.subscribe((value) => {
        // don't re-render if value is the same.
        if (value === this.state[name]) {
          return;
        }

        const prop = {};
        prop[name] = value;
        this.setState(prop);
      });
    }

    subscribe(props) {
      if (this.subscriptions) {
        this.unsubscribe();
      }

      this.subscriptions = Object.keys(props).reduce((acc, key) => {
        const value = props[key];
        if (isRxObservable(value)) {
          const subscription = this.addPropListener(key, value);
          acc.push(subscription);
        }
      }, []);
    }

    unsubscribe() {
      this.subscriptions.forEach(subscription => subscription.unsubscribe());
      this.subscriptions = null;
    }

    render() {
      if (!this.state.mount) {
        return null;
      }

      const finalProps = pickProps(this.state, (key) => key !== 'mount');
      return React.createElement(tag, finalProps);
    }
  }

  return ReactiveClass;
}
