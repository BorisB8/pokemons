import { Component, OnInit } from '@angular/core';
import {PokeapiService} from '../pokeapi.service';
import {MatTableDataSource} from '@angular/material';
import {PokeDetails} from '../pokeDetails';
import {PageEvent} from '@angular/material/paginator';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-version1',
  templateUrl: './version1.component.html',
  styleUrls: ['./version1.component.css']
})
export class Version1Component implements OnInit {
  pokemonSize: number = 0;
  pageSizeOptions: number[] = [10, 20, 30, 50];
  currentPage: number = 0;
  currentPageSize: number = 10;
  ELEMENT_DATA: PokeDetails[] = [];
  displayedColumns: string[] = ['name', 'allTypes', 'hewe', 'ability', 'exp'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  name: string = '';
  type: string = '';

  constructor(private service: PokeapiService,
              private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.onFilter();
  }

  private loadPokemons() {
    this.ELEMENT_DATA = [];
    this.dataSource = new MatTableDataSource<PokeDetails>(this.ELEMENT_DATA);
    this.service.getAllPokemons(this.currentPage * this.currentPageSize, this.currentPageSize).subscribe( res => {
      // console.log(res);
      const pokemons = res.results;
      this.pokemonSize = res.count;
      for (let i = 0; i < pokemons.length; i++) {
        // console.log('ovo je name', pokemons[i].name);
        this.service.getPokemonDetails(pokemons[i].name).subscribe( details => {
          console.log('Ovo su details', details);
          let allTypes = '';
          for (let j = 0; j < details.types.length; j++) {
            // console.log(details.types[z].type.name);
            allTypes += details.types[j].type.name;
            if (j < details.types.length - 1) {
              allTypes += ' / ';
            }
          }
          let hewe = '';
          hewe = details.height + ' / ' + details.weight;
          console.log('Ovo je Height/Weight', hewe);
          let ability = '';
          for (let k = 0; k < details.abilities.length; k++) {
            // console.log('Ovo su base ability', details.abilities[k].ability.name);
            ability += details.abilities[k].ability.name;
            if (k < details.abilities.length - 1) {
              ability += ' / ';
            }
          }
          console.log('Ovo su ability', ability);
          let exp = '';
          exp = details.base_experience;
          this.ELEMENT_DATA.push(new PokeDetails(details.name, allTypes , hewe, ability, exp));
          this.dataSource = new MatTableDataSource<PokeDetails>(this.ELEMENT_DATA);
        });
      }
    });
  }
  onFilter() {
    if ((this.name === '' || this.name == null) && (this.type === '' || this.type == null)) {
      this.loadPokemons();
    } else {
      if ((this.name.length > 0) && (this.type === '' || this.type == null)) {
        this.ELEMENT_DATA = [];
        this.dataSource = new MatTableDataSource<PokeDetails>(this.ELEMENT_DATA);
        this.service.getPokemonDetails(this.name.toLowerCase()).subscribe(details => {
          let allTypes = '';
          for (let j = 0; j < details.types.length; j++) {
            allTypes += details.types[j].type.name;
            if (j < details.types.length - 1) {
              allTypes += ' / ';
            }
          }
          let hewe: string;
          hewe = details.height + ' / ' + details.weight;
          let ability = '';
          for (let k = 0; k < details.abilities.length; k++) {
            ability += details.abilities[k].ability.name;
            if (k < details.abilities.length - 1) {
              ability += ' / ';
            }
          }
          let exp = '';
          exp = details.base_experience;
          this.ELEMENT_DATA.push(new PokeDetails(details.name, allTypes, hewe, ability, exp));
          this.dataSource = new MatTableDataSource<PokeDetails>(this.ELEMENT_DATA);
        });
      }
      if ((this.name === '' || this.name == null) && (this.type.length > 0)) {
        this.ELEMENT_DATA = [];
        this.dataSource = new MatTableDataSource<PokeDetails>(this.ELEMENT_DATA);
        this.service.getSameTypePokemons(this.type.toLowerCase()).subscribe(typedetails => {
          console.log('Ovo su Type Details', typedetails);
          const pokemons = typedetails.pokemon;
          this.pokemonSize = typedetails.pokemon.length;
          if (pokemons.length <= 5) {
            this.pageSizeOptions = [pokemons.length];
            this.currentPageSize = pokemons.length;
          }
          if (pokemons.length >= 10 && pokemons.length <= 20 ) {
            this.pageSizeOptions = [10, pokemons.length];
            this.currentPageSize = 10;
          }
          if (pokemons.length > 20 && pokemons.length <= 30 ) {
            this.pageSizeOptions = [10, 20, pokemons.length];
            this.currentPageSize = 10;
          }
          if (pokemons.length > 30) {
            this.pageSizeOptions = [10, 20, 30, pokemons.length];
            this.currentPageSize = 10;
          }
          console.log(this.currentPageSize);
          for (let i = 0; i < pokemons.length; i++) {
            this.service.getPokemonDetails(pokemons[i].pokemon.name).subscribe(details => {
              console.log('22222222Najnoviji imena za Type', details);
              let allTypes = '';
              for (let j = 0; j < details.types.length; j++) {
                // console.log(details.types[z].type.name);
                allTypes += details.types[j].type.name;
                if (j < details.types.length - 1) {
                  allTypes += ' / ';
                }
              }
              let hewe = '';
              hewe = details.height + ' / ' + details.weight;
              console.log('Ovo je Height/Weight', hewe);
              let ability = '';
              for (let k = 0; k < details.abilities.length; k++) {
                // console.log('Ovo su base ability', details.abilities[k].ability.name);
                ability += details.abilities[k].ability.name;
                if (k < details.abilities.length - 1) {
                  ability += ' / ';
                }
              }
              console.log('Ovo su ability', ability);
              let exp = '';
              exp = details.base_experience;
              this.ELEMENT_DATA.push(new PokeDetails(details.name, allTypes, hewe, ability, exp));
              this.dataSource = new MatTableDataSource<PokeDetails>(this.ELEMENT_DATA);
            });
          }
        });
      }
    }
  }

  public pageChanged(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.currentPageSize = event.pageSize;
    this.onFilter();
    console.log(this.currentPage);
    console.log(this.currentPageSize);
  }
  openInfoMsg(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 3500});
  }
}

