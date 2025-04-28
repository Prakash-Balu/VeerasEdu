import { ApplicationConfig, provideZoneChangeDetection, isDevMode, importProvidersFrom } from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import { provideClientHydration } from "@angular/platform-browser";
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withFetch,
} from "@angular/common/http";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { AuthInterceptor } from "./core/interceptors/auth.interceptor";
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from "../environments/environment";
// import { EffectsModule } from '@ngrx/effects';
// import { CommentsEffects } from './state/comments.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideAnimationsAsync(),
    importProvidersFrom(
      StoreModule.forRoot(reducers, { metaReducers }),
      !environment.production ? StoreDevtoolsModule.instrument() : [],
    )
  ],
};
