import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { CommentsEffects } from './comments.effects';

describe('CommentsEffects', () => {
  let actions$: Observable<any>;
  let effects: CommentsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CommentsEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(CommentsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
