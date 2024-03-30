import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[kursDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;

  @HostListener('click') OnClick() {
    this.isOpen = !this.isOpen;
  }
}
