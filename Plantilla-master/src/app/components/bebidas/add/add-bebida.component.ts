import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { BebidaService } from '../../../services/bebida.service';
import { first } from "rxjs/operators";
import { Router } from "@angular/router";

@Component({
  selector: 'app-add-bebida',
  templateUrl: './add-bebida.component.html',
  styleUrls: ['./add-bebida.component.css']
})
export class AddBebidaComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private bebidaService: BebidaService) { }

  addForm: FormGroup;
  submitted = false;

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      _id: [],
      nombre: ['', Validators.required],
      idProveedor: ['', Validators.required],
      tipo: ['', Validators.required],
      inventario: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  onSubmit(){
    this.submitted = true;
    
    if(this.addForm.valid){
      this.bebidaService.addBebida(this.addForm.value)
      .subscribe( data => {
        console.log(data);
        this.router.navigate(['list-bebida']);
      });
    }
  }

  // get the form short name to access the form fields
  get f() { return this.addForm.controls; }

}