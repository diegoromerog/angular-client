import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConsumerServicesService } from 'src/app/services/consumer-services.service';
import { servicio } from 'src/app/services/servicio';
import { WebServices } from 'src/app/services/WebServices';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  public frase: servicio = { value: "", icon_url: "", id: "", url: "" };
  public texto: string = "";

  constructor(
    private serv: ConsumerServicesService,
  ) { }

  ngOnInit(): void {
  }

  myFunction(){    
    this.serv.postServicio("").subscribe(
      frase => (this.frase = frase)
      );
      this.texto = this.frase.value;
  }

}
