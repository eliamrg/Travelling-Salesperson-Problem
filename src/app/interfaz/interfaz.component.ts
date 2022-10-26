import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-interfaz',
  templateUrl: './interfaz.component.html',
  styleUrls: ['./interfaz.component.css']
})
export class InterfazComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  
   links=[
    {
      id: 'a',
      source: 'first',
      target: 'second',
      label: '500m'
    }, {
      id: 'b',
      source: 'first',
      target: 'c1',
      label: '100m'
    }, {
      id: 'd',
      source: 'first',
      target: 'c2',
      label: '200m'
    }, {
      id: 'e',
      source: 'c1',
      target: 'd',
      label: '150m'
    }, {
      id: 'f',
      source: 'c1',
      target: 'd',
      label: '100m'
    }
  ];
  nodes=[
    {
      id: 'first',
      label: 'MI CASA'
    }, {
      id: 'second',
      label: 'Pizza'
    }, {
      id: 'c1',
      label: 'Tacos'
    }, {
      id: 'c2',
      label: 'ESCUELA'
    }, {
      id: 'd',
      label: 'lugarsillo X'
    }
  ];
  leerLinks() {
    //let data = [this.multiple.find((e) => e.name == name)];
    let data = this.links;
    return data;
  }
  leerNodos() {
    //let data = [this.multiple.find((e) => e.name == name)];
    let data = this.nodes;
    return data;
  }
}
