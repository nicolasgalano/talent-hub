import { configureStore } from '@reduxjs/toolkit';
// reducer
import jobs from './slices/jobsSlices';
import professionals from './slices/professionalsSlices';

export const store = configureStore({
  reducer: {
    jobs,
    professionals,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch