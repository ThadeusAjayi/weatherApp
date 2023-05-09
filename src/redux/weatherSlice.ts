import {createSlice} from '@reduxjs/toolkit';

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    weatherSearch: [],
    weatherDashboard: [],
  },
  reducers: {
    setWeatherSearch: (state, action) => {
      state.weatherSearch = action.payload;
    },
    setDashboardWeather: (state, action) => {
      state.weatherDashboard = action.payload;
    },
  },
});

export const {setWeatherSearch, setDashboardWeather} = weatherSlice.actions;

export default weatherSlice.reducer;
