import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from './shared/api.service';
import { EmpleyeeModel } from './shared/model';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit {

  formValue !: FormGroup;
  employeeModelObj: EmpleyeeModel = new EmpleyeeModel();
  employeeData !: any;
  showAdd: boolean = true;
  showUpdate: boolean = false;
  constructor( private formBuilder: FormBuilder, private api : ApiService) { }

  ngOnInit(): void {
    this.formValue= this.formBuilder.group({
      name : [''],
      email : [''],
      address : [''],
      phone : [''],
    })
    this.getAllEmployee();
  }

  clickAddEmployee(){
    this.formValue.reset;
    this.showAdd = true;
    this.showUpdate = false;
  }

  postEmployeeDetails(){
    this.employeeModelObj.name = this.formValue.value.name;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.address = this.formValue.value.address;
    this.employeeModelObj.phone = this.formValue.value.phone;

    this.api.postEmployee(this.employeeModelObj)
    .subscribe(res =>{
      console.log(res);
      alert("Se agrego correctamente")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    })
  }

  getAllEmployee(){
    this.api.getEmployee()
    .subscribe(res => {
      this.employeeData = res;
    })
  }

  deleteEmployee(row : any){
    this.api.deleteEmployee(row.id)
    .subscribe(res=>{
      alert("Empleado eliminado")
      this.getAllEmployee();
    })
  }

  onEdit(row: any){
    this.showAdd = false;
    this.showUpdate = true;
    this.employeeModelObj.id=row.id;
    this.formValue.controls['name'].setValue(row.name);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['address'].setValue(row.address);
    this.formValue.controls['phone'].setValue(row.phone);
  }

  updateEmployeeDetails(){
    this.employeeModelObj.name = this.formValue.value.name;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.address = this.formValue.value.address;
    this.employeeModelObj.phone = this.formValue.value.phone;

    this.api.updateEmployee(this.employeeModelObj, this.employeeModelObj.id)
    .subscribe(res =>{
      console.log(res);
      alert("Se Actualizo correctamente")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    })
  }


}
