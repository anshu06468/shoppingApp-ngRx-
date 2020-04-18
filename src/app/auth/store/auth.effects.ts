import { Actions, ofType, Effect } from '@ngrx/effects';

import * as AuthActions from './auth.action'
import { switchMap, catchError,map} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';

export interface authReturnData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean
  }

export class AuthEffects {
    @Effect()
    authLogin = this.action$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData: AuthActions.LoginStart) => {
            return this.http.post<authReturnData>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + environment.FirebaseApiKey,
                {
                    email: authData.payload.email,
                    password: authData.payload.password,
                    returnSecureToken: true
                }
            ).pipe(
                map(respData=> {
                    const expirationDate = new Date(new Date().getTime() + +respData.expiresIn * 1000);
                    return of(new AuthActions.LogIn({
                        email:respData.email,
                        userId:respData.localId,
                        token:respData.idToken,
                        expirationDate:expirationDate
                    }))
                }),
                catchError(error=> {
                    
                    return of()
            }),
                )
        })

    )
    constructor(private action$: Actions,private http:HttpClient) { }
}