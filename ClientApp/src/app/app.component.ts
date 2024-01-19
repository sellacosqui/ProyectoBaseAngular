import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PreloaderService } from '@core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit, AfterViewInit {
  token: string | undefined;
  constructor(private preloader: PreloaderService) {
    this.token = undefined;
}

  public send(form: NgForm): void {
    if (form.invalid) {
      for (const control of Object.keys(form.controls)) {
        form.controls[control].markAsTouched();
      }
      return;
    }

   
  }
  ngOnInit() {}

  ngAfterViewInit() {
    this.preloader.hide();
  }
}
