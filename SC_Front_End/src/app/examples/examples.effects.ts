import { Injectable } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { merge } from 'rxjs';
import { tap, map, distinctUntilChanged, filter } from 'rxjs/operators';

import { TitleService } from '@app/core';
import {
  State,
  selectSettingsState,
  SettingsActions,
  SettingsActionTypes
} from '@app/settings';

@Injectable()
export class ExamplesEffects {
  constructor(
    private actions$: Actions<SettingsActions>,
    private store: Store<State>,
    private router: Router,
    private titleService: TitleService
  ) {}

  @Effect({ dispatch: false })
  setTitle = merge(
    this.actions$.pipe(ofType(SettingsActionTypes.CHANGE_LANGUAGE)),
    this.router.events.pipe(filter(event => event instanceof ActivationEnd))
  ).pipe(
    tap(() => {
      this.titleService.setTitle(
        this.router.routerState.snapshot.root
      );
    })
  );
}
