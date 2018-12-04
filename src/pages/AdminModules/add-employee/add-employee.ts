import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';
import moment from 'moment';


@IonicPage()
@Component({
  selector: 'page-add-employee',
  templateUrl: 'add-employee.html',
})
export class AddEmployeePage {

  name : string;
  dep : string;
  title : string;
  mail : string;
  pass : string = this.genPass();
  phone : string;
  
  adminMail : string;
  adminPass : string;

  loading = this.loadingCtrl.create({
    content: 'Getting Categories...'
  });

  constructor(
  public navCtrl: NavController, 
  public navParams: NavParams,
  public loadingCtrl: LoadingController,
  public toastCtrl: ToastController,
  ) {
    this.getAdmin();
  }







  checkData(){
    if(this.name){
      if(this.dep){
        if(this.title){
          if(this.mail){
            this.addEmployee();
          }else{this.presentToast("Enter an Email");}
        }else{this.presentToast("Enter a Job Title");}
      }else{this.presentToast("Select a Department");}
    }else{this.presentToast("Enter Employee Name");}
  }

  getAdmin(){
    firebase.database().ref("Profiles").child(firebase.auth().currentUser.uid).once("value",itemSnap=>{
      this.adminMail = itemSnap.val().Email;
      this.adminPass = itemSnap.val().Password;
    })
  }

  genPass(){
    var chars = "abcdefghijklmnopqrstuvwxyz!@#$%&ABCDEFGHIJKLMNOP1234567890";
    var pass = "";
    for (var x = 0; x < 8; x++) {
        var i = Math.floor(Math.random() * chars.length);
        pass += chars.charAt(i);
    }
    return pass;
  }

  addEmployee(){
    this.loading.present();
    
    firebase.auth().createUserWithEmailAndPassword(this.mail,this.pass).then(()=>{
      firebase.database().ref("Profiles").child(firebase.auth().currentUser.uid).set({
        Name : this.name,
        Email : this.mail,
        Password : this.pass,
        Department : this.dep,
        Title : this.title,
        Phone : this.phone,
        TimeStamp : moment().format(),
      }).then(()=>{
        firebase.auth().signInWithEmailAndPassword(this.adminMail,this.adminPass).then(()=>{
          this.navCtrl.pop();
          this.loading.dismiss();
          this.presentToast("Employee Added")
        })
      })
    })


    this.loading.dismiss();
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
