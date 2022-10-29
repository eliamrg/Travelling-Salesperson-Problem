import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-interfaz',
  templateUrl: './interfaz.component.html',
  styleUrls: ['./interfaz.component.css']
})
export class InterfazComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.GenerarDiagrama();
  }
  
  nuevoNodoMensaje="Agregar Nodo";
  Nodos:string[] = ["","A","B","C"] ;
  Distancias :string[][] = [
    [this.Nodos[1],"-","2","3"],
    [this.Nodos[2],"2","-","25"],
    [this.Nodos[3],"3","25","-"]
  ];

  links=[
    {
      id: 'AB',
      source: 'A',
      target: 'B',
      label: '2'
    },
    {
      id: 'AC',
      source: 'A',
      target: 'C',
      label: '3'
    },
    {
      id: 'BC',
      source: 'B',
      target: 'C',
      label: '25'
    }
  ];
  nodes=[
    {
      id: 'A',
      label: 'A'
    },/* {
      id: 'B',
      label: 'B'
    }, {
      id: 'C',
      label: 'C'
    }*/
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
  agregarNodo(){
    if(this.Nodos.length<=10){
      let nuevoNodo=String.fromCharCode(64+this.Nodos.length);
      this.Nodos.push(nuevoNodo);
      let arr = new Array<string>(this.Nodos.length);
      arr.fill("0");
      arr[0]=nuevoNodo;
      arr[arr.length-1]="-";
      this.Distancias.push(arr);
      try{
        for(let i=0;i<this.Nodos.length;i++){
          for(let j=0;j<this.Nodos.length;j++){
            if(this.Distancias[i][j]==undefined){
              this.Distancias[i].push("0");
            }
          }
        }
      }catch(error){}
      
      console.log(this.Distancias);
      console.log(this.Nodos);
    }else{this.nuevoNodoMensaje="Numero Máximo de Nodos Alcanzados (10)"}
   this.GenerarDiagrama();
  }

  GenerarDiagrama(){
    for(let i=2;i<this.Nodos.length;i++){
      this.nodes.push({
        id: this.Nodos[i],
        label: this.Nodos[i]
      })
      
    }

    //modificar esto
    for(let i=2;i<this.Nodos.length;i++){
      this.links.push({
        id: this.Nodos[i]+'C',
        source: this.Nodos[i],
        target: 'C',
        label: '145'
      })
    }
    console.log("DIAGRAMA")
    
  }
}
