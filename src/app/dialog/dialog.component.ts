import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  googlekeepform!: FormGroup;
  actionBtn: string="Save"
  constructor(private formBuilder:FormBuilder, 
    private api : ApiService, 
    @Inject(MAT_DIALOG_DATA) public editData:any,
    private dialogRef: MatDialogRef<DialogComponent>) { 
    this.googlekeepform=this.formBuilder.group({
      googlekeepform:['',Validators.required],
      yesorno:['',Validators.required],
      comment:['',Validators.required],
    });
    if(this.editData){
      this.actionBtn="Update";
      this.googlekeepform.controls['googlekeepform'].setValue(this.editData.googlekeepform);
      this.googlekeepform.controls['yesorno'].setValue(this.editData.yesorno);
      this.googlekeepform.controls['comment'].setValue(this.editData.comment);

    }
  }
  addProduct(){
    if(!this.editData){
    if(this.googlekeepform.valid){
      this.api.postProduct(this.googlekeepform.value)
      .subscribe({
        next:(res)=>{
          alert("Task added successfully!!!")
          this.googlekeepform.reset();
          this.dialogRef.close('save');
        },
        error:()=>{
          alert("Error while adding task")
        }
      })
    }
  }else{
    this.updateProduct()
  }
}
updateProduct(){
  this.api.putProduct(this.googlekeepform.value,this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("Task updated Successfully");
        this.googlekeepform.reset();
        this.dialogRef.close('update');
      },
      error:()=>{
        alert("Error while updating the record!!");
      }
    })

}
  ngOnInit(): void {
  }
  

}
