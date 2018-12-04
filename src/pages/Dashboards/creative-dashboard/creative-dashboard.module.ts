import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreativeDashboardPage } from './creative-dashboard';

@NgModule({
  declarations: [
    CreativeDashboardPage,
  ],
  imports: [
    IonicPageModule.forChild(CreativeDashboardPage),
  ],
})
export class CreativeDashboardPageModule {}
