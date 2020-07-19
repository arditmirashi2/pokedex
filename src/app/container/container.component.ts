import { Component, OnInit } from '@angular/core';
import {ApiService} from '../services/api.service';
import { Pokemon } from '../models/pokemon.model';


@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})


export class ContainerComponent implements OnInit {

  pokemonData: Pokemon;
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  
    
  }

  onSubmit(data)
  {
    this.apiService.getPokemonInfo(data.value);
    this.apiService.returnPokemonInfo().subscribe(data=>
      {
        this.pokemonData=data;
      })
    console.log(this.pokemonData);
    
  }

}
