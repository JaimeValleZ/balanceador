
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

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<Producto[]>(`${this.apiUrl}/api/products/generate`)
      .subscribe(data => this.productos = data);
  }

  agregarProducto() {
    this.http.post(`${this.apiUrl}/api/products`, this.nuevoProducto)
      .subscribe(() => {
        alert('Producto agregado!');
        this.nuevoProducto = { id: 0, name: '', price: 0 };
        this.ngOnInit();
      });
  }
}
