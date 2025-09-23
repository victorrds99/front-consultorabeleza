import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Endereco {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

@Injectable({
  providedIn: 'root'
})
export class CepService {
  private apiUrl = 'https://viacep.com.br/ws';

  constructor(private http: HttpClient) {}

  buscarEnderecoPorCep(cep: string): Observable<Endereco> {
    const cepLimpo = cep.replace(/\D/g, ''); // Remove caracteres não numéricos
    return this.http.get<Endereco>(`${this.apiUrl}/${cepLimpo}/json/`);
  }
}
