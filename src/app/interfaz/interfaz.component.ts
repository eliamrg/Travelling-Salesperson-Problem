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
  nodosVisitados:string[]=["A"] ;
  distanciaRecorrida=0;
  nuevoNodoMensaje="Agregar Nodo";
  Nodos:string[] = ["","A","B","C"] ;
  TablaDistancias :string[][] = [
    [this.Nodos[1],"0","2","3"],
    [this.Nodos[2],"2","0","25"],
    [this.Nodos[3],"3","25","0"]
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

  //ALGORITMO DEL VECINO MAS CERCANO
  //PASO 1: SE PARTE DE UN NODO ORIGEN "0"
  //PASO 2: SE ENCUENTRA LA RUTA MAS CORTA A OTRO NODO "1" Y SE GUARDA LA DISTANCIA
  //PASO 3: EL NODO "1" AHORA ES EL ORIGEN
  //PASO 4: SE MARCA EL NODO ANTERIOR "0" COMO VISITADO 
  //PASO 5: SI TODOS LOS NODOS FUERON VISITADOS SE ACABA EL PROCESO
  //PASO 6: SI NO, VOLVER AL PASO 2
   
  //PASO 1
  origen:number=0; nodoCercano:number=2; nodoAnterior=0;
  vecinoMasCercano(){
    this.GenerarDiagrama();
    //DATOS DE PRUEBA
    let DistanciasPrueba= [
        ["A", "0", "2451", "713", "1018", "1631", "1374", "2408", "213", "2571", "875", "1420", "2145", "1972" ],
        ["B", "2451", "0", "1745", "1524", "831", "1240", "959", "2596", "403", "1589", "1374", "357", "579" ],
        ["C", "713", "1745", "0", "355", "920", "803", "1737", "851", "1858", "262", "940", "1453", "1260" ],
        ["D", "1018", "1524", "355", "0", "700", "862", "1395", "1123", "1584", "466", "1056", "1280", "987" ],
        ["E", "1631", "831", "920", "700", "0", "663", "1021", "1769", "949", "796", "879", "586", "371" ],
        ["F", "1374", "1240", "803", "862", "663", "0", "1681", "1551", "1765", "547", "225", "887", "999" ],
        ["G", "2408", "959", "1737", "1395", "1021", "1681", "0", "2493", "678", "1724", "1891", "1114", "701" ],
        ["H", "213", "2596", "851", "1123", "1769", "1551", "2493", "0", "2699", "1038", "1605", "2300", "2099" ],
        ["I", "2571", "403", "1858", "1584", "949", "1765", "678", "2699", "0", "1744", "1645", "653", "600" ],
        ["J", "875", "1589", "262", "466", "796", "547", "1724", "1038", "1744", "0", "679", "1272", "1162" ],
        ["K", "1420", "1374", "940", "1056", "879", "225", "1891", "1605", "1645", "679", "0", "1017", "1200" ],
        ["L", "2145", "357", "1453", "1280", "586", "887", "1114", "2300", "653", "1272", "1017", "0", "504"],
        ["M", "1972", "579", "1260", "987", "371", "999", "701", "2099", "600", "1162", "1200", "504", "0" ]
    ];
    
    
    this.TablaDistancias=DistanciasPrueba;
    this.Nodos=["","A","B","C","D","E","F","G","H","I","J","K","L","M",]
    
    //PASO 2
    let Distancias:number[][]=this.SimplificarArreglo();
    let DistanciasPosibles:number[][]=this.ArregloDistanciasPosibles();
    /*for(let i=1;i<=this.nodosVisitados.length;i++){
      console.log(this.nodosVisitados);
      
      if(this.nodosVisitados.includes(String.fromCharCode(64+i))){
        console.log("ORIGEN:"+this.origen+ "ELIMINAR :"+String.fromCharCode(64+i))
        DistanciasPosibles[this.origen][i-1]=999999999;
      }
    }console.log(DistanciasPosibles);*/

    


   
    this.nodoCercano=Distancias[this.origen].indexOf(Math.min(...DistanciasPosibles[this.origen]))+1;
    console.log(this.origen,this.nodoCercano,String.fromCharCode(65+this.origen)+" x "+String.fromCharCode(64+this.nodoCercano) + " DIST: " +this.TablaDistancias[this.origen][this.nodoCercano] );
    this.distanciaRecorrida+=Number(this.TablaDistancias[this.origen][this.nodoCercano]);
    //PASO 3
    this.origen=this.nodoCercano-1;
    //PASO 4
    this.nodosVisitados.push(String.fromCharCode(64+this.nodoCercano));

    console.log("NODO VISITADO: "+String.fromCharCode(64+this.nodoCercano));


    //PASO 5
    if (this.nodosVisitados.length!=this.Nodos.length-1){
      //PASO 2
      this.vecinoMasCercano();
    }  
    //console.log(this.nodosVisitados);
  }

  SimplificarArreglo(){
    let arr:number[][]=[];
    for(let i=0;i<this.TablaDistancias.length;i++){
      arr.push([]);
      for(let j=1;j<this.TablaDistancias[i].length;j++){
        //console.log(i,j,this.TablaDistancias[i][j]);
        arr[i].push(Number(this.TablaDistancias[i][j]));
        
      }
    }
    //console.log(arr);
    return arr;
  }

  ArregloDistanciasPosibles(){
    let arr:number[][]=[];
    for(let i=0;i<this.TablaDistancias.length;i++){
      arr.push([]);
      for(let j=1;j<this.TablaDistancias[i].length;j++){
        //console.log(i,j,this.TablaDistancias[i][j]);
        //if(Number(this.TablaDistancias[i][j])!=0 /*&& !this.nodosVisitados.includes(String.fromCharCode(64+j))*/)
        arr[i].push(Number(this.TablaDistancias[i][j]));
        
      }
    }
    console.log(arr);
    return arr;
  }
/*do{
        for(let i=1;i<=this.Distancias[origen].length;i++){
          console.log("for")
          if (i==1){
            for(let j=1;j<=this.nodosVisitados.length;j++){
              if(!this.nodosVisitados.includes(String.fromCharCode(64+j))){
                nodoCercano=j;
                break;
              }
            }           
          }
          else if( !this.nodosVisitados.includes(String.fromCharCode(64+i)) && (Number(this.Distancias[origen][nodoCercano])>Number(this.Distancias[origen][i])) && Number(this.Distancias[origen][i])!=0){
            nodoCercano=i;
          }
        }
        
        console.log(String.fromCharCode(64+nodoCercano));
        console.log(this.Distancias[origen][nodoCercano]);
        this.distanciaRecorrida+=Number(this.Distancias[origen][nodoCercano]);
        this.nodosVisitados.push(String.fromCharCode(64+nodoCercano));

        origen=nodoCercano;
    }while(this.nodosVisitados.length!=this.Nodos.length-1);
    
    console.log(this.nodosVisitados);
    console.log(this.distanciaRecorrida);*/

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
      this.TablaDistancias.push(arr);
      try{
        for(let i=0;i<this.Nodos.length;i++){
          for(let j=0;j<this.Nodos.length;j++){
            if(this.TablaDistancias[i][j]==undefined){
              this.TablaDistancias[i].push("0");
            }
          }
        }
      }catch(error){}
      
      console.log(this.TablaDistancias);
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
    //console.log("DIAGRAMA")
    
  }
}
