import React from 'react';
import { shallow } from 'enzyme';
import App from '../../../../src/MyApp';

describe('Testing enzyme is working', () => {
	it('should render a React component for testing', () => {
		const wrapper = shallow(<App />);
		expect(wrapper.find('div').length).toBe(1);
	});
});
