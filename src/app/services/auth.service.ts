import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from './supabase.service';
import { User } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ){}

  // Obtener usuario 
  async getUser():Promise<User | null>{
    const {data, error} = await this.supabaseService.client.auth.getUser()

    if(error){
      return null
    }
    return data.user;
  }
  
  // Verificar Login
  async estaLogeado() : Promise<boolean>{
    const user = await this.getUser()

    return !!user;
  }

  // Logout
  async logout(){
    await this.supabaseService.logout()
    this.router.navigate(['/login'])
  }
}
