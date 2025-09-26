
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Producto {
  id: number;
  name: string;
  price: number;
}

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styleUrls: ['./carga.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class CargaComponent {
  productos: Producto[] = [{ id: 0, name: '', price: 0 }];
  mensaje = '';

  constructor(private http: HttpClient) {}

  agregarFila() {
    this.productos.push({ id: 0, name: '', price: 0 });
  }

  eliminarFila(i: number) {
    this.productos.splice(i, 1);
  }

  enviar() {
    this.http.post('http://localhost:8080/api/products/bulk', this.productos)
      .subscribe({
        next: () => this.mensaje = '¡Productos agregados exitosamente!',
        error: () => this.mensaje = 'Error al agregar productos.'
      });
  }
}
