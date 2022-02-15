import { shallowMount } from '@vue/test-utils';
import merge from 'lodash.merge';

// Using just shallowMount to build partially mocked components is great - but when using these,
// the component may make use of other plugins that shallowMount doesn't account for. This utility
// allows us to inject mocks for these plugins.

export default function(component, options) {
  return shallowMount(
    component,
    merge(
      {
        propsData: {},
        mocks: {
          // From VueI18n
          $t: m => m
        }
      },
      options || {}
    )
  );
}
