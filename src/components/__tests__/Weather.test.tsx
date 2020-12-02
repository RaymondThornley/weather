import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { AxiosResponse } from 'axios';
import Weather from '../Weather';
import ForecastCard from '../ForecastCard';
import weatherActions from '../../actions/weatherActions';
jest.mock('../../actions/weatherActions');

let wrapper: ShallowWrapper;
const mockWeatherActions = weatherActions as jest.Mocked<typeof weatherActions>;

beforeEach(() => {
    wrapper = shallow(<Weather />);
});

it("Does not render any forecast cards on start", () => {
    expect(wrapper.find(ForecastCard).length).toEqual(0);
});

it("Changes the search value on change of textbox", () => {
    wrapper.find("input").simulate("change", { target: { value: "New text" } });
    expect(wrapper.state("searchValue")).toEqual("New text");
});

it("Clears the search value on button press", () => {
    wrapper.find("input").simulate("change", { target: { value: "New text" } });
    expect(wrapper.state("searchValue")).toEqual("New text");
    wrapper.find("button").at(1).simulate("click");
    expect(wrapper.state("searchValue")).toEqual("");
});

it("Renders forecast cards after successful search", done => {
    const mockForecast = {
        data: {
            location: "Testville",
            current: {
                condition: {
                    text: "Test Condition",
                    icon: "Test Icon"
                },
                temp_f: "Test F",
                temp_c: "Test C"
            },
            forecast: {
                forecastday: [
                    {
                        date: "Day 1",
                        day: {
                            condition: {
                                text: "Test Condition",
                                icon: "Test Icon"
                            },
                            maxtemp_f: "Max F",
                            mintemp_f: "Min F",
                            maxtemp_c: "Max C",
                            mintemp_c: "Min C"
                        }
                    },
                    {
                        date: "Day 2",
                        day: {
                            condition: {
                                text: "Test Condition",
                                icon: "Test Icon"
                            },
                            maxtemp_f: "Max F",
                            mintemp_f: "Min F",
                            maxtemp_c: "Max C",
                            mintemp_c: "Min C"
                        }
                    },
                    {
                        date: "Day 3",
                        day: {
                            condition: {
                                text: "Test Condition",
                                icon: "Test Icon"
                            },
                            maxtemp_f: "Max F",
                            mintemp_f: "Min F",
                            maxtemp_c: "Max C",
                            mintemp_c: "Min C"
                        }
                    }
                ]
            }
        }
    } as AxiosResponse<any>;
    const mockForecastPromise = new Promise<AxiosResponse<any>>((resolve, reject) => { resolve(mockForecast) });
    mockWeatherActions.getForecast.mockReturnValue(mockForecastPromise);
    wrapper.find("button").at(0).simulate("click");
    setImmediate(() => {
        expect(wrapper.find(ForecastCard).length).toEqual(3);
        done();
    });
});

it("Swaps to celcius on button click", done => {
    const mockForecast = {
        data: {
            location: "Testville",
            current: {
                condition: {
                    text: "Test Condition",
                    icon: "Test Icon"
                },
                temp_f: "Test F",
                temp_c: "Test C"
            },
            forecast: {
                forecastday: [
                    {
                        date: "Day 1",
                        day: {
                            condition: {
                                text: "Test Condition",
                                icon: "Test Icon"
                            },
                            maxtemp_f: "Max F",
                            mintemp_f: "Min F",
                            maxtemp_c: "Max C",
                            mintemp_c: "Min C"
                        }
                    },
                    {
                        date: "Day 2",
                        day: {
                            condition: {
                                text: "Test Condition",
                                icon: "Test Icon"
                            },
                            maxtemp_f: "Max F",
                            mintemp_f: "Min F",
                            maxtemp_c: "Max C",
                            mintemp_c: "Min C"
                        }
                    },
                    {
                        date: "Day 3",
                        day: {
                            condition: {
                                text: "Test Condition",
                                icon: "Test Icon"
                            },
                            maxtemp_f: "Max F",
                            mintemp_f: "Min F",
                            maxtemp_c: "Max C",
                            mintemp_c: "Min C"
                        }
                    }
                ]
            }
        }
    } as AxiosResponse<any>;
    const mockForecastPromise = new Promise<AxiosResponse<any>>((resolve, reject) => { resolve(mockForecast) });
    mockWeatherActions.getForecast.mockReturnValue(mockForecastPromise);
    wrapper.find("button").at(0).simulate("click");
    setImmediate(() => {
        expect(wrapper.text()).toContain("Test F");
        wrapper.find("button").at(2).simulate("click");
        expect(wrapper.text()).toContain("Test C");
        done();
    });
});

it("Shows an error on invalid search", done => {
    const mockForecastPromise = new Promise<AxiosResponse<any>>((resolve, reject) => { reject() });
    mockWeatherActions.getForecast.mockReturnValue(mockForecastPromise);
    wrapper.find("button").at(0).simulate("click");
    setImmediate(() => {
        expect(wrapper.text()).toContain("ERROR");
        done();
    });
});
