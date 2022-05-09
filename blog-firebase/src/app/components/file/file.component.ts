import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent {

    title = 'angular-material-file-upload-app';
    file: any;
  
    @ViewChild('UploadFileInput') uploadFileInput: ElementRef | undefined;
    myfilename = 'Select File';
  
  
    fileChangeEvent(fileInput: any) {
  
      if (fileInput.target.files && fileInput.target.files[0]) {
  
  
        this.myfilename = '';
        Array.from(fileInput.target.files).forEach((file: any) => {
          console.log(file);
          this.myfilename += file.name + ',';
          this.file = file;
          console.log(this.myFile)
        });
  
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const image = new Image();
          image.src = e.target.result;
          image.onload = rs => {
  
            // Return Base64 Data URL
            const imgBase64Path = e.target.result;
  
          };
        };
        reader.readAsDataURL(fileInput.target.files[0]);
  
        // Reset File Input to Selct Same file again
        //this.uploadFileInput.nativeElement.value = "";
      } else {
        this.myfilename = 'Select File';
      }
    }

    get myFile(){
      return this.file;
    }
  
  

}
