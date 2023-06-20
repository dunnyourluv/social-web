
export interface WeatherMain {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
}

export interface WeatherSys {
    country: string;
    sunrise: number;
    sunset: number;
    id: number;
    type: number;
}

export interface WeatherWeather {
    description: string;
    icon: string;
    id: number;
    main: string;
}

export interface WeatherWind {
    deg: number;
    gust: number;
    speed: number;
}

export interface WeatherData {
    main: WeatherMain;
    name: string;
    sys: WeatherSys;
    timezone: number;
    visibility: number;
    weather: WeatherWeather[];
    wind: WeatherWind;
}

class Weather {
    private static _apiKey: string = "2c3bd97b71d45a3c90292303fc7e4973";
    
    public static async getWeather(city: string): Promise<WeatherData> {
        return fetch("https://api.openweathermap.org/data/2.5/weather?q=" + encodeURIComponent(city) + "&appid=" + this._apiKey + "&units=metric&lang=vi").then(res => res.json()).then(data => data).catch(e => e);
    }
}

export default Weather;