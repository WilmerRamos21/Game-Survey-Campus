import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {

  private supabase:SupabaseClient

  constructor(){
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    )
  }
    // Craer un getter para acceder a supabase
  get client(): SupabaseClient {
    return this.supabase
  }

  login(email: string, password:string){
    return this.supabase.auth.signInWithPassword({
      email,
      password
    })
  }
  register(email: string, password: string){
    return this.supabase.auth.signUp({
      email, 
      password
    })
  }
  logout(){
    return this.supabase.auth.signOut()
  }
}
