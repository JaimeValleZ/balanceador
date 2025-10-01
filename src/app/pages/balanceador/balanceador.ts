import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';

interface Producto {
  id: number;
  name: string;
  price: number;
}

@Component({
  selector: 'app-balanceador',
  templateUrl: './balanceador.html',
  styleUrls: ['./balanceador.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class BalanceadorComponent implements OnInit {
  productos: Producto[] = [];
  nuevoProducto: Producto = { id: 0, name: '', price: 0 };

  private apiUrls = environment.apiUrls;
  private currentIndex = 0; // Para round-robin

  constructor(private http: HttpClient) {}

  // Método para obtener la URL actual y rotar al siguiente
  private getNextUrl(): string {
    const url = this.apiUrls[this.currentIndex];
    this.currentIndex = (this.currentIndex + 1) % this.apiUrls.length;
    return url;
  }

  ngOnInit() {
    const url = this.getNextUrl();
    this.http.get<Producto[]>(`${url}/products/generate`)
      .subscribe(data => this.productos = data);
  }

  agregarProducto() {
    const url = this.getNextUrl();
    this.http.post(`${url}/products`, this.nuevoProducto)
      .subscribe(() => {
        alert('Producto agregado!');
        this.nuevoProducto = { id: 0, name: '', price: 0 };
        this.ngOnInit();
      });
  }
}
