import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-view-message',
  templateUrl: 'view-message.html',
})
export class ViewMessagePage {

  mail = this.navParams.get("mail");

  constructor(
  public navCtrl: NavController, 
  public navParams: NavParams
  ) {
    this.markRead();
  }






  markRead(){
    firebase.database().ref("AllMails").child(this.mail.key).child("Status").set("Read");
  }
  
}
