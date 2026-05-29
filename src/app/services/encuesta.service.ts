import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

export interface Encuesta {

  id?: number;

  nombre_alias: string;

  edad_rango: string;

  rol: string;

  videojuego_favorito: string;

  plataforma: string;

  genero_favorito: string;

  comentario?: string;

  foto_url?: string;

  latitud?: number;

  longitud?: number;

  lugar?: string;

  fecha?: string;

  created_at?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EncuestasService {

  constructor(
    private supabaseService: SupabaseService
  ) {}

  // =========================
  // LISTAR ENCUESTAS
  // =========================
  async listar() {

    const { data, error } =
      await this.supabaseService.client
        .from('encuestas')
        .select('*')
        .order('id', { ascending: false });

    if (error) throw error;

    return data as Encuesta[];
  }

  // =========================
  // OBTENER POR ID
  // =========================
  async obtenerPorId(id: number) {

    const { data, error } =
      await this.supabaseService.client
        .from('encuestas')
        .select('*')
        .eq('id', id)
        .single();

    if (error) throw error;

    return data as Encuesta;
  }

  // =========================
  // CREAR ENCUESTA
  // =========================
  async crear(encuesta: Encuesta) {

    const { data, error } =
      await this.supabaseService.client
        .from('encuestas')
        .insert(encuesta)
        .select();

    if (error) throw error;

    return data;
  }

  // =========================
  // ACTUALIZAR ENCUESTA
  // =========================
  async actualizar(
    id: number,
    encuesta: Encuesta
  ) {

    const { data, error } =
      await this.supabaseService.client
        .from('encuestas')
        .update(encuesta)
        .eq('id', id);

    if (error) throw error;

    return data;
  }

  // =========================
  // SUBIR FOTO
  // =========================
  async subirImagen(file: File) {

    const nombre =
      Date.now() + '-' + file.name;

    const { error } =
      await this.supabaseService.client
        .storage
        .from('encuestas-imagenes')
        .upload(nombre, file);

    if (error) throw error;

    const { data } =
      this.supabaseService.client
        .storage
        .from('encuestas-imagenes')
        .getPublicUrl(nombre);

    return data.publicUrl;
  }

}