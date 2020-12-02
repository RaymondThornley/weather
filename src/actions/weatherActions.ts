import axios from 'axios';

const uri = "https://api.weatherapi.com/v1/";
const apiKey = "816bb17f408d43a6a9a183505200112";

const weatherActions = {
    getForecast: function (location: string, days: number) {
        return axios.get(uri + "forecast.json?key=" + apiKey + "&q=" + location + "&days=" + days);
    }
}

export default weatherActions;
