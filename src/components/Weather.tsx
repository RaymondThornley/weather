import React, { ChangeEvent } from 'react';
import { Container } from 'react-bootstrap';
import ForecastCard from './ForecastCard';
import weatherActions from '../actions/weatherActions';
import '../css/weather.css';

type forecastWeatherType = {
    date: string,
    condition: string,
    conditionIcon: string,
    highF: string,
    lowF: string,
    highC: string,
    lowC: string
}

type weatherState = {
    searchValue: string,
    hasSearched: boolean,
    isMetric: boolean,
    currentWeather: {
        location: string,
        condition: string,
        conditionIcon: string,
        temperatureF: string,
        temperatureC: string
    },
    forecastWeather: forecastWeatherType[],
    hasError: boolean,
    errorString: string
}

class Weather extends React.Component<{}, weatherState>{
    constructor(props: {}) {
        super(props);

        this.state = {
            searchValue: "",
            hasSearched: false,
            isMetric: false,
            currentWeather: {
                location: "",
                condition: "",
                conditionIcon: "",
                temperatureF: "",
                temperatureC: ""
            },
            forecastWeather: [],
            hasError: false,
            errorString: ""
        }

        this.changeSearchValue = this.changeSearchValue.bind(this);
        this.searchWeather = this.searchWeather.bind(this);
        this.clearSearch = this.clearSearch.bind(this);
        this.toggleMetric = this.toggleMetric.bind(this);
        this.createForecastCard = this.createForecastCard.bind(this);
    }

    changeSearchValue(event: ChangeEvent<HTMLInputElement>) {
        this.setState({ searchValue: event.target.value });
    }

    searchWeather() {
        const searchValue = this.state.searchValue
        weatherActions.getForecast(searchValue, 3).then(response => {
            const currentWeather = {
                location: response.data.location.name,
                condition: response.data.current.condition.text,
                conditionIcon: response.data.current.condition.icon,
                temperatureF: response.data.current.temp_f,
                temperatureC: response.data.current.temp_c
            }
            const forecastWeather = response.data.forecast.forecastday.map(function (forecastDay: any) {
                return {
                    date: forecastDay.date,
                    condition: forecastDay.day.condition.text,
                    conditionIcon: forecastDay.day.condition.icon,
                    highF: forecastDay.day.maxtemp_f,
                    lowF: forecastDay.day.mintemp_f,
                    highC: forecastDay.day.maxtemp_c,
                    lowC: forecastDay.day.mintemp_c
                }
            });
            this.setState({ currentWeather, forecastWeather, hasSearched: true, hasError: false, errorString: "" });
        }).catch(error => {
            const errorString = "ERROR: Location " + searchValue + " is not found!"
            this.setState({ hasSearched: false, hasError: true, errorString })
        });
    }

    clearSearch() {
        this.setState({ searchValue: "", hasSearched: false, hasError: false, errorString: "" });
    }

    toggleMetric() {
        this.setState({ isMetric: !this.state.isMetric });
    }

    createForecastCard(forecastWeather: forecastWeatherType, index: number) {
        return (
            <ForecastCard
                isMetric={this.state.isMetric}
                date={forecastWeather.date}
                condition={forecastWeather.condition}
                conditionIcon={forecastWeather.conditionIcon}
                high={this.state.isMetric ? forecastWeather.highC : forecastWeather.highF}
                low={this.state.isMetric ? forecastWeather.lowC : forecastWeather.lowF}
                key={index}
            />
        );
    }

    render() {
        const currentTemperature = this.state.isMetric ? this.state.currentWeather.temperatureC : this.state.currentWeather.temperatureF;
        const toggleMetricButtonText = this.state.isMetric ? "Set to Fahrenheit" : "Set to Celsius";

        return (
            <Container className="weatherContainer">
                <h1>Weather</h1>
                <div>Please enter location:</div>
                <input value={this.state.searchValue} onChange={this.changeSearchValue} />
                <button onClick={this.searchWeather}>Search</button>
                <button onClick={this.clearSearch}>Clear</button>
                {this.state.hasError ?
                    <div>{this.state.errorString}</div>
                    : null}
                {this.state.hasSearched ?
                    <React.Fragment>
                        <h4>Current weather at {this.state.currentWeather.location}:</h4>
                        <div className="currentWeatherContainer">
                            <div>
                                <img src={this.state.currentWeather.conditionIcon} alt="" />
                            </div>
                            <div className="currentWeatherConditionText">{this.state.currentWeather.condition}</div>
                            <div>{currentTemperature} &deg;{this.state.isMetric ? "C" : "F"}</div>
                        </div>
                        <h5>Three day forecast:</h5>
                        <div>
                            {this.state.forecastWeather.map(this.createForecastCard)}
                        </div>
                        <button onClick={this.toggleMetric}>{toggleMetricButtonText}</button>
                    </React.Fragment>
                    : null}
            </Container>
        );
    }
}

export default Weather;
