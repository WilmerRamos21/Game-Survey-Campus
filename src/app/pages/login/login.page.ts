import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FirebaseService } from '../../services/firebase';
import { RouterModule, Router } from '@angular/router';
import {addIcons} from 'ionicons'
import {APP_ICONS} from '../../shared/app-icons'

import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonCardContent,
  IonCard, IonItem, IonInput, IonButton, IonText,
  IonIcon

} from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonCardContent,
  IonCard, IonItem, IonInput, IonButton, IonText, CommonModule, FormsModule, RouterModule,
  IonIcon
  ]
})
export class LoginPage implements OnInit {

  email = '';
  password = '';
  mensaje = '';
  
  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) {APP_ICONS}

  ngOnInit() {addIcons(APP_ICONS)}

  async login(){

    try{

      await this.firebaseService.login(
        this.email,
        this.password
      );

      this.router.navigateByUrl('/encuestas');

    }catch(error: any){

  if(error.code === 'auth/email-already-in-use'){

    this.mensaje = 'El correo ya está registrado';

  }

  else if(error.code === 'auth/invalid-credential'){

    this.mensaje = 'Correo o contraseña incorrectos';

  }

  else{

    this.mensaje = 'Error de autenticación';

  }

}
}

  async register(){

    try{

      await this.firebaseService.register(
        this.email,
        this.password
      );

      this.mensaje = 'Usuario registrado correctamente';

    }catch(error: any){

  if(error.code === 'auth/email-already-in-use'){

    this.mensaje = 'El correo ya está registrado';

  }

  else if(error.code === 'auth/invalid-credential'){

    this.mensaje = 'Correo o contraseña incorrectos';

  }

  else{

    this.mensaje = 'Error de autenticación';

  }

    }

  }
  entrarInvitado(){
    this.router.navigate(['/encuestas'])
  }
}
