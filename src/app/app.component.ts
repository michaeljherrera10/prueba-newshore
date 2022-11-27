import { Component, ViewChild } from '@angular/core';
import { ApiService } from './api.service';
import { FormBuilder, FormControl, FormGroup, Validators, } from '@angular/forms';
import { Flight, Journey } from './model/flight';


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
  directo:any[] = [];
  rutaCompuesta: any[];
  escala: any[];
  rutaDestino: any[];
  rutaDirecta: boolean = true
  rutaEscala: boolean = true
  sinRuta: boolean = true
  buscar: boolean = false
  total: any;
  listadoVuelo: Flight[] = [];
  informacionVuelo: Journey;
  moneda: string = "USD";
  informacionVueloCopia: any;


  
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
      this.apiService.listadoVuelos = data;
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
    this.buscar = true;
    let obj = {
      Origin: this.origen,
      Destination: this.destino
    }
    
    this.apiService.buscarVuelos(obj).then((data: Journey) =>{
      this.informacionVuelo = data;
      this.informacionVueloCopia = JSON.stringify(data);
      this.listadoVuelo = this.informacionVuelo['Journey']['Flights']
    }).catch((error)=>{
      console.log("error", error)
    })
  }

  cambiarMoneda(moneda: string){
    if(moneda === "EUR"){
      let copiaVuelo = JSON.parse(this.informacionVueloCopia);
      this.informacionVuelo.Journey.Price = copiaVuelo.Journey.Price * 1.03;
      console.log("precio euros", copiaVuelo.Journey.Price);
      for (let i = 0; i < this.informacionVuelo.Journey.Flights.length; i++) {
        this.informacionVuelo.Journey.Flights[i].Price =  copiaVuelo.Journey.Flights[i].Price * 1.03;
      }
    }

    if(moneda === "COP"){
      let copiaVuelo = JSON.parse(this.informacionVueloCopia);
      this.informacionVuelo.Journey.Price = copiaVuelo.Journey.Price * 4000 ;
      for (let i = 0; i < this.informacionVuelo.Journey.Flights.length; i++) {
        this.informacionVuelo.Journey.Flights[i].Price =  copiaVuelo.Journey.Flights[i].Price * 4000;
      }
    }

    if(moneda === "USD"){
      let copiaVuelo = JSON.parse(this.informacionVueloCopia);
      this.informacionVuelo.Journey.Price = copiaVuelo.Journey.Price;
      for (let i = 0; i < this.informacionVuelo.Journey.Flights.length; i++) {
        this.informacionVuelo.Journey.Flights[i].Price =  copiaVuelo.Journey.Flights[i].Price;
      }
    }
  }
 
}
