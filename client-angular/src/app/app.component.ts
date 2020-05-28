import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon } from './pokemon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public http: HttpClient) {} //dependency injection

  data: any;
  observable: Observable<any>;

  obsPost: Observable<Object>;
  postData : Object;

  getData = (d : Object) => {
    this.data = new Object(d);
  }

  cercaPokemon(HTMLpokemon: HTMLInputElement) {
    let pokemon = String(HTMLpokemon.value);
    this.observable = this.http.get('https://pokeapi.co/api/v2/pokemon/' + pokemon + '/'); //richiesta alle API
    this.observable.subscribe(data => this.data = data); //ci sottoscriviamo all'observable
    return false;
  }

  catturaPokemon(newNome: HTMLInputElement, newUrl: HTMLInputElement): boolean {
    this.obsPost = this.http.post('https://3000-c606542d-d42a-4806-9faf-65932595d1ea.ws-eu01.gitpod.io/users/api/catchpok',{Nome: newNome.value, Indirizzo: newUrl.value});
    this.obsPost.subscribe(data => this.postData = data);
    return false;
  }
}
