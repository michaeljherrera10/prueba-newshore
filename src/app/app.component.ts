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
  ruta:any[] = [];
  rutaCompuesta: any[];
  escala: any[];
  rutaDestino: any[];

  
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
    this.ruta = [];
    this.rutaOrigen = [];
    this.rutaDestino = []
    this.escala = []
    
    for (let i = 0; i < this.routeList.length; i++) {
        // if (this.routeList[i].departureStation == this.origen ) {
        //     bigCities.push(this.routeList[i]);
        // }
        if(this.routeList[i].departureStation == this.origen && this.routeList[i].arrivalStation == this.destino){
          this.ruta.push(this.routeList[i]);
        }
        if(this.routeList[i].departureStation == this.origen && this.routeList[i].arrivalStation != this.destino){
          this.rutaOrigen.push(this.routeList[i]); 
        }
        if(this.routeList[i].departureStation != this.origen && this.routeList[i].arrivalStation == this.destino){
          this.rutaDestino.push(this.routeList[i]);
        }
    }

    for (var i = 0; i < this.rutaOrigen.length; i++) {
        for (var j = 0; j <this.rutaDestino.length ; j++) {
            if(this.rutaOrigen[i]['arrivalStation'] == this.rutaDestino[j]['departureStation']){
              this.escala.push(this.rutaOrigen[i])
              this.escala.push(this.rutaDestino[j])
            }else {
              // this.escala = []
            }
        }
    }
    
    console.log("ruta directa", this.ruta);
    console.log("ruta del origen", this.rutaOrigen);
    console.log("ruta del destino", this.rutaDestino);
    console.log("escala",this.escala);
  }
 
}
