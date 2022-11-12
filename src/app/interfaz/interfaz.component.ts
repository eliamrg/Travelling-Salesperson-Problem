import { Component, ElementRef, Input, OnInit, ResolvedReflectiveFactory, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-interfaz',
  templateUrl: './interfaz.component.html',
  styleUrls: ['./interfaz.component.css']
})
export class InterfazComponent implements OnInit {
  update$: Subject<any> = new Subject();
  constructor() { }
  ngOnInit(): void {
    this.GenerarDiagrama();
  }


  /*ngAfterViewInit() {
    var width = this.myIdentifier.nativeElement.offsetWidth;
    var height = this.myIdentifier.nativeElement.offsetHeight;
   
    console.log('Width:' + width);
    console.log('Height: ' + height);
  }
  
  @ViewChild('myIdentifier')
  myIdentifier: ElementRef;*/
  

  
  nodosVisitados:string="" ;
  distanciaRecorrida=0;
  nuevoNodoMensaje="Agregar Nodo";
  Nodos:string[] = ["","A","B","C"] ;
  TablaDistancias :string[][] = [
    [this.Nodos[1],"0","1","1"],
    [this.Nodos[2],"1","0","1"],
    [this.Nodos[3],"1","1","0"]
  ];

  links=[
    {
      id: 'AB',
      source: 'A',
      target: 'B',
      label: this.TablaDistancias[0][2]
    }/*,
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
    },
    {
      id: 'BA',
      source: 'B',
      target: 'A',
      label: '2'
    }*/
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

  Resolver(/*grafo:string[][]*/origen:number){
    let grafo:number[][];
    
    let vertice: Array<number>=[];
    
    
    grafo=this.SimplificarArreglo();
    let V =grafo.length;
    console.log(grafo)
    this.GenerarDiagrama();
 
        for (let i = 0; i < V; i++)
            if (i != origen)
            vertice.push(i);
 
        // almacenar costo minimo
        // Ciclo hamiltoniano.

        //ese es un numero muy grande xd. Nomas pa guardar el minimo al compararlo con ese
        let distanciaMinima = Number.MAX_VALUE;
        let rutaMinima="";
        let ruta=1;
        do {
            // almacenar el costp de la ruta actual 
            let costoRutaActual = 0;
            let rutaActual = "A";
            let k = origen;
            //console.log("Ruta: "+ruta)
            // calcular el costo de la ruta actual
            for (let i = 0; i < vertice.length; i++) {
              //console.log("Avanzar a nodo "+(vertice[i]+1)+ " Costo= "+grafo[k][vertice[i]])
              //console.log("graph[" +(k+1)+"][vertex["+(i+1)+"]] =" +graph[k][vertex[i]])
              rutaActual+="-"+String.fromCharCode(64+(vertice[i]+1));  
              costoRutaActual += Number(grafo[k][vertice[i]]);
                k = vertice[i];
            }
            
            costoRutaActual += Number(grafo[k][origen]);
            rutaActual+="-A";

            console.log("Ruta "+ruta+": "+rutaActual+" Costo: "+costoRutaActual);
            if(costoRutaActual== Math.min(distanciaMinima, costoRutaActual)){
              rutaMinima=rutaActual;
            }
            // actualizar minimo
            distanciaMinima
                = Math.min(distanciaMinima, costoRutaActual);
            ruta++;
 
        } while (this.encontrarSiguientePermutacion(vertice));
        
        //regresa el costo minimo;
        console.log ("Costo mínimo: "+distanciaMinima);
        console.log(rutaMinima)
        this.distanciaRecorrida=distanciaMinima;
        this.nodosVisitados=rutaMinima;
        
  }
  encontrarSiguientePermutacion(datos: Array<number>)
  {
        // Si el conjunto de datos dado está vacío
        // o contiene solo un elemento
        // la siguiente permutacion no es posible
        if (datos.length <= 1)
            return false;
        let last = datos.length - 2;
 
        // Encontrar el sufijo no creciente más largo y el pivote
        while (last >= 0) {
            if (datos[last] <  datos[last + 1])
                break;
            last--;
        }
 
        // Si no hay par creciente no hay permutación de mayor orden
        if (last < 0)
            return false;
        let siguienteMayor = datos.length - 1;
 
        // Encontrar el sucesor más a la derecha del pivote
        for (let i = datos.length - 1; i > last; i--) {
            if (datos[i] >  datos[last]) {
                siguienteMayor = i;
                break;
            }
        }
 
        
        // Intercambiar el sucesor y el pivote
        datos = this.intercambiar(datos, siguienteMayor, last);
 
        //Invertir el sufijo

        datos = this.reversa(datos, last + 1, datos.length - 1);
 
        // Devuelve verdadero cuando se realiza la siguiente permutación
        return true;
    }
    
    intercambiar(datos: Array<number> , izquierda: number, derecha: number)
    {
    // intercambiar los datos
    let temp = datos[izquierda];
    datos[izquierda] = datos[derecha];
    datos[derecha] = temp;

    // Devolver la matriz actualizada
    return datos;
    }

    //Función para invertir el subarreglo comenzando de izquierda a derecha 
    reversa(datos: Array<number>, izquierda: number, derecha: number)
    {
    // Inversion del sub arreglo
    while (izquierda < derecha) {
    let temp = datos[izquierda];
    datos[izquierda++] = datos[derecha];
    datos[derecha--] = temp;
    }

    // regresar el arreglo actualizado
    return datos;
    }


    
 
//A PARTIR DE AQUI SON COSAS PARA LA INTERFAZ, LA LOGICA ES LO DE ARRIBA:))


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

  leerLinks() {
    //let datos = [this.multiple.find((e) => e.name == name)];
    let datos = this.links;
    return datos;
  }
  leerNodos() {
    //let datos = [this.multiple.find((e) => e.name == name)];
    let datos = this.nodes;
    return datos;
  }

  updateChart(){
    this.update$.next(true);
  }
  eliminarNodo(){
    if(this.Nodos.length>4){
      this.Nodos.pop();
      this.TablaDistancias.pop();

      for(let i=0;i<=this.Nodos.length;i++){
        this.TablaDistancias[i].pop();
      }
    }
    this.GenerarDiagrama();
  }
  Ejemplo(){
    let DistanciasPrueba= [
      ["A", "0", "2451", "713", "1018", "1631", "1374"],
      ["B", "2451", "0", "1745", "1524", "831", "1240"],
      ["C", "713", "1745", "0", "355", "920", "803"],
      ["D", "1018", "1524", "355", "0", "700", "862"],
      ["E", "1631", "831", "920", "700", "0", "663"],
      ["F", "1374", "1240", "803", "862", "663", "0" ],
      
  ];
  
  this.Nodos=["","A","B","C","D","E","F"]
  
  this.TablaDistancias=DistanciasPrueba;
    this.Resolver(0);
  }
  agregarNodo(){
    
    if(this.Nodos.length<=8){
      let nuevoNodo=String.fromCharCode(64+this.Nodos.length);
      this.Nodos.push(nuevoNodo);
      let arr = new Array<string>(this.Nodos.length);
      arr.fill("1");
      arr[0]=nuevoNodo;
      arr[arr.length-1]="0";
      this.TablaDistancias.push(arr);
      try{
        for(let i=0;i<this.Nodos.length;i++){
          for(let j=0;j<this.Nodos.length;j++){
            if(this.TablaDistancias[i][j]==undefined){
              this.TablaDistancias[i].push("1");
            }
          }
        }
      }catch(error){}
      
      console.log(this.TablaDistancias);
      console.log(this.Nodos);
    }else{this.nuevoNodoMensaje="Numero Máximo de Nodos Alcanzados (8)"}
   this.GenerarDiagrama();
   
  }

  GenerarDiagrama(){

    this.links=[
      {
        id: 'AB',
        source: 'A',
        target: 'B',
        label: this.TablaDistancias[0][2]
      }
    ];
    this.nodes=[
      {
        id: 'A',
        label: 'A'
      }
    ];
    /*for(let i=2;i<this.nodes.length;i++){
      this.nodes.pop();
    }
    for(let i=1;i<this.links.length;i++){
      this.links.pop();
    }*/
    

    for(let i=2;i<this.Nodos.length;i++){
      this.nodes.push({
        id: this.Nodos[i],
        label: this.Nodos[i]
      })
      console.log(this.nodes[i-1]);
      
    }

    //modificar esto
    let grafo: number[][]=this.SimplificarArreglo();
    
    for(let i=0;i<grafo.length;i++){
      for(let j=0;j<grafo[i].length;j++){
        console.log(i,j)
        if(i!=j && i<j){
          if(!(i==0&&j==1)){
            this.links.push({
              id: this.Nodos[i+1]+this.Nodos[j+1],
              source: this.Nodos[i+1],
              target: this.Nodos[j+1],
              label: grafo[i][j].toString()
            })
            console.log(grafo[i][j]);
          }
          
        }
        /* if(i+1!=j && (i!=0 && j!=2)){
          this.links.push({
            id: this.Nodos[i+1]+this.Nodos[j],
            source: this.Nodos[i],
            target: this.Nodos[j],
            label: this.TablaDistancias[i][j]
          })
          console.log(this.links[i])
        } */
      }
        
    }
    //console.log(this.links)
    this.updateChart();
  }
  customTrackBy(index: number, obj: any): any {
    return index;
}
  ActualizarTabla(i:number,j:number){
    try{console.log(this.TablaDistancias)
      console.log(i,j)
      console.log("Cambiar",j-1,i+1)
      this.TablaDistancias[j-1][i+1]=this.TablaDistancias[i][j];
      /*if(j<=1){
        this.TablaDistancias[j][i]=this.TablaDistancias[i][j];
      }*/
      console.log(this.TablaDistancias)
      this.GenerarDiagrama();
    }
      catch(e){}
      
  }
  
}


