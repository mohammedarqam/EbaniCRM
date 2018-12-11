import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {

  gPass : string;

  oPass : string;

  nPass : string;
  nPassC : string;
  
  constructor(
  public navCtrl: NavController, 
  public toastCtrl : ToastController,
  public navParams: NavParams
  ) {
    this.getOlDPass();
  }


  getOlDPass(){
    firebase.database().ref("Profiles").child(firebase.auth().currentUser.uid).child("Password").once("value",snap=>{
      this.gPass = snap.val();
      console.log(this.gPass);
    })
  }


  checkData(){
    if(this.oPass==this.gPass){ 
      if(this.nPass){
        if(this.nPass==this.nPassC){  
          this.changePass();
        }else{this.presentToast("Passwords do not Match");}
      }else{this.presentToast("Enter new Password");}
    }else{this.presentToast("Wrong Password");}
  }

  changePass(){
    firebase.auth().currentUser.updatePassword(this.nPass).then(()=>{
      this.navCtrl.pop();
      this.presentToast("Password Updated");
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

}
