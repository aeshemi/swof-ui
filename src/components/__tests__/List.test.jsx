import List from '../List';

describe('List', () => {
  beforeEach(() => {
    fetch.mockResponse(JSON.stringify([]));
  });

  afterEach(() => {
    fetch.resetMocks();
  });

  it('should call getSchedule during componentDidMount', () => {
    const spy = jest.spyOn(List.prototype, 'getSchedule');

    mount(<List />);

    expect(spy).toHaveBeenCalled();

    spy.mockReset();
    spy.mockRestore();
  });

  it('renders correctly with no schedules', done => {
    const wrapper = shallow(<List />);

    setImmediate(() => {
      wrapper.update();
      expect(wrapper).toMatchSnapshot();
      done();
    });
  });

  it('renders correctly with schedules', done => {
    fetch.mockResponse(
      JSON.stringify([
        { date: '2018-08-20T00:00:00', shift: 'Morning', name: 'Hetti Whatley' },
        { date: '2018-08-20T00:00:00', shift: 'Afternoon', name: 'Natalee Wigin' },
        { date: '2018-08-21T00:00:00', shift: 'Morning', name: 'Charlot Eede' },
        { date: '2018-08-21T00:00:00', shift: 'Afternoon', name: 'Monti Vercruysse' },
        { date: '2018-08-22T00:00:00', shift: 'Morning', name: 'Nicolea Appleyard' },
        { date: '2018-08-22T00:00:00', shift: 'Afternoon', name: 'Nap Nimmo' },
        { date: '2018-08-23T00:00:00', shift: 'Morning', name: 'Lethia Bonefant' },
        { date: '2018-08-23T00:00:00', shift: 'Afternoon', name: 'Sharity Dronsfield' },
        { date: '2018-08-24T00:00:00', shift: 'Morning', name: 'Auria De Witt' },
        { date: '2018-08-24T00:00:00', shift: 'Afternoon', name: 'Burk Maciaszek' }
      ])
    );

    const wrapper = shallow(<List />);

    setImmediate(() => {
      wrapper.update();
      expect(wrapper).toMatchSnapshot();
      done();
    });
  });

  it('click on previous/forward calls updateSchedule', () => {
    const spy = jest.spyOn(List.prototype, 'updateSchedule');
    const wrapper = shallow(<List />);

    wrapper
      .find('Button')
      .first()
      .simulate('click');

    expect(spy).toHaveBeenCalledWith(false);

    wrapper
      .find('Button')
      .last()
      .simulate('click');

    expect(spy).toHaveBeenCalledWith(true);

    spy.mockReset();
    spy.mockRestore();
  });
});
