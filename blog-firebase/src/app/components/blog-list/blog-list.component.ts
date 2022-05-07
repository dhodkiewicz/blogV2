import { Component, NgModule, OnInit } from '@angular/core';
import { User, user, UserCredential } from '@angular/fire/auth';
import { Database, getDatabase, set, ref, push, update, onValue,remove } from '@angular/fire/database';
import { FormGroupDirective, FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { AbstractControl, FormControl, FormGroup, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { getAuth, onAuthStateChanged } from "firebase/auth";




@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css'],
  exportAs: '#registerForm'
})
export class BlogListComponent implements OnInit {

  user$ = this.authService.currentUser$;
  userId$: any
  registerForm = new FormGroup({
    title: new FormControl('', Validators.required),
    content: new FormControl('',  Validators.required),
    imageUrl: new FormControl('', Validators.required)
 }) 


  ngOnInit(): void {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        this.userId$ = user.uid;
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }


  constructor(public database: Database, private authService: AuthenticationService, private toast: HotToastService) {

  }


  createPost(value: any, formDirective: FormGroupDirective) {
   // create data

  const db = getDatabase();
  const postListRef = ref(db, 'blog/' + this.userId$);
  const newPostRef = push(postListRef);
    set(newPostRef, {
      title: value.title,
      content: value.content,
      imageUrl: value.imageUrl
    }); 

    this.toast.success("blog entry created!");
    this.registerForm.reset();
    formDirective.resetForm();
    
  }

   // read data
    // const starCountRef = ref(this.database, 'users/' + value.username);
    // onValue(starCountRef, (snapshot) => {
    //   const data = snapshot.val();  

    //   alert(data.first_name);   
    // });   

  //  // update data
  //   update(ref(this.database, 'users/' + value.username), {
  //     // username: value.username,
  //     first_name: value.first_name,
  //     last_name: value.last_name
  //   });
  //   alert('user updated!');  
    
  //   //remove data
  //   remove(ref(this.database, 'users/' + value.username));
  //   alert('removed');

  get title(){
    return this.registerForm.get('title')
  }

  get content(){
    return this.registerForm.get('content')
  }

  get imageUrl(){
    return this.registerForm.get('imageUrl')
  }

}
