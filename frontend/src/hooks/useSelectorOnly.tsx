import { isDeepEqual } from '@cads-ui/core';
import { useSelector } from 'react-redux';

// Get only the necessary keys in redux, avoid unnecessary re-render
// Ex: const { name, email } = useSelectorOnly('user', ['name', 'email'])
function useSelectorOnly(reducerKey: string, specifiedKeys: string[] = [], isExclude = false) {
  return useSelector((state: any) => {
    const selector = state[reducerKey];

    if (!selector) return {};
    if (typeof selector !== 'object') return selector;

    const data = {};

    if (!isExclude) {
      specifiedKeys.forEach((key) => Object.assign(data, { [key]: selector[key] }));
    } else {
      Object.keys(selector).forEach((key) => {
        if (specifiedKeys.findIndex((s) => s === key) === -1) {
          Object.assign(data, { [key]: selector[key] });
        }
      });
    }

    return data;
  }, isDeepEqual);
}

export default useSelectorOnly;
