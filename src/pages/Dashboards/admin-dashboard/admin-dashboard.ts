import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { AddEmployeePage } from '../../AdminModules/add-employee/add-employee';



@IonicPage()
@Component({
  selector: 'page-admin-dashboard',
  templateUrl: 'admin-dashboard.html',
})
export class AdminDashboardPage {

  constructor(
  public navCtrl: NavController, 
  public navParams: NavParams,
  public menuCtrl : MenuController,
  ) {
    this.menuCtrl.enable(true);
  }






  gtAddEmployee(){
    this.navCtrl.push(AddEmployeePage);
  }
}
