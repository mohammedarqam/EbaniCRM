import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, MenuController } from 'ionic-angular';
import { SendMessagePage } from '../../Messsaging/send-message/send-message';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { ViewMessagePage } from '../../Messsaging/view-message/view-message';

@IonicPage()
@Component({
  selector: 'page-messaging',
  templateUrl: 'messaging.html',
})
export class MessagingPage {

  inbox: Array<any> = [];

  typ: string = "Inbox";
  Mail: string = "Inbox";
  constructor(
    public navCtrl: NavController,
    public db: AngularFireDatabase,
    public loadingCtrl: LoadingController,
    public menuCtrl: MenuController,
    public navParams: NavParams
  ) {
    this.menuCtrl.enable(true);
    this.getMessages();
  }

  getMessages() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    this.db.list(`Mails/${firebase.auth().currentUser.uid}/${this.typ}`).snapshotChanges().subscribe(itemSnap => {
      itemSnap.forEach(snap => {
        this.inbox = [];
        this.db.object(`AllMails/${snap.key}`).snapshotChanges().subscribe(iisnap => {
          var temp: any = iisnap.payload.val();
          switch (temp.Status) {
            case "Unread": temp.clr = "whiter";
              break;
            case "Read": temp.clr = "grry";
              break;

            default: temp.clr = ""
              break;
          }
          temp.key = iisnap.key;
          this.inbox.push(temp);
        })
      })
      loading.dismiss();
    })
  }




  viewMail(mail){
    this.navCtrl.push(ViewMessagePage,{mail : mail});
  }
  
  compose() {
    this.navCtrl.push(SendMessagePage);
  }

  getSent() {
    this.typ = "Sent";
    this.getMessages();
  }
  getInbox() {
    this.typ = "Inbox";
    this.getMessages();
  }
}
