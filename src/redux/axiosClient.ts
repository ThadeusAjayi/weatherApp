import axios, {AxiosInstance, AxiosResponse} from 'axios';
import {CityWeatherType, WeatherForecastType} from './dataTypes';

// axios.defaults.baseURL = 'http://api.weatherapi.com/v1/current.json';

const instance: AxiosInstance = axios.create({
  baseURL: 'https://api.weatherapi.com/v1',
  headers: {
    Accept: 'application/json',
  },
});

async function getRequest<T>(
  params: string,
  weatherType: string,
): Promise<AxiosResponse<T>> {
  return await instance.get(
    `${weatherType}?key=05c55569640f468eb36161646230905${params}`,
  );
}

export const CityWeather = async (city: string, weatherType = 'current.json') =>
  await getRequest<CityWeatherType>(`&q=${city}`, weatherType);

export const DashboardWeather = async (
  q: string,
  weatherType = 'forecast.json',
) =>
  await getRequest<WeatherForecastType>(
    `&q=${q}&days=1&aqi=no&alerts=no`,
    weatherType,
  );

export default instance;
