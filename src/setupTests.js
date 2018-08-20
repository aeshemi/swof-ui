/* eslint import/no-extraneous-dependencies: ["error", { "devDependencies": true }] */

import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import fetch from 'jest-fetch-mock';
import React from 'react';

Enzyme.configure({ adapter: new Adapter() });

global.shallow = shallow;
global.mount = mount;

global.fetch = fetch;

global.React = React;
