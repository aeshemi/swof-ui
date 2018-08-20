import NotFound from '../NotFound';

it('NotFound renders correctly', () => {
  const wrapper = shallow(<NotFound />);
  expect(wrapper).toMatchSnapshot();
});
