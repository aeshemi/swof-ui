import ListRow from '../ListRow';

it('ListRow renders correctly', () => {
  const wrapper = shallow(
    <ListRow
      key={19}
      day={19}
      dayOfWeek="Wed"
      engineer={{ Morning: 'Nap Nimmo', Afternoon: 'Monti Vercruysse' }}
    />
  );

  expect(wrapper).toMatchSnapshot();
});
