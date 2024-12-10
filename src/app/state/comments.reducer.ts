import { createReducer, on } from '@ngrx/store';
import { Comment } from './comments.model';
import * as CommentsActions from './comments.actions';

export const commentsFeatureKey = 'comments';

export interface CommentsState {
  comments: Comment[];
  error: any;
}

export const initialState: CommentsState = {
  comments: [],
  error: null,
};

export const commentsReducer = createReducer(
  initialState,
  on(CommentsActions.loadCommentsSuccess, (state, { comments }) => ({
    ...state,
    comments,
    error: null,
  })),
  on(CommentsActions.loadCommentsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(CommentsActions.addComment, (state, { comment }) => ({
    ...state,
    comments: [...state.comments, comment],
  })),
  on(CommentsActions.addReply, (state, { commentId, reply }) => ({
    ...state,
    comments: state.comments.map((comment) =>
      comment._id === commentId
        ? {
            ...comment,
            replies: [...comment.replies, reply],
          }
        : comment
    ),
  }))
);

