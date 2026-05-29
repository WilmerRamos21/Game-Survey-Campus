import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { Geolocation } from '@capacitor/geolocation';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

import { VideojuegosApiService }
from '../../services/api-juegos';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import {
  Encuesta,
  EncuestasService
} from '../../services/encuesta.service'

import { addIcons } from 'ionicons';

import { APP_ICONS } from 'src/app/shared/app-icons';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonIcon,
  IonRow,
  IonCol,
  IonItem,
  IonCard,
  IonCardHeader,
  IonButton,
  IonCardContent,
  IonCardTitle,
  IonBackButton,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonBadge
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-encuesta-form',

  templateUrl: './encuesta-form.page.html',

  styleUrls: ['./encuesta-form.page.scss'],

  standalone: true,

  imports: [
    IonBadge,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,

    IonButtons,
    IonIcon,
    IonRow,
    IonCol,
    IonItem,
    IonCard,
    IonCardHeader,
    IonButton,
    IonCardContent,
    IonCardTitle,
    IonBackButton,
    IonInput,
    IonTextarea,

    IonSelect,
    IonSelectOption
  ]
})
export class EncuestaFormPage implements OnInit {

  infoJuego: any = null;

  buscandoJuego = false;

  imagenSeleccionada!: File;

  previewImagen: string = '';

  id: number | null = null;


  encuesta: Encuesta = {

    nombre_alias: '',

    edad_rango: '',

    rol: '',

    videojuego_favorito: '',

    plataforma: '',

    genero_favorito: '',

    comentario: '',

    foto_url: '',

    latitud: 0,

    longitud: 0,

    lugar: '',

    fecha: new Date().toISOString()
  }

  constructor(

    private encuestasService: EncuestasService,

    private route: ActivatedRoute,

    private router: Router,
    private apiService: VideojuegosApiService

  ) {

    addIcons(APP_ICONS)

  }

  async ngOnInit() {
    await this.obtenerUbicacion();

    const idParam =
      this.route.snapshot.paramMap.get('id');

    // EDITAR
    if(idParam){

      this.id = Number(idParam);

      const datos =
        await this.encuestasService.obtenerPorId(this.id);

      if(datos){

        this.encuesta = datos;

      }

    }

  }

  // =========================
  // SELECCIONAR FOTO
  // =========================
  seleccionarImagen(event: any){

    this.imagenSeleccionada =
      event.target.files[0];

  }

  // =========================
  // GUARDAR ENCUESTA
  // =========================
  async guardar(){

    try{

      // SUBIR FOTO
      if(this.imagenSeleccionada){

        const url =
          await this.encuestasService
          .subirImagen(this.imagenSeleccionada);

        this.encuesta.foto_url =
          url;

      }

      // ACTUALIZAR
      if(this.id){

        await this.encuestasService.actualizar(
          this.id,
          this.encuesta
        );

      }

      // CREAR
      else{

        await this.encuestasService.crear(
          this.encuesta
        );

      }

      // REDIRECCION
      this.router.navigate(
        ['/encuestas']
      );

    }catch(error){

      console.log('Error: ', error);

    }

  }
  // Obtener ubicación
  async obtenerUbicacion(){

  try{

    const coordenadas =
    await Geolocation.getCurrentPosition();

    this.encuesta.latitud =
      coordenadas.coords.latitude;

    this.encuesta.longitud =
      coordenadas.coords.longitude;

    this.encuesta.fecha =
      new Date().toISOString();

  }catch(error){
    console.log('Error GPS:', error);
  }

}
async tomarFoto(){

  try{

    const image =
    await Camera.getPhoto({

      quality: 90,

      allowEditing: false,

      resultType: CameraResultType.Uri,

      source: CameraSource.Camera

    });

    if(image.webPath){

      this.previewImagen = image.webPath;

      const response =
      await fetch(image.webPath);

      const blob =
      await response.blob();

      this.imagenSeleccionada =
      new File(
        [blob],
        `foto-${Date.now()}.jpg`,
        { type: 'image/jpeg' }
      );

    }

  }catch(error){
    console.log('Error cámara:', error);
  }

}
async seleccionarDesdeGaleria(){

  try{

    const image =
    await Camera.getPhoto({

      quality: 90,

      resultType: CameraResultType.Uri,

      source: CameraSource.Photos

    });

    if(image.webPath){

      this.previewImagen = image.webPath;

      const response =
      await fetch(image.webPath);

      const blob =
      await response.blob();

      this.imagenSeleccionada =
      new File(
        [blob],
        `galeria-${Date.now()}.jpg`,
        { type: 'image/jpeg' }
      );

    }

  }catch(error){
    console.log('Error galería:', error);
  }

}
async buscarJuego(){

  if(!this.encuesta.videojuego_favorito) return;

  this.buscandoJuego = true;

  const juego = await this.apiService.buscarJuego(
    this.encuesta.videojuego_favorito
  );

  console.log(juego);

  if(juego){

    this.infoJuego = juego;

    // AUTOCOMPLETAR
    this.encuesta.genero_favorito =
      juego.genres?.[0]?.name || '';

    this.encuesta.plataforma =
      juego.platforms?.[0]?.platform?.name || '';

    // PORTADA AUTOMÁTICA
    this.encuesta.foto_url =
      juego.background_image;

  }

  this.buscandoJuego = false;
}

}