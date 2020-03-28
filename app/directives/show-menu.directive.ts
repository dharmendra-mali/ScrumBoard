import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appShowMenu]'
})
export class ShowMenuDirective {

  @HostBinding('class.open') isOpen = false;
  @HostListener('click') toggleOpen(){
    this.isOpen = !this.isOpen;
  }

  constructor() { }

}
