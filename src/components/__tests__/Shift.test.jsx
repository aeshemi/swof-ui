import Shift from '../Shift';

it('Shift renders correctly', () => {
  const wrapper = shallow(<Shift shift="Morning" name="Nap Nimmo" />);
  expect(wrapper).toMatchSnapshot();
});
