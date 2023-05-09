import {configureStore} from '@reduxjs/toolkit';
import weather from './weatherSlice';

export default configureStore({
  reducer: {weather},
});
