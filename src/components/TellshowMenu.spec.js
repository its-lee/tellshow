import TellshowMenu from '@/components/TellshowMenu.vue';
import TellshowMenuItem from '@/components/TellshowMenuItem.vue';
import boundShallowMount from '@/helpers/test/boundShallowMount';

describe('TellshowMenu.vue', () => {
  const defaultItems = [
    {
      id: 1,
      label: 'x'
    },
    {
      id: 2,
      label: 'y'
    }
  ];

  let wrapper;

  beforeEach(() => {
    wrapper = boundShallowMount(TellshowMenu, {
      propsData: {
        selected: 1,
        items: defaultItems
      }
    });
  });

  it('contains at least one div, even if there are no items', () => {
    expect(wrapper.findAll('div div').length).toBeGreaterThanOrEqual(1);
  });

  it('contains as many menu item components as menu items', () => {
    expect(wrapper.findAllComponents(TellshowMenuItem).length).toEqual(defaultItems.length);
  });

  it('correctly propagates click events on items', () => {
    // shallowMount stubs child components, so we can't expect to be able to trigger clicks on
    // child menu items and have the clicks bubble up. This is reflective of the fact that this
    // is a unit test - and not a integration test on this component and the child components -
    // which is a good thing!
    const id = '1234';
    wrapper.vm.itemClick(id);
    expect(wrapper.emitted('itemClick')).toHaveLength(1);
    expect(wrapper.emitted('itemClick')).toMatchObject([[id]]);
  });
});
