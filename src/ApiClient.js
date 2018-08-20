const apiBaseUri = process.env.REACT_APP_API_BASE_URI;
const resourceName = 'schedule';

const fetchJSON = (url, verb, data) => {
  const method = verb || 'GET';
  const requestUrl = `${apiBaseUri}/${resourceName}/${url}`;

  let options = { method };

  if (data) {
    options = {
      ...options,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };
  }

  const request = method === 'GET' ? fetch(requestUrl) : fetch(requestUrl, options);

  return request
    .then(response => response.json())
    .catch(e => console.log('Error caught in catch', e)); // eslint-disable-line no-console
};

const ApiClient = {
  getCalendar(startDate) {
    return fetchJSON(`${startDate}/calendar`);
  },
  getList(startDate) {
    return fetchJSON(`${startDate}/list`);
  },
  generateSchedule() {
    return fetchJSON('generate', 'POST');
  }
};

export default ApiClient;
