import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';



@IonicPage()
@Component({
  selector: 'page-files',
  templateUrl: 'files.html',
})
export class FilesPage {
 
  constructor() {
 
  }
 
  // upload(){
 
  //   let files = this.fileField.getFiles();
  //   console.log(files);
 
  //   let formData = new FormData();
  //   formData.append('somekey', 'some value') // Add any other data you want to send
 
  //   files.forEach((file) => {
  //     formData.append('files[]', file.rawFile, file.name);
  //   });
 
  //   // POST formData to Server
 
  // }
  public uploader: FileUploader = new FileUploader({});
  public hasBaseDropZoneOver: boolean = false;
 
 
  getFiles(): FileLikeObject[] {
    return this.uploader.queue.map((fileItem) => {
      return fileItem.file;
    });
  }
 
  fileOverBase(ev): void {
    this.hasBaseDropZoneOver = ev;
  }
 
  reorderFiles(reorderEvent: CustomEvent): void {
    let element = this.uploader.queue.splice(reorderEvent.detail.from, 1)[0];
    this.uploader.queue.splice(reorderEvent.detail.to, 0, element);
  } 
}