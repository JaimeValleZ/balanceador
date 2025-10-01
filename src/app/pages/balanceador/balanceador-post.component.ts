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

  // Lista de backends para balanceo (definida en environment)
  private apiUrls = environment.apiUrls;
  private currentIndex = 0; // round-robin

  constructor(private http: HttpClient) {}

  private getNextApiUrl(): string {
    const url = this.apiUrls[this.currentIndex];
    console.log(`[Balanceador] Usando backend: ${url}`); // log de backend seleccionado
    this.currentIndex = (this.currentIndex + 1) % this.apiUrls.length;
    return url;
  }

  ngOnInit() {
    // Carga inicial
    this.cargarMas();
  }

  cargarMas() {
    const apiUrl = this.getNextApiUrl();
    this.http.get<Producto[]>(`${apiUrl}/products/generate`)
      .subscribe({
        next: data => {
          console.log(`[Balanceador] Recibidos ${data.length} productos desde ${apiUrl}`);
          // acumulamos productos en lugar de reemplazar
          this.productos = [...this.productos, ...data];
        },
        error: err => console.error(`[Balanceador] Error con backend ${apiUrl}:`, err)
      });
  }

  agregarProducto() {
    const apiUrl = this.getNextApiUrl();
    this.http.post(`${apiUrl}/products`, this.nuevoProducto)
      .subscribe({
        next: () => {
          alert('Producto agregado!');
          this.nuevoProducto = { id: 0, name: '', price: 0 };
          this.cargarMas(); // recarga después de agregar
        },
        error: err => console.error(`[Balanceador] Error con backend ${apiUrl}:`, err)
      });
  }
}
