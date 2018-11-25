import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(
  public navCtrl: NavController, 
  public navParams: NavParams,
  private menuCtrl: MenuController,
  ) {
    this.menuCtrl.enable(true);
  }


}
