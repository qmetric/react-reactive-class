import { useEffect } from 'react';

export default (stream$, ...subscriptors) => {
  useEffect(() => {
    const subscription = stream$.subscribe(...subscriptors);

    return () => subscription.unsubscribe();
  }, [stream$]);
};
