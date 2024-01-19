import { Component } from '@angular/core';

@Component({
  selector: 'app-branding',
  template: `
    <a class="matero-branding" href="/">
      <img src="./assets/images/pys2.jpg" class="matero-branding-logo-expanded" alt="logo" />
      <span class="matero-branding-name">P & S</span>
    </a>
  `,
})
export class BrandingComponent {}
