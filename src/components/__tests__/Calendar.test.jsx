import Calendar from '../Calendar';

describe('Calendar', () => {
  beforeAll(() => {
    fetch.mockResponse(JSON.stringify([]));
  });

  afterAll(() => {
    fetch.resetMocks();
  });

  it('should call getSchedule during componentDidMount', () => {
    const spy = jest.spyOn(Calendar.prototype, 'getSchedule');

    mount(<Calendar />);

    expect(spy).toHaveBeenCalled();
    spy.mockReset();
    spy.mockRestore();
  });

  it('BigCalendar.eventPropGetter returns correct style', () => {
    const wrapper = shallow(<Calendar />);

    expect(
      wrapper
        .find('Uncontrolled(Calendar)')
        .props()
        .eventPropGetter({ shift: 'Morning' }).className
    ).toBe('rotation morning');
  });

  it('BigCalendar.onNavigate calls setCalendarDates', () => {
    const spy = jest.spyOn(Calendar.prototype, 'setCalendarDates');
    const wrapper = shallow(<Calendar />);

    wrapper
      .find('Uncontrolled(Calendar)')
      .props()
      .onNavigate();

    expect(spy).toHaveBeenCalled();

    spy.mockReset();
    spy.mockRestore();
  });

  it('setCalendarDates only calls getSchedule when visible dates changed', () => {
    const spy = jest.spyOn(Calendar.prototype, 'getSchedule');
    const instance = shallow(<Calendar />).instance();

    const { firstVisible, lastVisible } = instance.state;

    instance.setCalendarDates(undefined);
    instance.setCalendarDates(firstVisible.add(5, 'd').toDate());
    instance.setCalendarDates(lastVisible.subtract(5, 'd').toDate());
    instance.setCalendarDates(firstVisible.add(2, 'M').toDate());
    instance.setCalendarDates(lastVisible.add(2, 'M').toDate());

    expect(spy).toHaveBeenCalledTimes(3); // 2 + componentDidMount call

    spy.mockReset();
    spy.mockRestore();
  });

  it('renders correctly with no schedules', () => {
    const wrapper = shallow(<Calendar />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly with schedules', () => {
    const wrapper = shallow(<Calendar />);

    wrapper.setState({
      schedule: [
        {
          startDateTime: '2018-08-20T09:00:00',
          endDateTime: '2018-08-20T13:00:00',
          name: 'Hetti Whatley',
          shift: 'Morning'
        },
        {
          startDateTime: '2018-08-20T13:00:00',
          endDateTime: '2018-08-20T17:00:00',
          name: 'Natalee Wigin',
          shift: 'Afternoon'
        },
        {
          startDateTime: '2018-08-21T09:00:00',
          endDateTime: '2018-08-21T13:00:00',
          name: 'Charlot Eede',
          shift: 'Morning'
        },
        {
          startDateTime: '2018-08-21T13:00:00',
          endDateTime: '2018-08-21T17:00:00',
          name: 'Monti Vercruysse',
          shift: 'Afternoon'
        },
        {
          startDateTime: '2018-08-22T09:00:00',
          endDateTime: '2018-08-22T13:00:00',
          name: 'Nicolea Appleyard',
          shift: 'Morning'
        },
        {
          startDateTime: '2018-08-22T13:00:00',
          endDateTime: '2018-08-22T17:00:00',
          name: 'Nap Nimmo',
          shift: 'Afternoon'
        },
        {
          startDateTime: '2018-08-23T09:00:00',
          endDateTime: '2018-08-23T13:00:00',
          name: 'Lethia Bonefant',
          shift: 'Morning'
        },
        {
          startDateTime: '2018-08-23T13:00:00',
          endDateTime: '2018-08-23T17:00:00',
          name: 'Sharity Dronsfield',
          shift: 'Afternoon'
        }
      ]
    });

    wrapper.update();
    expect(wrapper).toMatchSnapshot();
  });
});
