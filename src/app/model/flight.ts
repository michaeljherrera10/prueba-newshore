
export interface Journey {
    Journey : JourneyData,
 }

export interface JourneyData {
   Origin: string,
   Destination: String,
   Price: number
   Flights: Flight[]
}

export interface Flight {
    Origin?: string,
    Destination?: String,
    Price?: number  
    Transport?: Transport
}

export interface Transport {
    FlightCarrier: string,
    FlightNumber: string,
}


