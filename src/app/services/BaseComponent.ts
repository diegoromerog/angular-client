import { Router } from "@angular/router";
import { environment } from "../../environments/environment";
import { RespuestaWS } from "./RespuestaWS";

export class BaseComponent{

    private respuesta: RespuestaWS;

    constructor(){
        this.respuesta = new RespuestaWS (null, null, "");
    }

    public validarError(error: any){
        if (error.json().message == "401 UNAUTHORIZED"){
            sessionStorage.clear();
        }
        else{
            console.log("error");
            console.log(error.json());
        }
    }

    public recibirRespuesta(pRespuesta: any): RespuestaWS{
        console.log(pRespuesta);
        this.respuesta = pRespuesta.json();
        return this.respuesta;
    }

}
