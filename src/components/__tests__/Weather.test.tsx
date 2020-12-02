import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Weather from '../Weather';
import ForecastCard from '../ForecastCard';

let wrapper: ShallowWrapper;

beforeEach(() => {
    wrapper = shallow(<Weather />);
});

it("Does not render any forecast cards on start", () => {
    expect(wrapper.find(ForecastCard).length).toEqual(0);
});
