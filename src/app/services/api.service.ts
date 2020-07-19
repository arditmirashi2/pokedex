import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Subject } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';
import {environment} from '../../environments/environment.prod';
import {map} from 'rxjs/operators';

@Injectable(
    {
        providedIn: 'root'
    }
)


export class ApiService 
{

    private pokemon: Subject<any> = new Subject<any>();

    constructor(private http: HttpClient)
    {

    }

    // get Pokemon info

    getPokemonInfo(name: string)
    {

        this.http.get<any>(environment.api+name).pipe(map(info=>
            {
                let abilities=[];
                let stats={};
                info.abilities.forEach(ab=>
                    {
                        abilities.push(ab.ability.name);
                    })
                stats=
                {
                    base_stat: info.stats[0].base_stat,
                    effort: info.stats[0].effort
                }
                return {
                    abilities: abilities,
                    stats: stats
                };
            })).subscribe(pokemonInfo=>
                {
                    this.pokemon.next(pokemonInfo);
                });
        }

    returnPokemonInfo()
    {
    return this.pokemon.asObservable();
    }


}