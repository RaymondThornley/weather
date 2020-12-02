import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import ForecastCard from '../ForecastCard';

it("Renders Fahrenheit data", () => {
    const props = {
        isMetric: false,
        date: "date",
        condition: "weather",
        conditionIcon: "icon",
        high: "high",
        low: "low"
    }
    const wrapper = shallow(<ForecastCard {...props} />);
    expect(wrapper.text()).toContain("F");
    expect(wrapper.text()).not.toContain("C");
});

it("Renders Fahrenheit data", () => {
    const props = {
        isMetric: true,
        date: "date",
        condition: "weather",
        conditionIcon: "icon",
        high: "high",
        low: "low"
    }
    const wrapper = shallow(<ForecastCard {...props} />);
    expect(wrapper.text()).not.toContain("F");
    expect(wrapper.text()).toContain("C");
});
