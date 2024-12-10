import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CommentsState } from './comments.reducer';

export const selectCommentsState = createFeatureSelector<CommentsState>('comments');

export const selectComments = createSelector(
    selectCommentsState,
    (state) => state.comments
);

export const selectError = createSelector(
    selectCommentsState,
    (state) => state.error
  );