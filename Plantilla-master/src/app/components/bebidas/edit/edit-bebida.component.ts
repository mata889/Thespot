import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { BebidaService } from '../../../services/bebida.service';
import { first } from "rxjs/operators";
import { Router } from "@angular/router";
import { BebidaModel } from '../../../Models/BebidaModel';

@Component({
  selector: 'app-edit-bebida',
  templateUrl: './edit-bebida.component.html',
  styleUrls: ['./edit-bebida.component.css']
})
export class EditBebidaComponent implements OnInit {

  bebida: BebidaModel;
  editForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private bebidaService: BebidaService) { }

  ngOnInit() {
    let bebidaId = localStorage.getItem("bebidaId");
    if(!bebidaId){
      alert("Something wrong!");
      this.router.navigate(['']);
      return;
    }

    this.editForm = this.formBuilder.group({
      _id: [],
      nombre: ['', Validators.required],
      idProveedor: ['', Validators.required],
      tipo: ['', Validators.required],
      inventario: ['', Validators.required],
      descripcion: ['', Validators.required]
    });

    this.bebidaService.getBebidaById(bebidaId).subscribe(data=>{
      console.log(data);
      this.editForm.patchValue(data); //Don't use editForm.setValue() as it will throw console error
    });
  }

  // get the form short name to access the form fields
  get f() { return this.editForm.controls; }

  onSubmit(){
    this.submitted = true;
    
    if(this.editForm.valid){
      this.bebidaService.updateBebida(this.editForm.value)
      .subscribe( data => {
        console.log(data);
        this.router.navigate(['list-bebida']);
      });
    }
  }

}