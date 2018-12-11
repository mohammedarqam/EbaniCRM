import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import * as firebase from 'firebase';
import { LoginPage } from '../../Auths/login/login';
import { ChangePasswordPage } from '../../Settings/change-password/change-password';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  name: string;
  email: string;
  department: string;
  phone: string;
  title: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
  ) {
    this.getProf();
  }

  getProf() {
    firebase.database().ref("Profiles").child(firebase.auth().currentUser.uid).once("value", profSnap => {
      this.name = profSnap.val().Name;
      this.email = profSnap.val().Email;
      this.department = profSnap.val().Department;
      this.phone = profSnap.val().Phone;
      this.title = profSnap.val().Title;

    })
  }

  gtChangePass() {
    this.navCtrl.push(ChangePasswordPage);
  }

  signOut() {
    firebase.auth().signOut().then(() => {
      this.navCtrl.setRoot(LoginPage);
    })
  }

  confirmSignout() {
    let alert = this.alertCtrl.create({
      title: 'Sign Out ? Quitting Already ?',
      message: 'You sure you remember your password ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Sign Out',
          handler: () => {
            this.signOut();
          }
        }
      ]
    });
    alert.present();
  }

}
