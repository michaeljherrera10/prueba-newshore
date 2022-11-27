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
  directo:any[] = [];
  rutaCompuesta: any[];
  escala: any[];
  rutaDestino: any[];
  rutaDirecta: boolean = true
  rutaEscala: boolean = true
  sinRuta: boolean = true
  buscar: boolean = false
  total: any;
  listadoVuelo: any[] = []

  
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
    
    this.apiService.buscarVuelos(obj).then((data) =>{
      let response = data;
      console.log("response", response)
      this.listadoVuelo = response['Journey']['Flights']
      console.log("listadoVuelo", this.listadoVuelo)
    }).catch((error)=>{
      console.log("error", error)
    })
  }
 
}
