import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import * as firebase from 'firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { LoginPage } from '../pages/Auths/login/login';
import { ChangePasswordPage } from '../pages/Settings/change-password/change-password';
import { SettingsPage } from '../pages/MainPages/settings/settings';
import { FilesPage } from '../pages/MainPages/files/files';
import { TasksPage } from '../pages/MainPages/tasks/tasks';
import { AddTaskPage } from '../pages/Tasks/add-task/add-task';
import { MessagingPage } from '../pages/MainPages/messaging/messaging';
import { AddEmployeePage } from '../pages/AdminModules/add-employee/add-employee';
import { AdminDashboardPage } from '../pages/Dashboards/admin-dashboard/admin-dashboard';
import { SendMessagePage } from '../pages/Messsaging/send-message/send-message';
import { ViewMessagePage } from '../pages/Messsaging/view-message/view-message';



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
    LoginPage,
    ChangePasswordPage,
    FilesPage,
    TasksPage,
    AddTaskPage,
    MessagingPage,
    SettingsPage,
    AddEmployeePage,
    AdminDashboardPage,
    SendMessagePage,
    ViewMessagePage,
    
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
    LoginPage,
    ChangePasswordPage,
    FilesPage,
    TasksPage,
    AddTaskPage,
    MessagingPage,
    SettingsPage,
    AddEmployeePage,
    AdminDashboardPage,
    SendMessagePage,
    ViewMessagePage,
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
