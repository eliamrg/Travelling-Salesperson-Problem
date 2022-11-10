import { Component, OnInit, ResolvedReflectiveFactory } from '@angular/core';

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

  Resolver(/*grafo:string[][]*/origen:number){
    let grafo:number[][];
    
    let vertice: Array<number>=[];
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
    /*grafo=[ [ 0, 10, 15, 20],
    [ 10, 0, 35, 25 ],
    [ 15, 35, 0, 30 ],
    [ 20, 25, 30, 45 ] ];*/
    grafo=this.SimplificarArreglo();
    let V =grafo.length;
    console.log(grafo)
 
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
            console.log("Ruta: "+ruta)
            // calcular el costo de la ruta actual
            for (let i = 0; i < vertice.length; i++) {
              console.log("Avanzar a nodo "+(vertice[i]+1)+ " Costo= "+grafo[k][vertice[i]])
              //console.log("graph[" +(k+1)+"][vertex["+(i+1)+"]] =" +graph[k][vertex[i]])
              rutaActual+="-"+String.fromCharCode(64+(vertice[i]+1));  
              costoRutaActual += Number(grafo[k][vertice[i]]);
                k = vertice[i];
            }
            
            costoRutaActual += Number(grafo[k][origen]);
            rutaActual+="-A";
            if(costoRutaActual== Math.min(distanciaMinima, costoRutaActual)){
              rutaMinima=rutaActual;
            }
            // actualizar minimo
            distanciaMinima
                = Math.min(distanciaMinima, costoRutaActual);
            ruta++;
 
        } while (this.findNextPermutation(vertice));
        
        //regresa el costo minimo;
        console.log ("Costo mínimo: "+distanciaMinima);
        console.log(rutaMinima)
  }
  findNextPermutation(datos: Array<number>)
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
        let nextGreater = datos.length - 1;
 
        // Encontrar el sucesor más a la derecha del pivote
        for (let i = datos.length - 1; i > last; i--) {
            if (datos[i] >  datos[last]) {
                nextGreater = i;
                break;
            }
        }
 
        
        // Intercambiar el sucesor y el pivote
        datos = this.swap(datos, nextGreater, last);
 
        //Invertir el sufijo

        datos = this.reverse(datos, last + 1, datos.length - 1);
 
        // Devuelve verdadero cuando se realiza la siguiente permutación
        return true;
    }
    
    swap(datos: Array<number> , left: number, right: number)
    {
    // intercambiar los datos
    let temp = datos[left];
    datos[left] = datos[right];
    datos[right] = temp;

    // Devolver la matriz actualizada
    return datos;
    }

    //Función para invertir el subarreglo comenzando de izquierda a derecha 
    reverse(datos: Array<number>, left: number, right: number)
    {
    // Inversion del sub arreglo
    while (left < right) {
    let temp = datos[left];
    datos[left++] = datos[right];
    datos[right--] = temp;
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


