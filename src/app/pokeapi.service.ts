import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class PokeapiService {
  apiURL = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private httpClient: HttpClient) { }

  getAllPokemons(offset: number, limit: number): Observable<any> {
    let paginatedUrl: string;
    paginatedUrl = this.apiURL + '?offset=' + offset + '&limit=' + limit;
    return this.httpClient.get(paginatedUrl);
  }
  getPokemonDetails(name: string): Observable<any> {
    let detailsUrl: string;
    detailsUrl = this.apiURL + '/' + name;
    return this.httpClient.get(detailsUrl);
  }
  getDamageRelations(diaDetTyDamUrl: string): Observable<any> {
    let dialogDetailTypeDamageUrl: string;
    dialogDetailTypeDamageUrl = diaDetTyDamUrl;
    return this.httpClient.get(dialogDetailTypeDamageUrl);
  }
  getSameTypePokemons(type: string): Observable<any> {
    let typeUrl: string;
    typeUrl = 'https://pokeapi.co/api/v2/type/' + type;
    return this.httpClient.get(typeUrl);
  }
  getAllPokemonNames(): Observable<any> {
    let fullnamesUrl: string;
    fullnamesUrl = this.apiURL + '?offset=0&limit=964';
    return this.httpClient.get(fullnamesUrl);
  }
}
