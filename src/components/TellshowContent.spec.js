import TellshowContent from '@/components/TellshowContent.vue';
import boundShallowMount from '@/helpers/test/boundShallowMount';

describe('TellshowContent.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = boundShallowMount(TellshowContent, {
      propsData: {
        loading: false,
        items: []
      }
    });
  });

  it('correctly handles the passed props', () => {
    expect(wrapper.props().loading).toEqual(false);
    expect(wrapper.props().items).toEqual([]);
  });

  it('renders the component as main content', () => {
    wrapper.setProps({ loading: true });
    expect(wrapper.find('.main-content').exists()).toEqual(true);
  });
});
