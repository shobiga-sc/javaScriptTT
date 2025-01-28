import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCustom]',
  standalone: true
})
export class CustomDirective {

  constructor(private ele: ElementRef) { 
    // this.ele.nativeElement.style.borderRadius= '200px';
    // this.ele.nativeElement.style.width= '200px';
    // this.ele.nativeElement.style.height= '200px';
  }


  @HostListener('click') onClick(){
    
    this.ele.nativeElement.style.color = 'blue';
    this.ele.nativeElement.style.border = '2px  solid red';
  }

  @HostListener('mouseover') mouseOn(){
    this.ele.nativeElement.style.backgroundColor = 'pink';
   
 
  }
  @HostListener('mouseenter') mouseEnter(){
  
    //  this.ele.nativeElement.style.width= '250px';
    // this.ele.nativeElement.style.height= '250px';
 
  }

  @HostListener('mouseout') mouseOut(){
    
    this.ele.nativeElement.textContent = 'Mouse moved out';
  }

  


}
