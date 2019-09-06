import { Component, OnInit, Inject } from '@angular/core';
import {PokeapiService} from '../pokeapi.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  name: string;
  type: string;
  height: string;
  weight: string;
  ability: string;
  doubleDamageFrom: string;
  doubleDamageTo: string;
  halfDamageTo: string;
  halfDamageFrom: string;
  noDamageTo: string;
  noDamageFrom: string;

  constructor(
    private service: PokeapiService,
    private dialog: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    console.log('Ovo bi trebalo biti data za dijalog', this.data);
    this.name = this.data.name;
    this.type = this.data.type;
    this.height = this.data.height;
    this.weight = this.data.weight;
    this.ability = this.data.ability;
    this.doubleDamageFrom = this.data.doubleDamageFrom;
    this.doubleDamageTo = this.data.doubleDamageTo;
    this.halfDamageTo = this.data.halfDamageTo;
    this.halfDamageFrom = this.data.halfDamageFrom;
    this.noDamageTo = this.data.noDamageTo;
    this.noDamageFrom = this.data.noDamageFrom;
  }
  onClose() {
    this.dialog.close();
  }
}
