
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VideojuegosApiService {

  apiKey = '79e66d6e054e40759ac3053546b6a41a';

  async buscarJuego(nombre: string){

    try{

      const response = await fetch(
        `https://api.rawg.io/api/games?key=${this.apiKey}&search=${nombre}`
      );

      const data = await response.json();

      return data.results[0];

    }catch(error){

      console.log('Error API:', error);

      return null;
    }

  }

}