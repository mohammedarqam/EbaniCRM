import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FinanceDashboardPage } from './finance-dashboard';

@NgModule({
  declarations: [
    FinanceDashboardPage,
  ],
  imports: [
    IonicPageModule.forChild(FinanceDashboardPage),
  ],
})
export class FinanceDashboardPageModule {}
