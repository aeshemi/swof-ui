import Generator from '../Generator';

describe('Generator', () => {
  it('renders correctly on init', () => {
    const wrapper = shallow(<Generator />);
    expect(wrapper).toMatchSnapshot();
  });

  it('click on generate calls generateSchedule and returns results', done => {
    fetch.mockResponse(
      JSON.stringify([
        { date: '2018-08-20T00:00:00', shift: 'Morning', engineerId: 6 },
        { date: '2018-08-20T00:00:00', shift: 'Afternoon', engineerId: 7 },
        { date: '2018-08-21T00:00:00', shift: 'Morning', engineerId: 10 },
        { date: '2018-08-21T00:00:00', shift: 'Afternoon', engineerId: 5 },
        { date: '2018-08-22T00:00:00', shift: 'Morning', engineerId: 4 },
        { date: '2018-08-22T00:00:00', shift: 'Afternoon', engineerId: 9 },
        { date: '2018-08-23T00:00:00', shift: 'Morning', engineerId: 8 },
        { date: '2018-08-23T00:00:00', shift: 'Afternoon', engineerId: 3 },
        { date: '2018-08-24T00:00:00', shift: 'Morning', engineerId: 1 },
        { date: '2018-08-24T00:00:00', shift: 'Afternoon', engineerId: 2 }
      ])
    );

    const spy = jest.spyOn(Generator.prototype, 'generateSchedule');
    const wrapper = shallow(<Generator />);

    wrapper.find('Button').simulate('click');

    setImmediate(() => {
      wrapper.update();

      expect(spy).toHaveBeenCalled();
      expect(wrapper).toMatchSnapshot();

      spy.mockReset();
      spy.mockRestore();

      fetch.resetMocks();

      done();
    });
  });
});
