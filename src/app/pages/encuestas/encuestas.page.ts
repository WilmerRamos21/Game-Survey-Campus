import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';

import { addIcons } from 'ionicons';

import { APP_ICONS } from 'src/app/shared/app-icons';

import {
  Encuesta,
  EncuestasService
} from '../../services/encuesta.service';

import { FirebaseService }
from 'src/app/services/firebase';

import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonBadge,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-encuestas',

  templateUrl: './encuestas.page.html',

  styleUrls: ['./encuestas.page.scss'],

  standalone: true,

  imports: [
    IonContent,
    IonHeader,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonBadge,
    IonButton,
    IonIcon,
  ]
})
export class EncuestasPage implements OnInit {

  encuestas: Encuesta[] = [];

  cargando: boolean = false;

  usuarioLogeado: boolean = false;

  constructor(

    private encuestasService: EncuestasService,

    private router: Router,

    private firebaseService: FirebaseService

  ) {

    addIcons(APP_ICONS);

  }
  async ngOnInit() {
      // 🌟 REEMPLAZO: Escuchar la sesión de manera reactiva y persistente
      this.firebaseService.getAuthState().subscribe(user => {
        this.usuarioLogeado = !!user;
      });

      // CARGAR ENCUESTAS
      await this.cargar();
    }

  // =========================
  // CARGAR ENCUESTAS
  // =========================

  async cargar() {

    try {

      this.cargando = true;

      this.encuestas =
        await this.encuestasService.listar();

    } catch(error) {

      console.log('Error:', error);

    } finally {

      this.cargando = false;

    }

  }

  // =========================
  // NUEVA ENCUESTA
  // =========================

  nuevo() {

    this.router.navigate([
      '/encuesta-form'
    ]);

  }

  // =========================
  // EDITAR ENCUESTA
  // =========================

  editar(id?: number) {

    if(!id) return;

    this.router.navigate([
      '/encuesta-form',
      id
    ]);

  }

  // =========================
  // VER DETALLE
  // =========================

  verDetalle(id?: number) {

    if(!id) return;

    this.router.navigate([
      '/encuesta-detalle',
      id
    ]);

  }
// =========================
  // LOGOUT
  // =========================
  async logout() {
    await this.firebaseService.logout();
    this.usuarioLogeado = false; // Forzamos el cambio visual de inmediato
    this.router.navigate(['/login']);
  }

  // =========================
  // IR LOGIN
  // =========================

  irLogin() {

    this.router.navigate([
      '/login'
    ]);

  }
  irDashboard(){

  this.router.navigate(
    ['/dashboard']
  );

}

}