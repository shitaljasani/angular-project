import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { HttpRouterService } from '../http-router.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  LoginForm: FormGroup;
  submitted = false;
  loginData: LoginData = new LoginData();
  constructor(private router:Router,
    private formBuilder: FormBuilder,
    private HttpRouter: HttpRouterService
  ){ }

  ngOnInit() {
    // this.script()
    this.LoginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  
  script(){
    console.log("login: Script funtion call..................!",$('.form-validate'))
    var materialInputs = $('input.input-material');

    // activate labels for prefilled values
    materialInputs.filter(function() { return $(this).val() !== ""; }).siblings('.label-material').addClass('active');

    // move label on focus
    materialInputs.on('focus', function () {        
        $(this).siblings('.label-material').addClass('active');
    });

    // remove/keep label on blur
    materialInputs.on('blur', function () {
        $(this).siblings('.label-material').removeClass('active');

        if ($(this).val() !== '') {
            $(this).siblings('.label-material').addClass('active');
        } else {
            $(this).siblings('.label-material').removeClass('active');
        }
    })
    $('.form-validate').each(function() {  
      console.log("login : click :.......sads...............!")
      $(this).validate({
          errorElement: "div",
          errorClass: 'is-invalid',
          validClass: 'is-valid',
          ignore: ':hidden:not(.summernote, .checkbox-template, .form-control-custom),.note-editable.card-block',
          errorPlacement: function (error, element) {
            console.log("click :..............sss........!",error)
              // Add the `invalid-feedback` class to the error element
              error.addClass("invalid-feedback");
              console.log(element);
              if (element.prop("type") === "checkbox") {
                  error.insertAfter(element.siblings("label"));
              } 
              else {
                  error.insertAfter(element);
              }
          }
      });
    });
  }
  onSubmit() {
    this.submitted = true;
    if (this.LoginForm.invalid) {
      return;
    }
    console.log("onSubmit : loginData-->",JSON.stringify(this.loginData))
    this.HttpRouter.login(this.loginData).subscribe((res: any) => {
      console.log("loginResponse", res);
      //setting items inside localstorage
      localStorage.setItem('uid', res.data.uid);
      if (res.flag == true) {
        this.router.navigate(['DashbordScreen']);
      }else {
        // Swal.fire('', res.msg, 'error');
        swal({
          title: res.dialogTitle,
          text: res.msg,
          type: 'error',
          showConfirmButton: true          
        })
      }
    }, error => {
      console.log(error);
    });
  }
  login(username,pass){

    // this.HttpRouter.login({}).subscribe((res: any) => {
    //   console.log("Login response.............!");



    // })

    console.log("UserName :-->",username)
    console.log("pass :-->",pass)
    if(username == 'admin' && pass == 'admin'){
      console.log("Dashbord view :--------->",typeof this.router.navigate)
      this.router.navigate(['DashbordScreen']);
    }else{
      swal({
        title: "Oops...",
        text: "Invalid username or password.",
        type: 'error',
        showConfirmButton: true          
      })
    }
  }
 
}

class LoginData {
  username: String;
  password: String;
}

