import { Component, OnInit ,TemplateRef, ElementRef, NgModule} from '@angular/core';
// import { BsModalService } from 'ngx-bootstrap-modal';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpRouterService } from '../http-router.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-warehouses',
  templateUrl: './warehouses.component.html',
  styleUrls: ['./warehouses.component.css']
})


export class WarehousesComponent implements OnInit {
  
  actionType = 'normal'
  manageItemList :any = []; 
  manageItemEditData :any = [];
  id = { '_id': '' };
  submitted = false;
  units :any =["kg","lb","cm","m","pcs","box","lit"];
  modalRef: BsModalRef;
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
 
    this.ManageItemInterForm = this.formBuilder.group({
        orderNumber: ['',[Validators.required]],
        Date_transfer: ['', [Validators.required]],
        Reason: ['', [Validators.required]],
        // image    : ['', [Validators.required]],
        Source_warehouse: ['', [Validators.required]],
        Destination_warehouse: ['', [Validators.required]],
        Item_details: ['', [Validators.required]],
        Initiate_transfer: ['', [Validators.required]],
        zipcode:['',[Validators.required]],
        email:['',[Validators.required]],
        weardate:['',[Validators.required]]
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
  
 
  public onChangeAccountF(event): void {  // event will give you full breif of action
    this.insertManageItem.Initiate_transfer = event.target.value;
  }
  public onChangeState(event): void {  // event will give you full breif of action
    this.insertManageItem.Destination_warehouse = event.target.value;
  }
  public onChangeCountry(event): void {  // event will give you full breif of action
    this.insertManageItem.country = event.target.value;
  }

  public clearForm() {
    this.ManageItemInterForm.reset({
      "orderNumber":"",
      "Date_transfer":"",
      "Reason":"",
      "Source_warehouse":"",
      "Destination_warehouse":"",
      "Item_details":"",
      "Initiate_transfer":"",
      "zipcode":"",
      "email":"",
      "weardate":"",
    });
  }

  // openModalAddMerchent(template: TemplateRef<any>) {
  //  this.modalRef = this.modalService.show(template);
  // }

}

class ManageItemClass {
  orderNumber:String;
  Date_transfer:String;
  Reason:String;
  Source_warehouse:String;
  Item_details:String;
  Destination_warehouse:String;
  Initiate_transfer:String;
  country:string;
  
}

