import { Component, ViewChild } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'prueba-tecnica';
  routeList: Object;
  origen: any;
  destino: any;

  
  constructor(private apiService: ApiService) { }

  ngOnInit(){
    this.dataApi()
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
}
