import { Injectable } from '@angular/core';
import { Auth, authState, getAuth } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from '@firebase/auth';
import { from, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  currentUser$ = authState(this.auth);
 
  constructor(private auth: Auth) {
   }

  login(username: string, password: string){
    return from(signInWithEmailAndPassword(this.auth, username, password)); // returns a promise (observable)
  }

  signUp(name: string, email: string, password: string){
    return from(createUserWithEmailAndPassword(this.auth, email, password)
    ).pipe(switchMap(({ user }) => updateProfile(user, { displayName: name })));
  }

  logout(){
    return from(this.auth.signOut());
  }

  getUid() {
    this.auth.currentUser?.getIdToken()
  }

}
