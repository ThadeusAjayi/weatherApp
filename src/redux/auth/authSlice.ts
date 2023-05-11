import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {loginService} from '../axiosClient';
import {UserType} from '../dataTypes';

export const login = createAsyncThunk(
  'auth/login',
  async (data: {email: string}) => {
    const response = await loginService(data);
    return response;
  },
);
export interface AuthState {
  auth: UserType | undefined;
  authStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  authError: any;
}

const initialState = {
  auth: undefined,
  authStatus: 'idle',
  authError: null,
} as AuthState;

const authSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    logout: state => {
      state.auth = undefined;
    },
  },
  extraReducers: builder => {
    builder.addCase(login.pending, state => {
      state.authStatus = 'loading';
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.authStatus = 'succeeded';
      state.auth = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.authStatus = 'failed';
      state.authError = action.payload;
    });
  },
});

export const {logout} = authSlice.actions;

export default authSlice.reducer;
