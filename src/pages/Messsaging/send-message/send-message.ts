import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Slides } from 'ionic-angular';
import * as firebase from 'firebase';
import moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-send-message',
  templateUrl: 'send-message.html',
})
export class SendMessagePage {
  @ViewChild(Slides) slides: Slides;

  profs: Array<any> = [];
  profsSel: Array<any> = [];
  profsRest: Array<any> = [];


  subject: string;
  message: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public db: AngularFireDatabase,
    public loadingCtrl: LoadingController,
    public menuCtrl: MenuController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
  ) {
    this.menuCtrl.enable(true);
    this.getEmps();
    this.getUser();
  }
  ionViewDidEnter() {
    this.slides.lockSwipes(true);
  }
  gtNext() {
    this.slides.lockSwipes(false);
    this.slides.slideNext();
    this.slides.lockSwipes(true);
  }
  gtPrev() {
    this.slides.lockSwipes(false);
    this.slides.slidePrev();
    this.slides.lockSwipes(true);
  }

  getUser(){
    // this.db.object(`Profiles/${firebase.auth().currentUser}`).
  }

  getEmps() {
    let loading = this.loadingCtrl.create({
      content: 'Loading Profiles...'
    });
    loading.present();
    this.db.list("Profiles").snapshotChanges().subscribe(profSnap => {
      this.profs = [];
      profSnap.forEach(prof => {
        let temp: any = prof.payload.val();
        temp.key = prof.key;
        this.profs.push(temp);
      })
      this.profsRest = this.profs;
      loading.dismiss();
    })
  }
  rmPerson(p, i) {
    this.profsRest.push(p);
    this.profsSel.splice(i, 1)
  }
  SelPerson(p, i) {
    this.profsSel.push(p);
    this.profsRest.splice(i, 1)
  }

  testSubject() {
    if (this.subject) {
      this.gtNext();
    } else { this.presentToast("Enter Subject First"); }
  }
  testPeople() {
    if (this.profsSel.length) {
      this.gtNext();
    } else { this.presentToast("Select People"); }
  }
  testMessage() {
    if (this.message) {
      this.sendMail();
    } else { this.confirmNoMessage(); }
  }

  sendMail() {
    // console.log(this.profsSel);
    let toNames : Array<any> = [];
    let toIds : Array<any> = [];
    this.profsSel.forEach(snap=>{
      toNames.push(snap.Name);
      toIds.push(snap.key);
    })
    // console.log(toNames);
    // console.log(toIds);
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    firebase.database().ref("AllMails").push({
      ToNames  : toNames,
      ToIds  : toIds,
      From : firebase.auth().currentUser.uid,
      Subject : this.subject,
      Message : this.message,
      Status : "Unread",
      TimeStamp : moment().format()
    }).then((res)=>{
      firebase.database().ref("Mails").child(firebase.auth().currentUser.uid).child("Sent").child(res.key).set(true).then(()=>{
        toIds.forEach(iisnap=>{
          firebase.database().ref("Mails").child(iisnap).child("Inbox").child(res.key).set(true);

        })
        loading.dismiss();
        this.presentToast("Mail Sent");
        this.navCtrl.pop();
      })
    })



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
  confirmNoMessage() {
    let alert = this.alertCtrl.create({
      title: 'Send without adding any Message ?',
      message: 'It will send only a subject.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: () => {
            this.sendMail();
          }
        }
      ]
    });
    alert.present();
  }
}
