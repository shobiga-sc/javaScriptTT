import { Component, inject, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';
import { LifeCycleComponent } from '../life-cycle/life-cycle.component';
import { FormsModule } from '@angular/forms'; 


@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ CommonModule, NgIf, LifeCycleComponent, FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {



    responseData: any;
    inputData: string = 'data to child';

     constructor(private apiService : ApiService){

     }

     ngOnInit():void{
        this.getData();
     }

     getData(){
         this.apiService.getData().subscribe({
          next: (data) => {
            this.responseData = data;
          },
          error: (err) =>{
            console.error('Error: ',err);
          }
         })
     }

     method(){
      console.log("clicked");
     }


}
