import { Component } from '@angular/core';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private puerto!:  SerialPort;
  private writer!: any;
  private interval: any;
  public date!:any;
  private indice_actual:number = -1;
  public horas =[
    {
      hora: new Date(0,0,0,7,0),
      estado: true,
    },
    {
      hora: new Date(0,0,0,7,50),
      estado: true,
    },
    {
      hora: new Date(0,0,0,8,40),
      estado: true,
    },
    {
      hora: new Date(0,0,0,9,30),
      estado: true,
    },
    {
      hora: new Date(0,0,0,10,0),
      estado: true,
    },
    {
      hora: new Date(0,0,0,10,50),
      estado: true,
    },
    {
      hora: new Date(0,0,0,11,40),
      estado: true,
    },
    {
      hora: new Date(0,0,0,12,30),
      estado: true,
    },
    {
      hora: new Date(0,0,0,13,20),
      estado: true,
    },
    {
      hora: new Date(0,0,0,14,10),
      estado: true,
    },
    {
      hora: new Date(0,0,0,15,50),
      estado: true,
    },

  ]

  constructor() {


  }

  conectar()
  {
    navigator.serial.requestPort().then(port=>{
    
      this.puerto = port;
      this.puerto.open({baudRate: 9600}).then(()=>{

        this.writer = this.puerto.writable.getWriter();
        this.interval = setInterval(()=>{
          this.date = new Date();
      
          for(let i in this.horas)
          { 
            if(this.horas[i].hora.getHours()== this.date.getHours() && this.horas[i].hora.getMinutes() == this.date.getMinutes() && this.indice_actual !=parseInt(i) && this.horas[i].estado ){
              this.activar();
              console.log("Rinnnnnnn!");
              this.indice_actual = parseInt(i);
            }

          }
      
          
        }, 1000)
      })
    })
  }

  activar()
  {
    const data = new Uint8Array([100]);
    this.writer.write(data);
  }

  prueba()
  {
    const data = new Uint8Array([100]);
    this.writer.write(data);
  }
}
