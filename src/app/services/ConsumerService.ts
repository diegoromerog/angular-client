import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { environment } from "../../environments/environment";
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import 'rxjs/Rx';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
import { WebServices } from "./WebServices";

@Injectable()
export class ConsumerService {

    private loadNumber = 0;
    private load = Array();

    constructor(private http: Http) {
    }

    public getById(urlWebService: WebServices, id: number) {
        return this.mapObservable(this.http.get(environment.URL_WS_BACKEND + urlWebService + "/" + id, { headers: this.generateHeader() }));
    }

    public get(urlWebService: WebServices) {
        return this.mapObservable(this.http.get(environment.URL_WS_BACKEND + urlWebService, { headers: this.generateHeader() }));
    }

    public put(urlWebService: WebServices | string, id: number) {
        return this.mapObservable(this.http.put(environment.URL_WS_BACKEND + urlWebService + "/" + id, {}, { headers: this.generateHeader() }));
    }

    public set(urlWebService: WebServices, elemento: any) {
        return this.mapObservable(this.http.put(environment.URL_WS_BACKEND + urlWebService, elemento, { headers: this.generateHeader() }));
    }

    public post(urlWebService: WebServices, elemento: any) {
        return this.mapObservable(this.http.post(environment.URL_WS_BACKEND + urlWebService, elemento, { headers: this.generateHeader() }));
    }

    public postImage(urlWebService: WebServices, elemento: any) {
        return this.mapObservable(this.http.post(environment.URL_WS_BACKEND + urlWebService, elemento, { headers: this.generateHeaderImage() }));
    }

    generateHeader(): Headers {
        const headers = new Headers({ "Content-Type": "application/json" });
        headers.set('token', "xx");
        if (sessionStorage.getItem(environment.idUsuario)!=undefined){
            headers.set('user', "a");
        } else {
            headers.set('user', "0");
        }
        return headers;
    }

    generateHeaderImage(): Headers {
        const headers = new Headers({ "Accept": "application/json" });
        return headers;
    }

    mapObservable(observable: Observable<any>): Observable<any> {
        let reference = this.createLoad();
        return observable
            .map((res) => {
                res = res.json();
                sessionStorage.setItem(environment.token_name, res.token);
                this.stopLoad(reference);
                return res;
            })
            .catch((error: any) => {
                this.stopLoad(reference);
                console.log("-----");
                console.log(error);
                console.log("-----");
                let codError: number;
                codError = this.validateError(error);

                if (codError == 401) {
                    console.log("no autorizado");
                    sessionStorage.removeItem(environment.token_name);
                    sessionStorage.removeItem(environment.user);
                }
                else {
                    console.log(error);
                }
                return throwError(error);
            }
            );
    }

    validateError(error: any): number {
        let codError: number;
        codError = 0;

        try {
            if (Number(error.json().message.trim()) == 401) {
                codError = 401;
            }
        }
        catch(error) {
            console.error(error);
        }

        return codError;
    }

    createLoad(): number {
        let reference = this.loadNumber++;
        this.load[reference] = true;
        return reference;
    }

    stopLoad(reference: number) {
        setTimeout(() => {
            this.load[reference] = false;
        }, 300);
    }

    getLoading(): boolean {
        for (const value of this.load) {
            if (value) return true;
        }
        this.loadNumber = 0;
        this.load = new Array();
        return false;
    }

}

