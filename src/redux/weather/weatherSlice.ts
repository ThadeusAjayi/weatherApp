import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {CityWeather, DashboardWeather} from '../axiosClient';
import {CityWeatherType, ForecastDayType} from '../dataTypes';

export const fetchCityWeather = createAsyncThunk(
  'weather/fetchCityWeather',
  async (city: string) => {
    const response = await CityWeather(city);
    return response.data as CityWeatherType;
  },
);

export const fetchDashboardWeather = createAsyncThunk(
  'weather/fetchDashboardWeather',
  async (city: string) => {
    const response = await DashboardWeather(city);
    return response.data.forecast.forecastday[0];
  },
);
export interface WeatherState {
  weatherSearch: CityWeatherType | undefined;
  weatherSearchStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  weatherSearchError: any;
  weatherDashboard: ForecastDayType | undefined;
  weatherDashboardStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  weatherDashboardError: any;
}

const initialState = {
  weatherSearch: undefined,
  weatherSearchStatus: 'idle',
  weatherSearchError: null,
  weatherDashboard: undefined,
  weatherDashboardStatus: 'idle',
  weatherDashboardError: null,
} as WeatherState;

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setWeather: (state, action) => {
      state.weatherSearch = action.payload;
    },
    setDashboardWeather: (state, action) => {
      state.weatherDashboard = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchCityWeather.pending, state => {
      state.weatherSearchStatus = 'loading';
    });
    builder.addCase(fetchCityWeather.fulfilled, (state, action) => {
      state.weatherSearchStatus = 'succeeded';
      state.weatherSearch = action.payload;
    });
    builder.addCase(fetchCityWeather.rejected, (state, action) => {
      state.weatherSearchStatus = 'failed';
      state.weatherSearchError = action.payload;
    });
    builder.addCase(fetchDashboardWeather.pending, state => {
      state.weatherDashboardStatus = 'loading';
    });
    builder.addCase(fetchDashboardWeather.fulfilled, (state, action) => {
      state.weatherDashboardStatus = 'succeeded';
      state.weatherDashboard = action.payload;
    });
    builder.addCase(fetchDashboardWeather.rejected, (state, action) => {
      state.weatherDashboardStatus = 'failed';
      state.weatherSearchError = action.payload;
    });
  },
});

export const {setWeather, setDashboardWeather} = weatherSlice.actions;

export default weatherSlice.reducer;
