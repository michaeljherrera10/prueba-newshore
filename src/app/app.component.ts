import { Component, ViewChild } from '@angular/core';
import { ApiService } from './api.service';
import { FormBuilder, FormControl, FormGroup, Validators, } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'prueba-tecnica';
  routeList: any;
  origen: any;
  destino: any;
  checkoutForm: FormGroup;
  submitted: boolean;
  rutaOrigen: any;

  
  constructor(private apiService: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit(){
    this.dataApi()
    this.checkoutForm = this.formBuilder.group({
      origen: ['', Validators.required],
      destino: ['', Validators.required],
    });
  }

  dataApi(){
    this.apiService.getRoute().subscribe((data)=>{
      this.routeList = data;
      console.log(this.routeList);
    });
  }

  capturarOrigen(e){
    this.origen = e.srcElement.value
    console.log("origen seleccionado" , this.origen)
  }

  capturarDestino(e){
    this.destino = e.srcElement.value
    console.log("destino seleccionado" , this.destino)
  }

  onSubmit(){
    this.submitted = true
  }

  bucarVuelo(){
    let ruta = [];
    for (let i = 0; i < this.routeList.length; i++) {
        // if (this.routeList[i].departureStation == this.origen ) {
        //     bigCities.push(this.routeList[i]);
        // }
        if(this.routeList[i].departureStation == this.origen && this.routeList[i].arrivalStation == this.destino){
          ruta.push(this.routeList[i]);
        }
    }
    console.log("ruta deseada", ruta);
  }
 
}
