import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  length: number;
  listadoVuelos: any
  
  constructor(private httpClient: HttpClient) { }

  public getRoute(){
    return this.httpClient.get("https://recruiting-api.newshore.es/api/flights/1");
  }

  buscarVuelos(data: any){
    return new Promise((resolve, reject) => {
      if(data.Origin && data.Destination){
        let rutaOrigen = [];
        let rutaDestino = []
    
        let respuesta = {
          "Journey": {
            "Origin": data.Origin,
            "Destination": data.Destination
          }    
        }
    
        for (let i = 0; i < this.listadoVuelos.length; i++) {
            if(this.listadoVuelos[i].departureStation == data.Origin && this.listadoVuelos[i].arrivalStation == data.Destination){
              respuesta.Journey['Price'] = this.listadoVuelos[i]['price']
              respuesta.Journey['Flights'] = [];
              respuesta.Journey['Flights'].push({
                "Origin": this.listadoVuelos[i].departureStation,
                "Destination": this.listadoVuelos[i].arrivalStation,
                "Price": this.listadoVuelos[i].price,
                "Transport":{
                  "FlightCarrier":this.listadoVuelos[i].flightCarrier,
                  "FlightNumber": this.listadoVuelos[i].flightNumber
                }
              })  
            }
    
            if(this.listadoVuelos[i].departureStation == data.Origin && this.listadoVuelos[i].arrivalStation != data.Destination){
              rutaOrigen.push(this.listadoVuelos[i]); 
            }
            if(this.listadoVuelos[i].departureStation != data.Origin && this.listadoVuelos[i].arrivalStation == data.Destination){
              rutaDestino.push(this.listadoVuelos[i]);
            }
        }
    
        for (var i = 0; i < rutaOrigen.length; i++) {
            for (var j = 0; j < rutaDestino.length ; j++) {
                if(rutaOrigen[i]['arrivalStation'] == rutaDestino[j]['departureStation']){
                  respuesta.Journey['Price']= rutaOrigen[i]['price'] + rutaDestino[j]['price']
                  respuesta.Journey['Flights'] = [];
                  respuesta.Journey['Flights'].push({
                    "Origin": rutaOrigen[i].departureStation,
                    "Destination": rutaOrigen[i].arrivalStation,
                    "Price": rutaOrigen[i].price,
                    "Transport":{
                      "FlightCarrier":rutaOrigen[i].flightCarrier,
                      "FlightNumber": rutaOrigen[i].flightNumber
                    }
                  });
    
                  respuesta.Journey['Flights'].push({
                    "Origin": rutaDestino[j].departureStation,
                    "Destination": rutaDestino[j].arrivalStation,
                    "Price": rutaDestino[j].price,
                    "Transport":{
                      "FlightCarrier":rutaDestino[j].flightCarrier,
                      "FlightNumber": rutaDestino[j].flightNumber
                    }
                  })
                }else {
                  respuesta.Journey['Flights'] = [];
                  respuesta.Journey['Price'] = 0;
    
                }
            }
        }
  
        resolve(respuesta);
      }else {
        reject("error para enviar respuesta de vuelos");
      }
    })
    
  }
}

