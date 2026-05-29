import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { Encuesta, EncuestasService } from '../../services/encuesta.service';

import { addIcons } from 'ionicons';
import { APP_ICONS } from '../../shared/app-icons';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonBadge,
  IonSpinner,
  IonBackButton,
  IonButtons
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-encuesta-detalle',
  templateUrl: './encuesta-detalle.page.html',
  styleUrls: ['./encuesta-detalle.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    RouterModule,
    IonIcon,
    IonBadge,
    IonSpinner,
    IonBackButton,
    IonButtons
  ]
})
export class EncuestaDetallePage implements OnInit {

  encuesta!: Encuesta;

  cargando: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private encuestaService: EncuestasService
  ) {
    addIcons(APP_ICONS)
  }

  async ngOnInit() {
    await this.cargarDetalle()
  }

  async cargarDetalle() {

    try {

      this.cargando = true;

      const idParam =
      this.route.snapshot.paramMap.get('id');

      if (!idParam) return;

      const id = Number(idParam);

      this.encuesta =
      await this.encuestaService.obtenerPorId(id);

    } catch (error) {

      console.log('Error: ', error);

    } finally {

      this.cargando = false;

    }

  }

}