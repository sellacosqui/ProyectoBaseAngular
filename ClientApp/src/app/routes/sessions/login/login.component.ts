import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators,NgForm  } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { filter } from 'rxjs/operators';
import { AuthService } from '@core/authentication';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  isSubmitting = false;
  token: string | undefined;
  public captchaResolved: boolean = false;
  public proyectos: proyecto[] = [];

  loginForm = this.fb.nonNullable.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    proyecto: ['', [Validators.required]],

    rememberMe: [false],
  });

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService, public http: HttpClient) {
    this.token = undefined;
}
  ngOnInit() {}
  checkCaptcha(captchaResponse: string) {
    this.captchaResolved = (captchaResponse && captchaResponse.length > 0) ? true : false
  }

  get username() {
    return this.loginForm.get('username')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }
  get proyecto() {
    return this.loginForm.get('proyecto')!;
  }
  get rememberMe() {
    return this.loginForm.get('rememberMe')!;
  }


  public send(form: NgForm): void {
    if (form.invalid) {
      for (const control of Object.keys(form.controls)) {
        form.controls[control].markAsTouched();
      }
      return;
    }

    console.debug(`Token [${this.token}] generated`);
  }
  cargaproyecto() {
    if (this.username.value == 'Ovalencia' && this.password.value == '123456') {
      this.http.get<proyecto[]>('/proyect').subscribe(result => {
        this.proyectos = result;
      }, error => console.error(error));
    }
    else {
      if (this.username.value == 'Miguel' && this.password.value == '123456') {
        this.http.get<proyecto[]>('/proyect').subscribe(result => {
          this.proyectos = [
            {
              "id": 24,
              "nombre": "Prueba",
              "nombre_Diminutivo": "Edison",
              "descripccion": "a",
              "cliente_Id": 2,
              "gerente_Proyecto": "a",
              "presupuesto": "1",
              "contrato": "1",
              "fecha_Inicio": new Date,
              "fecha_Fin": new Date,
              "duracion": "1",
              "estado_Id": 1,
              "usuario_Creacion": 1,
              "fecha_Creacion": new Date,
            }
          ];
        }, error => console.error(error));
      }
    }
  }

  login() {
    this.isSubmitting = true;
    this.auth
      .login(this.username.value, this.password.value, this.rememberMe.value)
        .pipe(filter(authenticated => authenticated))
        .subscribe(
          () => this.router.navigateByUrl('/'),
          (errorRes: HttpErrorResponse) => {
            if (errorRes.status === 422) {
              const form = this.loginForm;
              const errors = errorRes.error.errors;
              Object.keys(errors).forEach(key => {
                form.get(key === 'email' ? 'username' : key)?.setErrors({
                  remote: errors[key][0],
                });
              });
            }
            this.isSubmitting = false;
          }
        );
  }
}
export interface proyecto {
  id: number;
  nombre: string;
  nombre_Diminutivo: string;
  descripccion: string;
  cliente_Id: number;
  gerente_Proyecto: string;
  presupuesto: string;
  contrato: string;
  fecha_Inicio: Date;
  fecha_Fin: Date;
  duracion: string;
  estado_Id: number;
  usuario_Creacion: number;
  fecha_Creacion: Date;
}
