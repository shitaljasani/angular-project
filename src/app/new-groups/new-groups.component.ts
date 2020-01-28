import { Component, OnInit ,TemplateRef, ElementRef, NgModule} from '@angular/core';
// import { BsModalService } from 'ngx-bootstrap-modal';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpRouterService } from '../http-router.service';
import swal from 'sweetalert2';

declare var $: any;


@Component({
  selector: 'app-new-groups',
  templateUrl: './new-groups.component.html',
  styleUrls: ['./new-groups.component.css']
})
export class NewGroupsComponent implements OnInit {

 
  actionType = 'normal'
  manageItemList :any = []; 
  manageItemEditData :any = [];
  id = { '_id': '' };
  submitted = false;
  units :any =["kg","lb","cm","m","pcs","box","lit"];
  LoginForm: FormGroup;
  modalRef: BsModalRef;
  loginData: LoginData = new LoginData();
  ManageItemInterForm: FormGroup;
  insertManageItem: ManageItemClass = new ManageItemClass();
  constructor(
    // private modalService: BsModalService
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private HttpRouter: HttpRouterService
  ) { }

  ngOnInit() {
    console.log("manage Item innitizition..............!")
    this.script();
    this.LoginForm = this.formBuilder.group({
      username:['', [Validators.required]],
      password: ['', [Validators.required]]
    });
    this.ManageItemInterForm = this.formBuilder.group({
        typeValue: ['',[Validators.required]],
        name     : ['', [Validators.required]],
        unit     : ['', [Validators.required]],
        // image    : ['', [Validators.required]],
        ritem    : ['', [Validators.required]],
        dimension: ['', [Validators.required]],
        weight   : ['', [Validators.required]],
        manuf    : ['', [Validators.required]],
        brand    : ['', [Validators.required]],
        saleInfo : ['', [Validators.required]],
        sellPrice: ['', [Validators.required]],
        account1 : ['', [Validators.required]],
        descrip1 : ['', [Validators.required]],
        purInfo1 : ['', [Validators.required]],
        purPrice : ['', [Validators.required]],
        account2 : ['', [Validators.required]],
        descrip2 : ['', [Validators.required]],
        trackIn2 : ['', [Validators.required]],
        account3 : ['', [Validators.required]],
        openStock: ['', [Validators.required]],
        OSValUnit: ['', [Validators.required]],
        recLvl   : ['', [Validators.required]],
        preVendor: ['', [Validators.required]]
    });
    this.DisplayManageList();
  }
  script(){
    console.log("Manage :Script funtion call..................!",$('.form-validateMedat'))
    $('.form-validateMedat').each(function() {  
      console.log("Manage :click :......................!")
      $(this).validate({
          errorElement: "div",
          errorClass: 'is-invalid',
          validClass: 'is-valid',
          ignore: ':hidden:not(.summernote, .checkbox-template, .form-control-custom),.note-editable.card-block',
          errorPlacement: function (error, element) {
            console.log("fomd validater call..element..........!",element)
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
  action(action,event){
    this.actionType =action;   
    this.script()
  }
  openModalAddMerchent(template: TemplateRef<any>) {
    console.log("asdsads -- >",template)
    this.modalRef = this.modalService.show(template,{
    });
  }
  onSubmit(event){
    console.log("Manage Item add :calll --->");
    this.submitted = true;
    if (this.ManageItemInterForm.invalid) {
      console.log("..!Manage Item add : Return.",this.ManageItemInterForm);
      return;
    }
    this.HttpRouter.manageItemInsert(this.insertManageItem).subscribe((res: any) => {
      console.log("ManageItem save reponse : res -->",res)
      if (res.flag == true) {
        console.log("ManageItemsave  : true response..............!");
        this.DisplayManageList()
        this.modalRef.hide();
        this.clearForm();
      }else {
        // Swal.fire('', res.msg, 'error');
        swal({
          title: res.dialogTitle,
          text: res.msg,
          type: 'error',
          showConfirmButton: true          
        })
      }
      console.log("Manage Item add : --->",this.insertManageItem);
      alert('form fields are validated successfully!');
    })
    
   
  }
  get fval() {
    return this.ManageItemInterForm.controls;
  }
  DisplayManageList() {
    this.HttpRouter.getManageItemList({}).subscribe((res: any) => {
      console.log("merchent res========================================================>", res);
      if (res.flag == false) {
        swal({
          title: "Are you sure?",
          text: "Manage item not found.!!",
          type: 'warning',         
          showCancelButton: true         
        })

      }
      else {
        this.manageItemList = res.data;

      }
    }, error => {
      console.log(error);
    })
  }
  //View manage Item
  manageItemView(template: TemplateRef<any>, id) {
    this.id._id = id
    this.HttpRouter.getManageItemData(this.id).subscribe((res: any) => {

    })
  }
  //Edit manage Item
  manageItemEditClick(template: TemplateRef<any>, id) {
    this.id._id = id
    this.HttpRouter.getManageItemData(this.id).subscribe((res: any) => {
        if (res.flag == false) {
          swal({
            title: "Are you sure?",
            text: "Manage item not found.!!",
            type: 'warning',         
            showCancelButton: true         
          })
        }else {
          this.manageItemEditData = res.data[0];
          console.log("this.manageItemEditData -- >",this.manageItemEditData)
          console.log("asdsads -- >",template)
            this.modalRef = this.modalService.show(template,{
          });
        }
    })
  }
  remove(event){
    swal({
      title: "Are you sure?",
      text: "Do you want to remove this data!",
      type: 'warning',
      showConfirmButton: true ,
      showCancelButton: true,
      confirmButtonText: 'Yes'         
    }).then((result) => {
      console.log("Resulti :-->",result)
      if(typeof result.value != 'undefined' && result.value)
        swal(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
    });    
  }
  
  public onChangeType(event): void {  // event will give you full breif of action
    this.insertManageItem.type = event.target.value;
  }
  public onChangeUnit(event): void {  // event will give you full breif of action
    this.insertManageItem.unit = event.target.value;
  }
  public onChangeAccountF(event): void {  // event will give you full breif of action
    this.insertManageItem.account = event.target.value;
  }
  public onChangeAccountS(event): void {  // event will give you full breif of action
    this.insertManageItem.account2 = event.target.value;
  }
  public onChangeAccountT(event): void {  // event will give you full breif of action
    this.insertManageItem.account3 = event.target.value;
  }
  public onChangePreVender(event): void {  // event will give you full breif of action
    this.insertManageItem.pre_vender_nm = event.target.value;
  }
  public clearForm() {
    this.ManageItemInterForm.reset({
      "typeValue":"",
      "name":"",
      "unit":"",
      "ritem":"",
      "dimension":"",
      "weight":"",
      "manuf":"",
      "brand":"",
      "saleInfo":"",
      "sellPrice":"",
      "account1":"",
      "descrip1":"",
      "purInfo1":"",
      "purPrice":"",
      "account2":"",
      "descrip2":"",
      "trackIn2":"",
      "account3":"",
      "openStock":"",
      "OSValUnit":"",
      "recLvl":"",
      "preVendor":""
    });
  }

}

class ManageItemClass {
  name:String;
  type:String;
  unit:String;
  image:String;
  isreturn:Boolean;
  dim:String;
  weight:String;
  manu_nm:String;
  brand:String;
  sales_info:Boolean;
  sell_price:String;
  account:String;
  descri:String;
  purchase:Boolean;
  purchase_price:String;
  account2:String;
  descri_2:String;
  track_in:Boolean;
  account3:String;
  opening_stock:String;
  opening_stock_val:String;
  reorder:String;
  pre_vender_nm:String;
}
class LoginData {
  username: String;
  password: String;
}

