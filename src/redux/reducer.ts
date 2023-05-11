import {combineReducers} from '@reduxjs/toolkit';
import weather from './weather/weatherSlice';
import auth from './auth/authSlice';

const rootReducer = combineReducers({
  weather,
  auth,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
