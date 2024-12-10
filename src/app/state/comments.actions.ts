import { createAction, props } from '@ngrx/store';
import { Comment, Reply } from './comments.model';

export const loadComments = createAction(
  '[Comments] Load Comments',
  props<{ segmentId: string }>()
);

export const loadCommentsSuccess = createAction(
  '[Comments] Load Comments Success',
  props<{ comments: Comment[] }>()
);

export const loadCommentsFailure = createAction(
  '[Comments] Load Comments Failure',
  props<{ error: any }>()
);

export const addComment = createAction(
  '[Comments] Add Comment',
  props<{ comment: Comment }>()
);

export const addReply = createAction(
  '[Comments] Add Reply',
  props<{ commentId: string; reply: Reply }>()
);