import {Component, OnInit} from '@angular/core';
import {PageEvent} from '@angular/material/typings/paginator';
import {MatDialog, MatDialogConfig, MatTableDataSource} from '@angular/material';
import {PokeapiService} from '../pokeapi.service';
import {PokeNames} from '../pokeNames';
import {DialogComponent} from '../dialog/dialog.component';

@Component({
  selector: 'app-version2',
  templateUrl: './version2.component.html',
  styleUrls: ['./version2.component.css']
})
export class Version2Component implements OnInit {
  pokemonSize: number = 0;
  pageSizeOptions: number[] = [10, 20, 30, 50];
  currentPage: number = 0;
  currentPageSize: number = 10;
  ELEMENT_DATA: PokeNames[] = [];
  displayedColumns: string[] = ['name', 'details'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  constructor(private service: PokeapiService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.loadPokemons();
  }

  private loadPokemons() {
    this.ELEMENT_DATA = [];
    this.dataSource = new MatTableDataSource<PokeNames>(this.ELEMENT_DATA);
    this.service.getAllPokemons(this.currentPage * this.currentPageSize, this.currentPageSize).subscribe(res => {
      const pokemons = res.results;
      this.pokemonSize = res.count;
      for (let i = 0; i < pokemons.length; i++) {
        this.ELEMENT_DATA.push(new PokeNames(pokemons[i].name));
        this.dataSource = new MatTableDataSource<PokeNames>(this.ELEMENT_DATA);
      }
    });
  }

  applyFilter(filterValue: string) {
    if (filterValue === '' || filterValue === null) {
      this.loadPokemons();
    } else {
      this.ELEMENT_DATA = [];
      this.dataSource = new MatTableDataSource<PokeNames>(this.ELEMENT_DATA);
      this.service.getAllPokemonNames().subscribe(res => {
        const pokemons = res.results;
        for (let i = 0; i < pokemons.length; i++) {
          this.ELEMENT_DATA.push(new PokeNames(pokemons[i].name));
          this.dataSource = new MatTableDataSource<PokeNames>(this.ELEMENT_DATA);
        }
        this.dataSource.filter = filterValue.trim().toLowerCase();
      });
    }
  }

  pokemonDetails(event: any) {
    this.service.getPokemonDetails(event).subscribe(more => {
      console.log('ovo je more', more);
      let alltype = '';
      for (let i = 0; i < more.types.length; i++) {
        alltype += more.types[i].type.name;
        if (i < more.types.length - 1) {
          alltype += ' / ';
        }
      }
      let diaheight: string;
      diaheight = more.height;
      let diaweight: string;
      diaweight = more.weight;
      console.log('Ovo je type iz mora', alltype);
      console.log('Ovo je event', event);
      let diability = '';
      for (let k = 0; k < more.abilities.length; k++) {
        diability += more.abilities[k].ability.name;
        if (k < more.abilities.length - 1) {
          diability += ' / ';
        }
      }
      let damageUrl = '';
      for (let l = 0; l < more.types.length; l++) {
        damageUrl = more.types[l].type.url;
        this.service.getDamageRelations(damageUrl).subscribe(dmg => {
          console.log('Ovo je dmg', dmg);
          let ddfrom = '';
          for (let m = 0; m < dmg.damage_relations.double_damage_from.length; m++) {
            ddfrom += dmg.damage_relations.double_damage_from[m].name;
            if (m < dmg.damage_relations.double_damage_from.length) {
              ddfrom += ' / ';
            }
          }
          if (ddfrom === '') {
            ddfrom = 'None';
          } else {
            ddfrom = ddfrom.substring(0, ddfrom.length - 2);
          }
          let ddto = '';
          for (let n = 0; n < dmg.damage_relations.double_damage_to.length; n++) {
            ddto += dmg.damage_relations.double_damage_to[n].name;
            if (n < dmg.damage_relations.double_damage_to.length) {
              ddto += ' / ';
            }
          }
          if (ddto === '') {
            ddto = 'None';
          } else {
            ddto = ddto.substring(0, ddto.length - 2);
          }
          let hdto = '';
          for (let n = 0; n < dmg.damage_relations.half_damage_to.length; n++) {
            hdto += dmg.damage_relations.half_damage_to[n].name;
            if (n < dmg.damage_relations.half_damage_to.length) {
              hdto += ' / ';
            }
          }
          if (hdto === '') {
            hdto = 'None';
          } else {
            hdto = hdto.substring(0, hdto.length - 2);
          }
          let hdfrom = '';
          for (let n = 0; n < dmg.damage_relations.half_damage_from.length; n++) {
            hdfrom += dmg.damage_relations.half_damage_from[n].name;
            if (n < dmg.damage_relations.half_damage_from.length) {
              hdfrom += ' / ';
            }
          }
          if (hdfrom === '') {
            hdfrom = 'None';
          } else {
            hdfrom = hdfrom.substring(0, hdfrom.length - 2);
          }
          let ndto = '';
          for (let n = 0; n < dmg.damage_relations.no_damage_to.length; n++) {
            ndto += dmg.damage_relations.no_damage_to[n].name;
            if (n < dmg.damage_relations.no_damage_to.length) {
              ndto += ' / ';
            }
          }
          if (ndto === '') {
            ndto = 'None';
          } else {
            ndto = ndto.substring(0, ndto.length - 2);
          }
          let ndfrom = '';
          for (let n = 0; n < dmg.damage_relations.no_damage_from.length; n++) {
            ndfrom += dmg.damage_relations.no_damage_from[n].name;
            if (n < dmg.damage_relations.no_damage_from.length) {
              ndfrom += ' / ';
            }
          }
          if (ndfrom === '') {
            ndfrom = 'None';
          } else {
            ndfrom = ndfrom.substring(0, ndfrom.length - 2);
          }
          if (l === more.types.length - 1) {
            const dialogConfig = new MatDialogConfig();
            dialogConfig.height = '80%';
            dialogConfig.width = '99%';
            dialogConfig.disableClose = true;
            dialogConfig.autoFocus = true;
            dialogConfig.data = {
              name: event,
              type: alltype,
              height: diaheight,
              weight: diaweight,
              ability: diability,
              doubleDamageFrom: ddfrom,
              doubleDamageTo: ddto,
              halfDamageTo: hdto,
              halfDamageFrom: hdfrom,
              noDamageTo: ndto,
              noDamageFrom: ndfrom
            };
            this.dialog.open(DialogComponent, dialogConfig);
          }
        });
      }
      console.log('ovo je URL', damageUrl);
    });
  }
  public pageChanged(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.currentPageSize = event.pageSize;
    this.loadPokemons();
  }
}
