import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Aeropuerto } from './interface/aeropuerto';
import { AeropuertoService } from './aeropuerto.service';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private fb:FormBuilder,private aeropuertoService:AeropuertoService,private messageService:MessageService,private confirmationSerice:ConfirmationService){

  }
  ngOnInit(){
    // this.aeropuertoService.getAllAeropuertos().subscribe(
    //   data=>{
    //     this.aeropuertos=data;
    //   }
    // )
    this.aeropuertos=[
      {
        iata:'1',
        airport:'Mariscal Sucre',
        city:'Cuenca',
        state:'Azuay',
        country:'Ecuador',
        lat:82.24,
        long:58.8
      }
    ]
  }

  aeropuertos:Aeropuerto[]=[];
  aeropuertosSeleccionados:Aeropuerto[]=[]
  dialogNuevoAeropuerto:boolean=false;
  dialogEditarAeropuerto:boolean=false;
  aeropuertoForm:FormGroup=this.fb.group({
    iata:[''],
    airport:[''],
    city:[''],
    state:[''],
    country:[''],
    lat:[''],
    long:['']
  });
  guardandoCambios:boolean=false;

  eliminarSeleccionados(){
    this.confirmationSerice.confirm({
      message: 'Are you sure you want to delete the selected products?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              this.aeropuertosSeleccionados.forEach(aeropuerto => {
                this.aeropuertoService.deleteAeropuerto(aeropuerto.iata!).subscribe();
            });
            this.aeropuertos=this.aeropuertos.filter(aeropuerto=>!this.aeropuertosSeleccionados.includes(aeropuerto));
            this.aeropuertosSeleccionados=[];
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'Eliminacion correcta', life: 3000});
            }
      
    })
  }

 
  actualizarAeropuerto(){
    this.guardandoCambios=true;
    this.aeropuertoService.putAeropuerto(this.aeropuertoForm.value).subscribe(
      data=>{
        console.log(data);
        this.guardandoCambios=false;
      }
    )
  }

  agregarAeropuerto(){
    this.aeropuertoForm.markAllAsTouched();

  }
  eliminarAeropuerto(aeropuerto:Aeropuerto){
    this.confirmationSerice.confirm({
      message: 'Esta seguro de eliminar el aeropuerto?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.aeropuertoService.deleteAeropuerto(aeropuerto.iata!).subscribe(
            data=>{
              console.log('aeropuerto eliminado');
              console.log(data)
            }
          );
      }
    })
  }

  
  llenarValoresForm(aeropuerto:any){
    if(aeropuerto===true){
      this.aeropuertoForm.controls['iata'].setValue('')
      this.aeropuertoForm.controls['airport'].setValue('')
      this.aeropuertoForm.controls['city'].setValue('')
      this.aeropuertoForm.controls['state'].setValue('')
      this.aeropuertoForm.controls['country'].setValue('')
      this.aeropuertoForm.controls['lat'].setValue('')
      this.aeropuertoForm.controls['long'].setValue('')
    }else{
      this.aeropuertoForm.controls['iata'].setValue(aeropuerto.iata)
      this.aeropuertoForm.controls['airport'].setValue(aeropuerto.airport)
      this.aeropuertoForm.controls['city'].setValue(aeropuerto.city)
      this.aeropuertoForm.controls['state'].setValue(aeropuerto.state)
      this.aeropuertoForm.controls['country'].setValue(aeropuerto.country)
      this.aeropuertoForm.controls['lat'].setValue(aeropuerto.lat)
      this.aeropuertoForm.controls['long'].setValue(aeropuerto.long)
     
    }
   
    
}

  openDialogoNuevoAeropuerto(){
    this.llenarValoresForm(true);
    this.dialogNuevoAeropuerto=true;
    
  }
  openDialogoEditarAeropuerto(aeropuerto:Aeropuerto){
    this.llenarValoresForm(aeropuerto);
    this.dialogEditarAeropuerto=true;
    
  }
  closeDialogoNuevoAeropuerto(){
    this.dialogNuevoAeropuerto=false;
  }
  closeDialogoEditarAeropuerto(){
    this.dialogEditarAeropuerto=false;
  }
  

}
