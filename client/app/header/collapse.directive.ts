import { Directive, ElementRef, HostListener, Inject, ViewChild } from '@angular/core';
import { JQUERY_TOKEN } from '../shared/module/services/';

@Directive({
  selector: '[collapse]'
})
export class CollapseDirective {
  @ViewChild('collapse') collapse: ElementRef;
  el: HTMLElement;
  constructor(@Inject(JQUERY_TOKEN) private $: any) {
    this.el = this.collapse.nativeElement;
   }

  @HostListener('click', ['$event']) onclick(event: MouseEvent) {
    this.$(this.el).collapse('hide');
    event.stopPropagation();
  }

}