import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FilesPage } from './files';
import { FileUploadModule } from 'ng2-file-upload';
import { ComponentsMultiFileUploadComponent } from '../../../components/components-multi-file-upload/components-multi-file-upload';

@NgModule({
  declarations: [
    FilesPage,
  ],
  imports: [
    IonicPageModule.forChild(FilesPage),
    FileUploadModule,
  ],
})
export class FilesPageModule {}
