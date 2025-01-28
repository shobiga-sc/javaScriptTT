import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Service1Service {

  constructor() { }

  private message: string = 'hello';

  getMessage() : string{
    return this.message;
  }

  setMessage(msg:string): void{
    this.message = msg;
  }
}
