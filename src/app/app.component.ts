import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ToastController } from 'ionic-angular';

import * as firebase from 'firebase';
import { LoginPage } from '../pages/Auths/login/login';
import { SettingsPage } from '../pages/MainPages/settings/settings';
import { TasksPage } from '../pages/MainPages/tasks/tasks';
import { FilesPage } from '../pages/MainPages/files/files';
import { MessagingPage } from '../pages/MainPages/messaging/messaging';
import { AdminDashboardPage } from '../pages/Dashboards/admin-dashboard/admin-dashboard';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  activePage: any;


  pages: Array<{ title: string, component: any, icon: any, color: string }>;

  constructor(
    public platform: Platform,
    public toastCtrl: ToastController,
  ) {
    this.initializeApp();

    this.pages = [
      { title: 'Admin DashBoard', component: AdminDashboardPage, icon: "flash", color: "yellowi" },
      { title: 'Tasks', component: TasksPage, icon: "md-checkbox-outline", color: "whiter" },
      { title: 'Files', component: FilesPage, icon: "md-folder", color: "whiter" },
      { title: 'Messaging', component: MessagingPage, icon: "md-chatbubbles", color: "whiter" },
      { title: 'Settings', component: SettingsPage, icon: "md-cog", color: "whiter" },


    ];
    this.activePage = this.pages[0];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.rootPage = AdminDashboardPage;
        }
        else {
          this.rootPage = LoginPage;
        }
      });
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
    this.activePage = page;

  }
  checkActive(page) {
    return page == this.activePage;
  }

  signOut() {
    firebase.auth().signOut().then(() => {
      this.nav.setRoot(LoginPage);
      this.presentToast("Signed Out");
    }).catch((error) => {
      console.log(error.message);
    });


  }
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 4000,
      position: "top",
      showCloseButton: false,
    });
    toast.present();
  }
  // collapse() {
  //   this.full = false;
  // }
  // expand() {
  //   this.full = true;
  // }

}
