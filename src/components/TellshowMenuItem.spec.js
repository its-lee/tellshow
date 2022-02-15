import TellshowMenuItem from '@/components/TellshowMenuItem.vue';
import boundShallowMount from '@/helpers/test/boundShallowMount';

describe('TellshowMenuItem.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = boundShallowMount(TellshowMenuItem, {
      propsData: {
        label: 'some label',
        selected: false
      }
    });
  });

  it('correctly handles the passed props', () => {
    expect(wrapper.props().label).toEqual('some label');
    expect(wrapper.props().selected).toEqual(false);
  });
});
