import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CommentsService } from '../core/services/comments.service';
import * as CommentsActions from './comments.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class CommentsEffects {
  constructor(
    private actions$: Actions,
    private commentsService: CommentsService
  ) {}

  loadComments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CommentsActions.loadComments),
      mergeMap(({ segmentId }) =>
        this.commentsService.viewComments(segmentId).pipe(
          map((comments) =>
            CommentsActions.loadCommentsSuccess({ comments: comments.data })
          ),
          catchError((error) =>
            of(CommentsActions.loadCommentsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  addComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CommentsActions.addComment),
      mergeMap(({ comment }) =>
        this.commentsService.addComments(comment).pipe(
          map(() => 
            CommentsActions.loadComments({ segmentId: comment.segmentId })
          ),
          catchError((error) => 
            of(CommentsActions.loadCommentsFailure({ error }))
          )
        )
      )
    )
  );
}
