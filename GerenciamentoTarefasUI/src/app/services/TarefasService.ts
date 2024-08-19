import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarefasService {

  private apiUrl = 'http://localhost:5076/api/Tarefas'; // URL do endpoint de tarefas

  constructor(private http: HttpClient) { }

  // Método para obter as tarefas do usuário logado
  getTarefas(): Observable<any[]> {
    const token = localStorage.getItem('authToken'); // Obter o token JWT do localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(this.apiUrl, { headers });
  }
}
