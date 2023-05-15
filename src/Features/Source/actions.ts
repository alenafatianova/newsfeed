import { apiFetchSources } from '@components/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchSources = createAsyncThunk('api/fetchSources', (_, thunk) => {
  apiFetchSources().then((sources) => {
    thunk.dispatch(setSources(sources));
  });
});
