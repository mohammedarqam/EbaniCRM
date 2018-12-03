import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import * as firebase from 'firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { DashboardPage } from '../pages/MainPages/dashboard/dashboard';
import { LoginPage } from '../pages/Auths/login/login';
import { ChangePasswordPage } from '../pages/Settings/change-password/change-password';
import { SettingsPage } from '../pages/MainPages/settings/settings';



export const firebaseCred = {
  apiKey: "AIzaSyD6PBJ3vQ31XhrHlnrtRRFHWn8T-SYd10c",
  authDomain: "ebanicrm.firebaseapp.com",
  databaseURL: "https://ebanicrm.firebaseio.com",
  projectId: "ebanicrm",
  storageBucket: "ebanicrm.appspot.com",
  messagingSenderId: "465450608364"
};
firebase.initializeApp(firebaseCred);




@NgModule({
  declarations: [
    MyApp,
    DashboardPage,
    LoginPage,
    ChangePasswordPage,
    SettingsPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseCred),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DashboardPage,
    LoginPage,
    ChangePasswordPage,
    SettingsPage,
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
